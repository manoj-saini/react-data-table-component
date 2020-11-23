import orderBy from 'lodash.orderby';
import { CSSObject } from 'styled-components';
import { Direction } from './constants';
import {
	Format,
	Row,
	SortDirection,
	Selector,
	DefaultSortField,
	SortFunction,
	DataTableColumn,
	DataTableConditionalRowStyles,
} from '../types';

export const isEmpty = (field: string | number = ''): boolean => {
	if (typeof field === 'number') {
		return false;
	}

	return !field || field.length === 0;
};

export const sort = (
	rows: Row[],
	field: Selector | null,
	direction: SortDirection,
	sortFn: SortFunction | null = null,
): Row[] => {
	if (!field) {
		return rows;
	}

	if (sortFn && typeof sortFn === 'function') {
		return sortFn(rows, <string>field, direction);
	}

	return orderBy(rows, field, direction);
};

export const getProperty = (
	row: Row,
	selector: Selector | undefined | null | unknown,
	format: Format | undefined | null,
	rowIndex: number,
): React.ReactNode => {
	if (!selector) {
		return null;
	}

	if (typeof selector !== 'string' && typeof selector !== 'function') {
		throw new Error('selector must be a . delimited string eg (my.property) or function (e.g. row => row.field');
	}

	if (format && typeof format === 'function') {
		return format(row, rowIndex);
	}

	if (selector && typeof selector === 'function') {
		return selector(row, rowIndex);
	}

	return selector.split('.').reduce((acc: Row, part: string) => {
		// O(n2) when querying for an array (e.g. items[0].name)
		// Likely, the object depth will be reasonable enough that performance is not a concern
		const arr = part.match(/[^\]\\[.]+/g);
		if (arr && arr.length > 1) {
			// eslint-disable-next-line no-plusplus
			for (let i = 0; i < arr.length; i++) {
				return acc[arr[i]][arr[i + 1]];
			}
		}

		return acc[part];
	}, row);
};

export const insertItem = (array: Row[] = [], item: Row = {}, index = 0): Row[] => [
	...array.slice(0, index),
	item,
	...array.slice(index),
];

export const removeItem = (array: Row[] = [], item: Row = {}, keyField = 'id'): Row[] => {
	const newArray = array.slice();

	if (item[keyField]) {
		newArray.splice(
			newArray.findIndex((a: Row) => a[keyField] === item[keyField]),
			1,
		);
	} else {
		newArray.splice(
			newArray.findIndex(a => a === item),
			1,
		);
	}

	return newArray;
};

// Make sure columns have unique id's
export const decorateColumns = (columns: DataTableColumn[]): DataTableColumn[] =>
	columns.map((column: DataTableColumn, index: number) => {
		const decoratedColumn = {
			...column,
			sortable: column.sortable || !!column.sortFunction || undefined,
		};

		if (!column.id) {
			decoratedColumn.id = index + 1;

			return decoratedColumn;
		}

		return decoratedColumn;
	});

export const getColumnById = (id: DefaultSortField, columns: DataTableColumn[]): DataTableColumn | undefined => {
	if (typeof id === undefined) {
		return undefined;
	}

	return columns.find(col => col.id === id);
};

export const getSortDirection = (ascDirection: boolean | undefined = false): SortDirection =>
	ascDirection ? 'asc' : 'desc';

export const handleFunctionProps = (object: Record<string, unknown>, ...args: unknown[]): Row => {
	let newObject;

	Object.keys(object)
		.map(o => object[o])
		.forEach((value: unknown, index: number) => {
			const oldObject = object;

			if (typeof value === 'function') {
				newObject = { ...oldObject, [Object.keys(object)[index]]: value(...args) };
				// delete oldObject[value];
			}
		});

	return newObject || object;
};

export const getNumberOfPages = (rowCount: number, rowsPerPage: number): number => Math.ceil(rowCount / rowsPerPage);

export const recalculatePage = (prevPage: number, nextPage: number): number => Math.min(prevPage, nextPage);

export const noop = (): null => null;

export const getConditionalStyle = (
	row: Row = {},
	conditionalRowStyles: DataTableConditionalRowStyles[] = [],
): CSSObject => {
	let rowStyle = {};

	if (conditionalRowStyles.length) {
		conditionalRowStyles.forEach((crs: DataTableConditionalRowStyles) => {
			if (!crs.when || typeof crs.when !== 'function') {
				throw new Error('"when" must be defined in the conditional style object and must be function');
			}

			// evaluate the field and if true return a the style to be applied
			if (crs.when(row)) {
				rowStyle = crs.style || {};

				if (typeof crs.style === 'function') {
					rowStyle = crs.style(row) || {};
				}
			}
		});
	}

	return rowStyle;
};

export const isRowSelected = (row: Row = {}, selectedRows: Row[] = [], keyField = 'id'): boolean => {
	if (row[keyField]) {
		return selectedRows.some(r => r[keyField] === row[keyField]);
	}

	return selectedRows.some(r => r === row);
};

export const detectRTL = (direction: Direction = Direction.AUTO): boolean => {
	if (direction === 'auto') {
		const canUse = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
		const bodyRTL = <HTMLScriptElement>document.getElementsByTagName('BODY')[0];
		const htmlTRL = <HTMLScriptElement>document.getElementsByTagName('HTML')[0];
		const hasRTL = bodyRTL.dir === 'rtl' || htmlTRL.dir === 'rtl';

		return canUse && hasRTL;
	}

	return direction === 'rtl';
};

export const isOdd = (num: number): boolean => {
	return num % 2 === 0;
};

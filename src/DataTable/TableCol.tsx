import * as React from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import NativeSortIcon from '../icons/NativeSortIcon';
import { sort } from './util';
import { DataTableColumn, Row, SortAction, SortDirection, SortFunction } from '../types';

const TableColStyle = styled(Cell)`
	${({ column }) => column.button && 'text-align: center'};
`;

const ColumnSortable = styled.div<{
	column: DataTableColumn;
	sortActive: boolean;
}>`
	display: inline-flex;
	align-items: center;
	height: 100%;
	line-height: 1;
	user-select: none;
	${({ theme, sortActive }) => (sortActive ? theme.headCells.activeSortStyle : theme.headCells.inactiveSortStyle)};

	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			${props => (props.sortActive ? 'opacity: 1' : 'opacity: 0')};
			color: inherit;
			font-size: 18px !important;
			height: 18px !important;
			width: 18px !important;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 125ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	&:hover {
		${({ column }) => column.sortable && 'cursor: pointer'};
		${({ column, theme }) => column.sortable && theme.headCells.activeStyle};

		span,
		span.__rdt_custom_sort_icon__ * {
			${({ sortActive, column }) => !sortActive && column.sortable && 'opacity: 1'};
		}
	}
`;

interface TableColProps {
	rows: Row[];
	column: DataTableColumn;
	sortIcon?: React.ReactNode;
	pagination: boolean;
	paginationServer: boolean;
	persistSelectedOnSort: boolean;
	selectedColumn: DataTableColumn;
	sortDirection: SortDirection;
	sortFunction: SortFunction | null;
	sortServer: boolean;
	selectableRowsVisibleOnly: boolean;
	onSort: (action: SortAction) => void;
}

const TableCol: React.FC<TableColProps> = ({
	rows,
	column,
	selectedColumn,
	sortDirection,
	sortFunction,
	sortIcon,
	sortServer,
	pagination,
	paginationServer,
	persistSelectedOnSort,
	selectableRowsVisibleOnly,
	onSort,
}) => {
	if (column.omit) {
		return null;
	}

	const handleSortChange = () => {
		if (column.sortable && column.selector) {
			let direction = sortDirection;

			if (selectedColumn.id === column.id) {
				direction = sortDirection === 'asc' ? 'desc' : 'asc';
			}

			let sortedRows = sort(rows, column.selector, direction, sortFunction);

			// declare this as a const since ts throws strict null check on a ternary line 108
			// sortFn is still checked for undefined or null
			const sortFn = column.sortFunction;

			if (sortFn) {
				const customSortFunction = direction === 'asc' ? sortFn : (a: Row, b: Row) => sortFn(a, b) * -1;

				sortedRows = [...rows].sort(customSortFunction);
			}

			onSort({
				type: 'SORT_CHANGE',
				rows: sortedRows,
				sortDirection: direction,
				sortServer,
				selectedColumn: column,
				pagination,
				paginationServer,
				visibleOnly: selectableRowsVisibleOnly,
				persistSelectedOnSort,
			});
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			handleSortChange();
		}
	};

	const renderNativeSortIcon = (sortActive: boolean) => (
		<NativeSortIcon sortActive={sortActive} sortDirection={sortDirection} />
	);

	const renderCustomSortIcon = () => (
		<span className={[sortDirection, '__rdt_custom_sort_icon__'].join(' ')}>{sortIcon}</span>
	);

	const sortActive = !!(column.sortable && selectedColumn.id === column.id);
	const nativeSortIconLeft = column.sortable && !sortIcon && !column.right;
	const nativeSortIconRight = column.sortable && !sortIcon && column.right;
	const customSortIconLeft = column.sortable && sortIcon && !column.right;
	const customSortIconRight = column.sortable && sortIcon && column.right;

	return (
		<TableColStyle
			className="rdt_TableCol"
			column={column} // required by Cell.js
			head
		>
			{column.name && (
				<ColumnSortable
					id={`column-${column.id}`}
					role="columnheader"
					tabIndex={0}
					className="rdt_TableCol_Sortable"
					onClick={handleSortChange}
					onKeyPress={handleKeyPress}
					sortActive={sortActive}
					column={column}
				>
					{customSortIconRight && renderCustomSortIcon()}
					{nativeSortIconRight && renderNativeSortIcon(sortActive)}
					<div>{column.name}</div>
					{customSortIconLeft && renderCustomSortIcon()}
					{nativeSortIconLeft && renderNativeSortIcon(sortActive)}
				</ColumnSortable>
			)}
		</TableColStyle>
	);
};

export default React.memo(TableCol);

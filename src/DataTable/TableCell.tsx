import * as React from 'react';
import styled, { css } from 'styled-components';
import { Cell } from './Cell';
import { getProperty, getConditionalStyle } from './util';
import { STOP_PROP_TAG } from './constants';
import { DataTableColumn } from '../types';

const overflowCSS = css<{
	column: DataTableColumn;
}>`
	div:first-child {
		white-space: ${({ column }) => (column.wrap ? 'normal' : 'nowrap')};
		overflow: ${({ column }) => (column.allowOverflow ? 'visible' : 'hidden')};
		text-overflow: ellipsis;
	}
`;

const TableCellStyle = styled(Cell)`
	font-size: ${props => props.theme.rows.fontSize};
	font-weight: 400;
	${({ column }) => !column.cell && overflowCSS};
	${({ column }) => column.style};
	${({ extendedCellStyle }) => extendedCellStyle};
`;

interface TableCellProps {
	id: string;
	keyField: string;
	rowIndex: number;
	column: DataTableColumn;
	row: Record<string, unknown>;
	rowCount: number;
}

const TableCell: React.FC<TableCellProps> = ({ id, rowIndex, column, row }) => {
	if (column.omit) {
		return null;
	}

	// apply a tag that TableRow will use to stop event propagation when TableCell is clicked
	const dataTag = column.ignoreRowClick || column.button ? null : STOP_PROP_TAG;
	const extendedCellStyle = getConditionalStyle(row, column.conditionalCellStyles);

	return (
		<TableCellStyle
			id={id}
			role="gridcell"
			column={column}
			data-tag={dataTag}
			className="rdt_TableCell"
			extendedCellStyle={extendedCellStyle}
		>
			{!column.cell && <div data-tag={dataTag}>{getProperty(row, column.selector, column.format, rowIndex)}</div>}
			{column.cell && column.cell(row, rowIndex, column, id)}
		</TableCellStyle>
	);
};

export default React.memo(TableCell);

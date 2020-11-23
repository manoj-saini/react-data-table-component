import * as React from 'react';
import styled from 'styled-components';
import { CellBase } from './Cell';
import Checkbox from './Checkbox';
import { RowState, SingleRowAction } from '../types';

const TableCellCheckboxStyle = styled(CellBase)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;

interface TableCellCheckboxProps {
	keyField: string;
	row: Record<string, unknown>;
	rowCount: number;
	selected: boolean;
	selectableRowsComponent: 'input' | React.ReactElement;
	selectableRowsComponentProps: Record<string, unknown>;
	selectableRowDisabled: RowState;
	onSelectedRow: (action: SingleRowAction) => void;
}

const TableCellCheckbox: React.FC<TableCellCheckboxProps> = ({
	keyField,
	row,
	rowCount,
	selected,
	selectableRowsComponent,
	selectableRowsComponentProps,
	selectableRowDisabled,
	onSelectedRow,
}) => {
	const disabled = !!(selectableRowDisabled && selectableRowDisabled(row));

	const handleOnRowSelected = () => {
		onSelectedRow({
			type: 'SELECT_SINGLE_ROW',
			row,
			isSelected: selected,
			keyField,
			rowCount,
		});
	};

	return (
		<TableCellCheckboxStyle onClick={(e: React.MouseEvent) => e.stopPropagation()} className="rdt_TableCell" noPadding>
			<Checkbox
				name={`select-row-${row[keyField]}`}
				component={selectableRowsComponent}
				componentOptions={selectableRowsComponentProps}
				checked={selected}
				aria-checked={selected}
				onClick={handleOnRowSelected}
				disabled={disabled}
			/>
		</TableCellCheckboxStyle>
	);
};

export default TableCellCheckbox;

import * as React from 'react';
import styled from 'styled-components';
import { CellBase } from './Cell';
import Checkbox from './Checkbox';
import { AllRowsAction, Row, RowState } from '../types';

const TableColStyle = styled(CellBase)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;

interface TableColCheckboxProps {
	head?: boolean;
	selectableRowsComponent: 'input' | React.ReactElement;
	selectableRowsComponentProps: Record<string, unknown>;
	selectableRowDisabled: RowState;
	keyField: string;
	mergeSelections: boolean;
	rowData: Row[];
	selectedRows: Row[];
	allSelected: boolean;
	onSelectAllRows: (action: AllRowsAction) => void;
}

const TableColCheckbox: React.FC<TableColCheckboxProps> = ({
	head = true,
	rowData,
	keyField,
	allSelected,
	mergeSelections,
	selectedRows,
	selectableRowsComponent,
	selectableRowsComponentProps,
	selectableRowDisabled,
	onSelectAllRows,
}) => {
	const indeterminate = selectedRows.length > 0 && !allSelected;
	const rows = selectableRowDisabled ? rowData.filter((row: Row) => !selectableRowDisabled(row)) : rowData;
	const isDisabled = rows.length === 0;
	// The row count should subtrtact rows that are disabled
	const rowCount = Math.min(rowData.length, rows.length);

	const handleSelectAll = () => {
		onSelectAllRows({
			type: 'SELECT_ALL_ROWS',
			rows,
			rowCount,
			mergeSelections,
			keyField,
		});
	};
	return (
		<TableColStyle className="rdt_TableCol" head={head} noPadding>
			<Checkbox
				name="select-all-rows"
				component={selectableRowsComponent}
				componentOptions={selectableRowsComponentProps}
				onClick={handleSelectAll}
				checked={allSelected}
				indeterminate={indeterminate}
				disabled={isDisabled}
			/>
		</TableColStyle>
	);
};

export default TableColCheckbox;

import * as React from 'react';
import styled, { css, CSSObject } from 'styled-components';
import TableCell from './TableCell';
import TableCellCheckbox from './TableCellCheckbox';
import TableCellExpander from './TableCellExpander';
import ExpanderRow from './ExpanderRow';
import { getConditionalStyle, isOdd } from './util';
import { STOP_PROP_TAG } from './constants';
import {
	DataTableColumn,
	DataTableConditionalRowStyles,
	ExpandRowToggled,
	RowClicked,
	ExpandableIcon,
	RowState,
	SingleRowAction,
} from '../types';

const highlightCSS = css<{
	highlightOnHover?: boolean;
}>`
	&:hover {
		${({ highlightOnHover, theme }) => highlightOnHover && theme.rows.highlightOnHoverStyle};
	}
`;

const pointerCSS = css`
	&:hover {
		cursor: pointer;
	}
`;

const TableRowStyle = styled.div<{
	dense?: boolean;
	striped?: boolean;
	highlightOnHover?: boolean;
	pointerOnHover?: boolean;
	selected?: boolean;
	extendedRowStyle?: CSSObject;
}>`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({ theme }) => theme.rows.style};
	${({ dense, theme }) => dense && theme.rows.denseStyle};
	${({ striped, theme }) => striped && theme.rows.stripedStyle};
	${({ highlightOnHover }) => highlightOnHover && highlightCSS};
	${({ pointerOnHover }) => pointerOnHover && pointerCSS};
	${({ selected, theme }) => selected && theme.rows.selectedHighlightStyle};
	${({ extendedRowStyle }) => extendedRowStyle};
`;

interface TableRowProps {
	id: string | number;
	keyField: string;
	columns: DataTableColumn[];
	row: Record<string, unknown>;
	selectableRows: boolean;
	expandableRows: boolean;
	expandableIcon: ExpandableIcon;
	highlightOnHover: boolean;
	pointerOnHover: boolean;
	dense: boolean;
	expandableRowsComponent: React.ReactElement;
	defaultExpanderDisabled: boolean;
	defaultExpanded?: boolean;
	expandableRowsHideExpander: boolean;
	expandOnRowClicked?: boolean;
	expandOnRowDoubleClicked?: boolean;
	conditionalRowStyles: DataTableConditionalRowStyles[];
	inheritConditionalStyles: boolean;
	rowCount: number;
	rowIndex: number;
	selected: boolean;
	selectableRowsHighlight: boolean;
	selectableRowsComponent: 'input' | React.ReactElement;
	selectableRowsComponentProps: Record<string, unknown>;
	striped: boolean;
	selectableRowDisabled: RowState;
	onRowClicked: RowClicked;
	onRowDoubleClicked: RowClicked;
	onRowExpandToggled: ExpandRowToggled;
	onSelectedRow: (action: SingleRowAction) => void;
}

const TableRow: React.FC<TableRowProps> = ({
	id,
	keyField,
	columns,
	row,

	selectableRows,
	expandableRows,
	expandableIcon,

	highlightOnHover = false,
	pointerOnHover = false,
	dense = false,
	expandableRowsComponent,
	defaultExpanderDisabled = false,
	defaultExpanded = false,
	expandableRowsHideExpander,
	expandOnRowClicked,
	expandOnRowDoubleClicked,
	conditionalRowStyles,
	inheritConditionalStyles,
	rowCount,
	rowIndex,
	selected,
	selectableRowsHighlight,
	selectableRowsComponent,
	selectableRowsComponentProps,
	selectableRowDisabled,
	striped = false,
	onRowExpandToggled,
	onRowClicked,
	onRowDoubleClicked,
	onSelectedRow,
}) => {
	const [expanded, setExpanded] = React.useState(defaultExpanded);
	React.useEffect(() => {
		setExpanded(defaultExpanded);
	}, [defaultExpanded]);

	const handleExpanded = React.useCallback(() => {
		setExpanded(!expanded);
		onRowExpandToggled(!expanded, row);
	}, [expanded, onRowExpandToggled, row]);

	const showPointer = pointerOnHover || (expandableRows && (expandOnRowClicked || expandOnRowDoubleClicked));

	const handleRowClick = React.useCallback(
		e => {
			// use event delegation allow events to propagate only when the element with data-tag STOP_PROP_TAG is present
			if (e.target && e.target.getAttribute('data-tag') === STOP_PROP_TAG) {
				onRowClicked(row, e);

				if (!defaultExpanderDisabled && expandableRows && expandOnRowClicked) {
					handleExpanded();
				}
			}
		},
		[defaultExpanderDisabled, expandOnRowClicked, expandableRows, handleExpanded, onRowClicked, row],
	);

	const handleRowDoubleClick = React.useCallback(
		e => {
			if (e.target && e.target.getAttribute('data-tag') === STOP_PROP_TAG) {
				onRowDoubleClicked(row, e);
				if (!defaultExpanderDisabled && expandableRows && expandOnRowDoubleClicked) {
					handleExpanded();
				}
			}
		},
		[defaultExpanderDisabled, expandOnRowDoubleClicked, expandableRows, handleExpanded, onRowDoubleClicked, row],
	);

	const extendedRowStyle = getConditionalStyle(row, conditionalRowStyles);
	const hightlightSelected = selectableRowsHighlight && selected;
	const inheritStyles = inheritConditionalStyles ? extendedRowStyle : {};
	const isStriped = striped && isOdd(rowIndex);

	return (
		<>
			<TableRowStyle
				id={`row-${id}`}
				role="row"
				striped={isStriped}
				highlightOnHover={highlightOnHover}
				pointerOnHover={!defaultExpanderDisabled && showPointer}
				dense={dense}
				onClick={handleRowClick}
				onDoubleClick={handleRowDoubleClick}
				className="rdt_TableRow"
				extendedRowStyle={extendedRowStyle}
				selected={hightlightSelected}
			>
				{selectableRows && (
					<TableCellCheckbox
						keyField={keyField}
						row={row}
						rowCount={rowCount}
						selected={selected}
						selectableRowsComponent={selectableRowsComponent}
						selectableRowsComponentProps={selectableRowsComponentProps}
						selectableRowDisabled={selectableRowDisabled}
						onSelectedRow={onSelectedRow}
					/>
				)}

				{expandableRows && !expandableRowsHideExpander && (
					<TableCellExpander
						keyField={keyField}
						expandableIcon={expandableIcon}
						expanded={expanded}
						row={row}
						onToggled={handleExpanded}
						disabled={defaultExpanderDisabled}
					/>
				)}

				{columns.map(column => (
					<TableCell
						id={`cell-${column.id}-${row[keyField]}`}
						key={`cell-${column.id}-${row[keyField]}`}
						keyField={keyField}
						column={column}
						row={row}
						rowCount={rowCount}
						rowIndex={rowIndex}
					/>
				))}
			</TableRowStyle>

			{expandableRows && expanded && (
				<ExpanderRow key={`expander--${row[keyField]}`} data={row} extendedRowStyle={inheritStyles}>
					{expandableRowsComponent}
				</ExpanderRow>
			)}
		</>
	);
};

export default React.memo(TableRow);

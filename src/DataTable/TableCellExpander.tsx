import * as React from 'react';
import styled from 'styled-components';
import { CellBase } from './Cell';
import ExpanderButton from './ExpanderButton';
import { Row, ExpandableIcon } from '../types';

const TableCellExpanderStyle = styled(CellBase)`
	white-space: nowrap;
	font-weight: 400;
	${({ theme }) => theme.expanderCell.style};
`;

interface TableCellExpanderProps {
	disabled: boolean;
	expanded: boolean;
	expandableIcon: ExpandableIcon;
	keyField: string;
	row: Row;
	onToggled: (row: Row) => void;
}

const TableCellExpander: React.FC<TableCellExpanderProps> = ({
	row,
	expanded = false,
	expandableIcon,
	keyField,
	onToggled,
	disabled = false,
}) => {
	return (
		<TableCellExpanderStyle onClick={(e: React.MouseEvent) => e.stopPropagation()} noPadding>
			<ExpanderButton
				keyField={keyField}
				row={row}
				expanded={expanded}
				expandableIcon={expandableIcon}
				disabled={disabled}
				onToggled={onToggled}
			/>
		</TableCellExpanderStyle>
	);
};

export default TableCellExpander;

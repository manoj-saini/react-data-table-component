import styled, { css, CSSObject } from 'styled-components';
import { media } from './media';
import { DataTableColumn } from '../types';

export const CellBase = styled.div<{
	id?: string;
	head?: boolean;
	noPadding?: boolean;
	extendedCellStyle?: CSSObject;
	onClick?: (e: React.MouseEvent) => void;
}>`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({ theme, head }) => theme[head ? 'headCells' : 'cells'].style};
	${({ noPadding }) => noPadding && 'padding: 0'};
`;

// Flex calculations
export const Cell = styled(CellBase)<{
	column: DataTableColumn;
}>`
	flex-grow: ${({ column }) => (column.grow === 0 || column.button ? 0 : column.grow || 1)};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({ column }) => column.maxWidth || '100%'};
	min-width: ${({ column }) => column.minWidth || '100px'};
	${({ column }) =>
		column.width &&
		css`
			min-width: ${column.width};
			max-width: ${column.width};
		`};
	${({ column }) => column.right && 'justify-content: flex-end'};
	${({ column }) => (column.center || column.button) && 'justify-content: center'};
	${({ column }) => (column.compact || column.button) && 'padding: 0'};

	/* handle hiding cells */
	${({ column }) =>
		column.hide &&
		column.hide === 'sm' &&
		media.sm`
    display: none;
  `};
	${({ column }) =>
		column.hide &&
		column.hide === 'md' &&
		media.md`
    display: none;
  `};
	${({ column }) =>
		column.hide &&
		column.hide === 'lg' &&
		media.lg`
    display: none;
  `};
	${({ column }) =>
		column.hide &&
		Number.isInteger(column.hide) &&
		media.custom(column.hide as number)`
    display: none;
  `};
`;

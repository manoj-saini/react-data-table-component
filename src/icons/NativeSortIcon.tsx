import React from 'react';
import styled from 'styled-components';
import { SortDirection } from '../types';

const Icon = styled.span<{
	sortActive: boolean;
	sortDirection: SortDirection;
}>`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({ sortActive }) => (sortActive ? 'opacity: 1' : 'opacity: 0')};
	${({ sortDirection }) => sortDirection === 'desc' && 'transform: rotate(180deg)'};
`;

interface NativeSortIconProps {
	sortActive: boolean;
	sortDirection: SortDirection;
}

const NativeSortIcon: React.FC<NativeSortIconProps> = ({ sortActive, sortDirection }) => (
	<Icon sortActive={sortActive} sortDirection={sortDirection}>
		&#9650;
	</Icon>
);

export default NativeSortIcon;

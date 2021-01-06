import * as React from 'react';
import styled from 'styled-components';

const alignMap = {
	left: 'flex-start',
	right: 'flex-end',
	center: 'center',
};

type AlignItems = 'center' | 'left' | 'right';

const SubheaderWrapper = styled.header<{
	align: AlignItems;
	wrapContent: boolean;
}>`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({ align }) => alignMap[align]};
	flex-wrap: ${({ wrapContent }) => (wrapContent ? 'wrap' : 'nowrap')};
	${({ theme }) => theme.subHeader.style}
`;

interface TableSubheaderProps {
	align?: AlignItems;
	wrapContent?: boolean;
}

const TableSubheader: React.FC<TableSubheaderProps> = ({ align = 'right', wrapContent = true, ...rest }) => (
	<SubheaderWrapper align={align} wrapContent={wrapContent} {...rest} />
);

export default TableSubheader;

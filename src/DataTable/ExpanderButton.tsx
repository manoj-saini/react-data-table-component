import * as React from 'react';
import styled from 'styled-components';
import { ExpandableIcon, Row } from '../types';

const ButtonStyle = styled.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({ theme }) => theme.expanderButton.style};
`;

interface ExpanderButtonProps {
	disabled?: boolean;
	expanded?: boolean;
	expandableIcon: ExpandableIcon;
	keyField: string;
	row: Row;
	onToggled?: (row: Row) => void;
}

const ExpanderButton: React.FC<ExpanderButtonProps> = ({
	disabled = false,
	expanded = false,
	expandableIcon,
	keyField,
	row,
	onToggled = null,
}) => {
	const icon = expanded ? expandableIcon.expanded : expandableIcon.collapsed;
	const handleToggle = () => onToggled && onToggled(row);

	return (
		<ButtonStyle
			aria-disabled={disabled}
			onClick={handleToggle}
			data-testid={`expander-button-${row[keyField]}`}
			disabled={disabled}
			aria-label={expanded ? 'Collapse Row' : 'Expand Row'}
			role="button"
			type="button"
		>
			{icon}
		</ButtonStyle>
	);
};

export default ExpanderButton;

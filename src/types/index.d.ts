import * as React from 'react';
import { CSSObject } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row<T = Record<string, any>> = T;
export type RowState<T = Row> = ((row: T) => boolean) | null;
export type SortDirection = 'asc' | 'desc';
export type Selector<T = Row> = string | ((row: T, rowIndex: number) => React.ReactNode);
export type Format<T = Row> = (row: T, rowIndex: number) => React.ReactNode;
export type ColumnSortFunction<T = Row> = (a: T, b: T) => number;
export type SortFunction<T = Row> = (rows: T[], field: string, sortDirection: 'asc' | 'desc') => T[];
export type DefaultSortField = string | number | null | undefined;
export type ExpandRowToggled<T = Row> = (expanded: boolean, row: T) => void;
export type RowClicked<T = Row> = (row: T, e: React.MouseEvent) => void;
export type ChangeRowsPerPage = (currentRowsPerPage: number, currentPage: number) => void;
export type ChangePage = (page: number, totalRows: number) => void;

export type KeyField = string;

export interface DataTableProps<T = Row> {
	title?: string | React.ReactNode;
	columns: DataTableColumn<T>[];
	data: T[];
	keyField?: KeyField;
	striped?: boolean;
	highlightOnHover?: boolean;
	pointerOnHover?: boolean;
	noDataComponent?: React.ReactNode;
	className?: string;
	style?: CSSObject;
	responsive?: boolean;
	disabled?: boolean;
	overflowY?: boolean;
	offset?: string;
	overflowYOffset?: string;
	dense?: boolean;
	noTableHead?: boolean;
	defaultSortFieldId?: DefaultSortField;
	defaultSortAsc?: boolean;
	sortIcon?: React.ReactNode;
	sortFunction?: SortFunction<T>;
	sortServer?: boolean;
	pagination?: boolean;
	paginationServer?: boolean;
	paginationServerOptions?: PaginationServerOptions;
	paginationDefaultPage?: number;
	paginationResetDefaultPage?: boolean;
	paginationTotalRows?: number;
	paginationPerPage?: number;
	paginationRowsPerPageOptions?: number[];
	paginationComponentOptions?: DataTablePaginationOptions;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	paginationComponent?: React.ComponentType<any>;
	paginationIconFirstPage?: React.ReactNode;
	paginationIconLastPage?: React.ReactNode;
	paginationIconNext?: React.ReactNode;
	paginationIconPrevious?: React.ReactNode;
	progressPending?: boolean;
	persistTableHead?: boolean;
	progressComponent?: React.ReactNode;
	expandableRows?: boolean;
	expandableRowsComponent?: React.ReactElement;
	expandOnRowClicked?: boolean;
	expandOnRowDoubleClicked?: boolean;
	expandableRowsHideExpander?: boolean;
	expandableRowExpanded?: RowState<T>;
	expandableRowDisabled?: RowState<T>;
	expandableIcon?: ExpandableIcon;
	expandableInheritConditionalStyles?: boolean;
	selectableRows?: boolean;
	selectableRowsComponent?: React.ReactElement;
	selectableRowsComponentProps?: Record<string, unknown>;
	selectableRowsHighlight?: boolean;
	selectableRowsVisibleOnly?: boolean;
	selectableRowSelected?: RowState<T>;
	selectableRowDisabled?: RowState<T>;
	selectableRowsNoSelectAll?: boolean;
	clearSelectedRows?: boolean;
	actions?: React.ReactNode | React.ReactNode[];
	noContextMenu?: boolean;
	contextMessage?: ContextMessage;
	contextActions?: React.ReactNode | React.ReactNode[];
	contextComponent?: React.ReactElement;
	noHeader?: boolean;
	fixedHeader?: boolean;
	fixedHeaderScrollHeight?: string;
	subHeader?: React.ReactNode | React.ReactNode[];
	subHeaderAlign?: Alignment;
	subHeaderWrap?: boolean;
	subHeaderComponent?: React.ReactNode | React.ReactNode[];
	customStyles?: DataTableStyles;
	theme?: Themes;
	conditionalRowStyles?: DataTableConditionalRowStyles<T>[];
	direction?: Direction;
	onChangeRowsPerPage?: ChangeRowsPerPage;
	onChangePage?: ChangePage;
	onRowClicked?: (row: T, e: React.MouseEvent) => void;
	onRowDoubleClicked?: (row: T, e: React.MouseEvent) => void;
	onRowExpandToggled?: ExpandRowToggled<T>;
	onSelectedRowsChange?: (selectedRowState: { allSelected: boolean; selectedCount: number; selectedRows: T[] }) => void;
	onSort?: (column: DataTableColumn<T>, sortDirection: 'asc' | 'desc') => void;
}

export interface DataTableConditionalCellStyles<T = Row> {
	when: (row: T) => boolean;
	style?: CSSObject | ((row: T) => CSSObject);
}

export interface DataTableColumn<T = Row> {
	id?: string | number;
	name: string | number | React.ReactNode;
	selector?: Selector<T>;
	sortable?: boolean;
	sortFunction?: ColumnSortFunction<T>;
	format?: Format<T> | undefined;
	cell?: (row: T, rowIndex: number, column: DataTableColumn, id: string | number) => React.ReactNode;
	grow?: number;
	width?: string;
	minWidth?: string;
	maxWidth?: string;
	right?: boolean;
	center?: boolean;
	compact?: boolean;
	ignoreRowClick?: boolean;
	button?: boolean;
	wrap?: boolean;
	allowOverflow?: boolean;
	hide?: number | ((value: number) => CSSObject) | Media;
	omit?: boolean;
	style?: CSSObject;
	conditionalCellStyles?: DataTableConditionalCellStyles<T>[];
}

export interface DataTableStyles {
	table?: {
		style: CSSObject;
	};
	tableWrapper?: {
		style: CSSObject;
	};
	header?: {
		style: CSSObject;
	};
	subHeader?: {
		style: CSSObject;
	};
	head?: {
		style: CSSObject;
	};
	headRow?: {
		style?: CSSObject;
		denseStyle?: CSSObject;
	};
	headCells?: {
		style?: CSSObject;
		activeSortStyle?: CSSObject;
		inactiveSortStyle?: CSSObject;
	};
	contextMenu?: {
		style?: CSSObject;
		activeStyle?: CSSObject;
	};
	cells?: {
		style: CSSObject;
	};
	rows?: {
		style?: CSSObject;
		selectedHighlightStyle?: CSSObject;
		denseStyle?: CSSObject;
		highlightOnHoverStyle?: CSSObject;
		stripedStyle?: CSSObject;
	};
	expanderRow?: {
		style: CSSObject;
	};
	expanderCell?: {
		style: CSSObject;
	};
	expanderButton?: {
		style: CSSObject;
	};
	pagination?: {
		style?: CSSObject;
		pageButtonsStyle?: CSSObject;
	};
	noData?: {
		style: CSSObject;
	};
	progress?: {
		style: CSSObject;
	};
}

export interface DataTableConditionalRowStyles<T = Row> {
	when: (row: T) => boolean;
	style?: CSSObject | ((row: T) => CSSObject);
}

export interface DataTablePaginationOptions {
	noRowsPerPage?: boolean;
	rowsPerPageText?: string;
	rangeSeparatorText?: string;
	selectAllRowsItem?: boolean;
	selectAllRowsItemText?: string;
}

export interface ExpandableIcon {
	collapsed: React.ReactNode;
	expanded: React.ReactNode;
}

export interface ContextMessage {
	singular: string;
	plural: string;
	message?: string;
}

export interface PaginationServerOptions {
	persistSelectedOnSort?: boolean;
	persistSelectedOnPageChange?: boolean;
}

type ThemeText = {
	primary: string;
	secondary: string;
	disabled: string;
};

type ThemeBackground = {
	default: string;
};

type ThemeContext = {
	background: string;
	text: string;
};

type ThemeDivider = {
	default: string;
};

type ThemeButton = {
	default: string;
	focus: string;
	hover: string;
	disabled: string;
};

type ThemeSortFocus = {
	default: string;
};

type ThemeSelected = {
	default: string;
	text: string;
};

type ThemeHighlightOnHover = {
	default: string;
	text: string;
};

type ThemeStriped = {
	default: string;
	text: string;
};

export interface ThemeCustom {
	text?: ThemeText;
	background?: ThemeBackground;
	context?: ThemeContext;
	divider?: ThemeDivider;
	button?: ThemeButton;
	sortFocus?: ThemeSortFocus;
	selected?: ThemeSelected;
	highlightOnHover?: ThemeHighlightOnHover;
	striped?: ThemeStriped;
}

export type Themes = 'default' | 'dark' | string | undefined;

export interface Theme {
	text: ThemeText;
	background: ThemeBackground;
	context: ThemeContext;
	divider: ThemeDivider;
	button: ThemeButton;
	sortFocus: ThemeSortFocus;
	selected: ThemeSelected;
	highlightOnHover: ThemeHighlightOnHover;
	striped: ThemeStriped;
}

export interface IDefaultThemes {
	default: Theme;
	dark: Theme;
}

export interface DataTableState<T = Row> {
	allSelected: boolean;
	contextMessage: ContextMessage;
	rows: T[];
	selectedCount: number;
	selectedRows: T[];
	selectedColumn: DataTableColumn;
	sortDirection: SortDirection;
	currentPage: number;
	rowsPerPage: number;
	selectedRowsFlag: boolean;
}

export interface AllRowsAction<T = Row> {
	type: 'SELECT_ALL_ROWS';
	keyField: KeyField;
	rows: T[];
	rowCount: number;
	mergeSelections: boolean;
}

export interface SingleRowAction<T = Row> {
	type: 'SELECT_SINGLE_ROW';
	keyField: KeyField;
	row: T;
	isSelected: boolean;
	rowCount: number;
}

export interface MultiRowAction<T = Row> {
	type: 'SELECT_MULTIPLE_ROWS';
	keyField: KeyField;
	selectedRows: T[];
	rows: T[];
	mergeSelections: boolean;
}

export interface SortAction<T = Row> {
	type: 'SORT_CHANGE';
	rows: T[];
	sortDirection: SortDirection;
	sortServer: boolean;
	selectedColumn: DataTableColumn;
	pagination: boolean;
	paginationServer: boolean;
	visibleOnly: boolean;
	persistSelectedOnSort: boolean;
}

export interface PaginationPageAction {
	type: 'CHANGE_PAGE';
	page: number;
	paginationServer: boolean;
	visibleOnly: boolean;
	persistSelectedOnPageChange: boolean;
}

export interface PaginationRowsPerPageAction {
	type: 'CHANGE_ROWS_PER_PAGE';
	rowsPerPage: number;
	page: number;
}

export interface ClearSelectedRowsAction {
	type: 'CLEAR_SELECTED_ROWS';
	selectedRowsFlag: boolean;
}

export interface RowsAction<T = Row> {
	type: 'UPDATE_ROWS';
	rows: T[];
}

export type Action =
	| AllRowsAction
	| SingleRowAction
	| MultiRowAction
	| SortAction
	| PaginationPageAction
	| PaginationRowsPerPageAction
	| ClearSelectedRowsAction
	| RowsAction
	| { type: '' };

export const defaultThemes: IDefaultThemes;
export function createTheme<T>(name: string, customTheme: T): Theme;

export default function DataTable<T>(props: DataTableProps<T>): React.ReactElement;

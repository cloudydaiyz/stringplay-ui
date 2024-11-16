export interface DialogAction {
    label: React.ReactNode,
    color: React.CSSProperties['backgroundColor'],
    onClick: () => Promise<void>;
}

export interface DialogProps {
    title: string,
    content: React.ReactNode,
    actions: DialogAction[];
    active?: boolean;
}

export interface ConfirmDialogProps {
    title: string,
    content: React.ReactNode,
    onConfirm: () => Promise<void>;
}
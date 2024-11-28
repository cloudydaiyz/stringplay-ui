import { createContext, useContext, useState } from "react";
import { ConfirmDialogProps, DialogProps } from "../types/dialog-types";

const initialProps: DialogProps = {
    title: "Nothing selected",
    content: <p>You shouldn't be able to see this.</p>,
    actions: [],
}

function useDialog() {
    const [active, setActive] = useState(false);
    const [props, setProps] = useState<DialogProps>(initialProps);
    const [lastOpened, setLastOpened] = useState(new Date());
    props.active = active;

    return { setActive, setProps, setLastOpened, lastOpened, ...props }
}

export const DialogContext = createContext<ReturnType<typeof useDialog> | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const dialog = useDialog();
    return (
        <DialogContext.Provider value={dialog}>
            { children }
        </DialogContext.Provider>
    );
}

function useDialogContext() {
    const dialogContext = useContext(DialogContext);
    if(dialogContext === undefined) {
        throw new Error("Invalid state. Make sure that you're using `DialogProvider` correctly.");
    }
    return dialogContext;
}

export function useDialogProps() {
    const { setActive, setProps, setLastOpened, lastOpened, ...props } = useDialogContext();
    return { lastOpened, props };
}

export function useDialogToggle() {
    const { setActive, setProps, setLastOpened, ...props } = useDialogContext();

    const openDialog = (newProps: DialogProps) => {
        if(props.active) {
            console.error("Dialog already in use.");
            return;
        }

        setProps(newProps);
        setActive(true);
        setLastOpened(new Date());
    }

    const openConfirmDialog = ({ title, content, onConfirm }: ConfirmDialogProps) => {
        if(props.active) {
            console.error("Dialog already in use.");
            return;
        }

        setProps({
            title,
            content,
            actions: [
                {
                    label: 'CANCEL',
                    color: 'var(--g2)',
                    onClick: async () => closeDialog()
                },
                {
                    label: 'CONFIRM',
                    color: 'var(--success-dark)',
                    onClick: async () => {
                        closeDialog();
                        onConfirm();
                    }
                },
            ]
        });
        setActive(true);
        setLastOpened(new Date());
    }

    const closeDialog = () => {
        setActive(false);
    }

    return { openDialog, openConfirmDialog, closeDialog };
}
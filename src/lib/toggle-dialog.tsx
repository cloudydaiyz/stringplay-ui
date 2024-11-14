import { createContext, useContext, useState } from "react";
import { DialogProps } from "../types/dialog-types";

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
        setActive(true);
        setProps(newProps);
        setLastOpened(new Date());
    }

    const closeDialog = () => {
        console.log('closing dialog', props.active);
        setActive(false);
    }

    return { openDialog, closeDialog };
}
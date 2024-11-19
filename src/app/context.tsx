import { ApiClientProvider } from "../lib/api-client";
import { DialogProvider } from "../lib/toggle-dialog";

export function AppContext({ children }: { children: React.ReactNode }) {
    return (
        <ApiClientProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </ApiClientProvider>
    );
}
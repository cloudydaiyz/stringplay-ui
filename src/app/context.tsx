import { ApiClientProvider } from "../lib/api-client";
import { NotificationsProvider } from "../lib/notifications";
import { DialogProvider } from "../lib/toggle-dialog";

export function AppContext({ children }: { children: React.ReactNode }) {
    return (
        <ApiClientProvider>
            <DialogProvider>
                <NotificationsProvider>
                    {children}
                </NotificationsProvider>
            </DialogProvider>
        </ApiClientProvider>
    );
}
import { ContextDialog } from "../components/common/Dialog";
import { ApiClientProvider } from "../lib/api-client";
import { NotificationsProvider } from "../lib/notifications";
import { DialogProvider } from "../lib/toggle-dialog";

export function AppContext({ children }: { children: React.ReactNode }) {
    return (
        <NotificationsProvider>
            <ApiClientProvider>
                <DialogProvider>
                    {children}
                    <ContextDialog />
                </DialogProvider>
            </ApiClientProvider>
        </NotificationsProvider>
    );
}
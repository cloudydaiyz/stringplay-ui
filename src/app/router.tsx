import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { AppContext } from "./context";
import { ErrorBoundary } from "react-error-boundary";

/** Wraps the console element with AppContext */
const getAppConsole = async () => {
    const { Console } = await import("../pages/Console");
    const AppConsole = () => (
        <ErrorBoundary fallback={<Navigate to={"/login"}/>}>
            <AppContext>
                <Console />
            </AppContext>
        </ErrorBoundary>
    );
    return { AppConsole }
}

export const routes = [
    {
        path: "/",
        element: <Navigate to="/login"/>,
    },
    {
        path: "/login",
        lazy: async () => {
            const { LoginPage } = await import("../pages/LoginPage");
            return { Component: LoginPage };
        },
    },
    {
        path: "/register",
        lazy: async () => {
            const { SignupPage } = await import("../pages/SignupPage");
            return { Component: SignupPage };
        },
    },
    {
        path: "/console",
        lazy: async () => {
            const { AppConsole } = await getAppConsole();
            return { Component: AppConsole };
        },
    },
    {
        path: "/not-found",
        lazy: async () => {
            const { PageNotFound } = await import("../pages/PageNotFound");
            return { Component: PageNotFound };
        },
    },
    {
        path: "/no-service",
        lazy: async () => {
            const { NoServicesPage } = await import("../pages/NoServicesPage");
            return { Component: NoServicesPage };
        },
    },
    {
        path: "*",
        element: <Navigate to="/not-found"/>,
    }
];

export function AppRouter() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
}
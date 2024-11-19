import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

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
            const { Console } = await import("../pages/Console");
            return { Component: Console };
        },
    },
    {
        path: "*",
        lazy: async () => {
            const { PageNotFound } = await import("../pages/PageNotFound");
            return { Component: PageNotFound };
        },
    }
];

export function AppRouter() {
    return <RouterProvider router={createBrowserRouter(routes)} />;
}
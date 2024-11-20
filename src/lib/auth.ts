import { api } from "./api-client";
import type { AxiosError } from "axios";

export function useAuth() {
    const login = async (user: string, password: string) => {
        return api.login(user, password)
            .then(d => { 
                api.addCredentials(d.data.accessToken, d.data.refreshToken);
                return d;
            }).catch(e => {
                const err = e as AxiosError;
                console.log(err, 'error');
                return err;
            });
    }

    const refresh = async (refreshToken: string) => {
        return api.refreshCredentials(refreshToken)
            .then(d => {
                api.addCredentials(d.data.accessToken, d.data.refreshToken);
                localStorage.setItem("at", d.data.accessToken);
                localStorage.setItem("rt", d.data.refreshToken);
                return d;
            }).catch(e => {
                const err = e as AxiosError;
                console.log(err, 'error');
                return err;
            });
    }

    const register = async (username: string, email: string, password: string, troupe?: string) => {
        return api.register(username, email, password, troupe || username + "'s Troupe")
            .then(d => {
                return d;
            }).catch(e => {
                const err = e as AxiosError;
                console.log(err, 'error');
                return err;
            });
    }

    return { login, refresh, register };
}
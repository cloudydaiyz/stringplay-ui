import { Credentials } from "@cloudydaiyz/stringplay-core/types/api";
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

    /** Retrieves auth from local storage (for now) */
    const getAuth = () => {
        try {
            const c = JSON.parse(localStorage.getItem("nbvcxz")!) as Credentials;
            api.addCredentials(c.accessToken, c.refreshToken);
        } catch {
            return false;
        }
        return true;
    }

    /** Saves auth to local storage */
    const saveAuth = () => {
        const c = api.getCredentials();
        if(c) localStorage.setItem("nbvcxz", JSON.stringify(c));
    }

    return { login, refresh, register, getAuth, saveAuth };
}
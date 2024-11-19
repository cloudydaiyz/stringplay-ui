import { http, HttpResponse, delay } from 'msw';
import { API_CLIENT_URL } from './constants';
import { LoginRequest, RegisterRequest } from '@cloudydaiyz/stringplay-core/types/api';

function getUrl(uri: string, path: string) {
    return (new URL(path, uri)).href;
}

const accessToken = "example";
const refreshToken = "tokens";

export const mockLogin = () => http.post(
    getUrl(API_CLIENT_URL, "/auth/login"), 
    async ({ request }) => {
        await delay(800);
        const { usernameOrEmail, password } = await request.json() as LoginRequest;
        if((usernameOrEmail == "user" || usernameOrEmail == "user@gmail.com") && password == "pass") {
            return HttpResponse.json({ accessToken, refreshToken });
        }
        return HttpResponse.json(null, { status: 400 });
    }
)

export const mockRegister = () => http.post(
    getUrl(API_CLIENT_URL, "/auth/register"), 
    async ({ request }) => {
        await delay(800);
        const { username, email } = await request.json() as RegisterRequest;
        if(username == "user" || email == "user@gmail.com") {
            return HttpResponse.json(null, { status: 400 });
        }
        return HttpResponse.json({ accessToken, refreshToken });
    }
)
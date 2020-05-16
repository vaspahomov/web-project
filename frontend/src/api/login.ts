const serverUrl = 'https://api-picture.herokuapp.com'

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export class LoginService {
    async login(username: string, password: string) {
        const resp = await fetch(`${serverUrl}/auth/authenticate`,
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: defaultHeaders,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async register(username: string, password: string) {
        const resp = await fetch(`${serverUrl}/auth/register`,
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: defaultHeaders,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }
}
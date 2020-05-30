const serverUrl = 'https://api-picture.herokuapp.com/auth'

const defaultHeaders = {
    'Content-Type': 'application/json'
};


export class LoginService {
    async login(username: string, password: string) {
        const resp = await fetch(`${serverUrl}/authenticate`,
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: defaultHeaders,
                credentials: 'include'
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        const jwt = (await resp.json()).token;
        localStorage.setItem('jwt', `Bearer ${jwt}`);
    }

    async register(username: string, password: string) {
        const resp = await fetch(`${serverUrl}/register`,
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: defaultHeaders,
                credentials: 'include'
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    authSuccess(): boolean {
        return localStorage.getItem('jwt') != null;
    }
}
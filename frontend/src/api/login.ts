const serverUrl = 'https://api-picture.herokuapp.com/api/auth'

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export interface UserEntity {
    username: string;
}

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

    async me(): Promise<UserEntity> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/me`,
            {
                headers: {...defaultHeaders, Authorization: jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    authSuccess(): boolean {
        return localStorage.getItem('jwt') != null;
    }
}
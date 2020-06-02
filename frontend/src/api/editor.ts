const serverUrl = 'https://api-picture.herokuapp.com/api/pictures'

export class Rectangle {
    public left: number;
    public right: number;
    public top: number;
    public bottom: number;

    public constructor(bottom: number, top: number, right: number, left: number) {
        this.bottom = bottom;
        this.top = top;
        this.left = left;
        this.right = right;
    }
}

export enum CropForm {
    Round,
    Oval,
    HeartShape
}

export enum ColorFilters {
    Sepia,
    BlackAndWhite,
}

export enum BlurFilters {
    Round = 0,
    Gauss = 1,
}

export enum ImageFormat {
    JPEG,
    PNG
}

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export class EditorService {
    async crop(pictureId: string, rectangle: Rectangle) {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/crop    `,
            {
                method: 'POST',
                body: JSON.stringify({rectangle: rectangle}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    async rotate(pictureId: string, angle: number): Promise<any> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/rotate`,
            {
                method: 'POST',
                body: JSON.stringify({angle}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    async addText(pictureId: string, text: string, color: string): Promise<any> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/addText`,
            {
                method: 'POST',
                body: JSON.stringify({text}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    async applyColorFilter(pictureId: string, colorFilter: ColorFilters): Promise<any> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/filter`,
            {
                method: 'POST',
                body: JSON.stringify({type: colorFilter.valueOf()}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    async applyBlurFilter(pictureId: string, blurFilter: BlurFilters): Promise<any> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/blur`,
            {
                method: 'POST',
                body: JSON.stringify({type: blurFilter.valueOf(), size: 10}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.json();
    }

    async downloadImage(pictureId: string, format: ImageFormat): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        return '';
    }

    async getImage(pictureId: string): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/download/${pictureId}`, {
            headers: {...defaultHeaders, 'Authorization': jwt},
        });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    buildUri(id: string): string {
        return `${serverUrl}/${id}`;
    }
}
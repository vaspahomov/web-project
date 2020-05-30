const serverUrl = 'https://api-picture.herokuapp.com/api/picture'

export enum CropForm {
    Round,
    Oval,
    HeartShape
}

export enum ColorFilters {
    BlackAndWhite,
    Sepia,
}

export enum BlurFilters {
    Round = 'circular',
    Gauss = 'gaussian',
}

export enum ImageFormat {
    JPEG,
    PNG
}

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export class EditorService {
    async crop(pictureId: string, form: CropForm) {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/crop/${pictureId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({cropForm: form}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async rotate(pictureId: string, angle: number): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${pictureId}/rotate`,
            {
                method: 'PATCH',
                body: String(angle),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async addText(pictureId: string, text: string, color: string): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/text/${pictureId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({text}),
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async applyColorFilter(pictureId: string, colorFilter: ColorFilters): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/${colorFilter}/${pictureId}`,
            {
                method: 'PATCH',
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async applyBlurFilter(pictureId: string, blurFilter: BlurFilters): Promise<string> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/blur/${blurFilter}/${pictureId}`,
            {
                method: 'PATCH',
                headers: {...defaultHeaders, 'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
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
}
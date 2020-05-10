const serverUrl = 'https://api-picture.herokuapp.com'

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
        const resp = await fetch(`${serverUrl}/crop/${pictureId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({cropForm: form}),
                headers: defaultHeaders,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async rotate(pictureId: string, angle: number): Promise<string> {
        const resp = await fetch(`${serverUrl}/rotate/${pictureId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({degrees: angle}),
                headers: defaultHeaders,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async addText(pictureId: string, text: string, color: string): Promise<string> {
        const resp = await fetch(`${serverUrl}/text/${pictureId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({text}),
                headers: defaultHeaders,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async applyColorFilter(pictureId: string, colorFilter: ColorFilters): Promise<string> {
        const resp = await fetch(`${serverUrl}/${colorFilter}/${pictureId}`,
            {
                method: 'PATCH',
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async applyBlurFilter(pictureId: string, blurFilter: BlurFilters): Promise<string> {
        const resp = await fetch(`${serverUrl}/blur/${blurFilter}/${pictureId}`,
            {
                method: 'PATCH',
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }

    async downloadImage(pictureId: string, format: ImageFormat): Promise<string> {
        return '';
    }

    async getImage(pictureId: string): Promise<string> {
        const resp = await fetch(`${serverUrl}/download/${pictureId}`);
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }
}
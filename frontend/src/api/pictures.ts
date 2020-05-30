import {Image} from "../static/ImagesCollection";

const serverUrl = 'https://api-picture.herokuapp.com/api/pictures'


const defaultHeaders = {
    'Content-Type': 'application/json'
};

interface ImageResponse {
    name: string;
    id: string;
    width: number;
    height: number;
}

export class PicturesService {
    async getAll(jwt: string): Promise<Image[]> {
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const resp = await fetch(`${serverUrl}/`,
            {
                headers: {'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return (await resp.json()).map((x: ImageResponse) => {
            return {
                url: serverUrl + '/' + x.id,
                name: x.name,
                height: x.height,
                width: x.width,
                id: x.id,
            }
        });
    }

    async upload(image: any) {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            throw new Error('Empty jwt');
        }
        const formData = new FormData();
        formData.append('file', image, image.name);
        const resp = await fetch(`${serverUrl}/upload`,
            {
                method: 'POST',
                body: formData,
                headers: {'Authorization': jwt},
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }
}


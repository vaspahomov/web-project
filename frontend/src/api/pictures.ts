import {Image} from "../static/ImagesCollection";

const serverUrl = 'https://api-picture.herokuapp.com/api/pictures'


const defaultHeaders = {
    'Content-Type': 'application/json'
};

interface ImageResp {
    filename: string;
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
        return (await resp.json()).map((x: ImageResp) => {
            return {
                url: serverUrl + '/' + x.filename,
                name: 'Test image',
                height: 300,
                width: 400,
                id: x.filename,
            }
        });
    }
}


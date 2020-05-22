const serverUrl = 'https://api-picture.herokuapp.com'

export class CollectionService {
    async upload(image: any){
        const formData = new FormData();
        formData.append('file', image, image.name);
        const resp = await fetch(`${serverUrl}/api/picture/upload`,
            {
                method: 'POST',
                body: formData,
            });
        if (!resp.ok)
            throw new Error('Bad server response');
        return resp.text();
    }
}
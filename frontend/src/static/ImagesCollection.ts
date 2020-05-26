export interface Image {
    name: string;
    url: string;
    height: number;
    width: number;
    id: string;
}

const images = [
    {
        id: "0",
        name: "Картинка",
        url: "https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg",
        height: 540,
        width: 720
    },
    {
        id: "1",
        name: "Картинка 2",
        url: "https://www.meme-arsenal.com/memes/bd4489bf8ba9cfc10e8fcf3601ef986f.jpg",
        height: 540,
        width: 720
    },
    {
        id: "2",
        name: "Треугольник",
        url: "https://i.pinimg.com/originals/bc/40/46/bc4046ef9942c90d87f164ef153d7d4a.png",
        height: 512,
        width: 512
    },
    {
        id: "3",
        name: "Овал",
        url: "https://sun9-32.userapi.com/c636321/v636321125/21b8d/aD7FZEcuH7g.jpg?ava=1",
        height: 400,
        width: 400
    }
]

const imagesMap = new Map<string, Image>(images.map(e => [e.id, e]));

export class ImagesCollection {
    getImage(id: string): Image | undefined {
        return imagesMap.get(id);
    }

    getAllImages(): Image[] {
        return images;
    }
}
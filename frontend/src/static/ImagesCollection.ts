const images = [
    {id: "0", name: "Картинка", url: "https://i.kym-cdn.com/photos/images/facebook/000/323/614/edf.jpg"},
    {id: "1", name: "Хуинка", url: "https://lh3.googleusercontent.com/proxy/gwh7CbYhaLMSnWe0piivSeeXYZ-5hBPNAarql8KCOarKsJiW8nW3YhwKfDqDoXWUkOePz1UcXqEIVHewUGZmpZh0pEpD23CrQaiK"},
    {id: "2", name: "Треугольник", url: "https://i.pinimg.com/originals/bc/40/46/bc4046ef9942c90d87f164ef153d7d4a.png"},
    {id: "3", name: "Охуел?", url: "https://sun9-32.userapi.com/c636321/v636321125/21b8d/aD7FZEcuH7g.jpg?ava=1"}
]

const imagesMap = new Map(images.map(e => [e.id, e]));

export class ImagesCollection {
    getImage(id: string) {
        return imagesMap.get(id);
    }

    getAllImages() {
        return images;
    }
}
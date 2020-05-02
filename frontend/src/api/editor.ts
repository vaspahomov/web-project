const serverUrl = 'https://api.web-project-ddddddd.herokuapp.com'

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
    Round,
    Gauss,
}

export enum ImageFormat {
    JPEG,
    PNG
}

export class EditorService {
    async crop(form: CropForm) {

    }

    async rotate(angle: number) {

    }

    async addText(text: string, color: string) {

    }

    async applyColorFilter(colorFilter: ColorFilters) {

    }

    async applyBlurFilter(blurFilter: BlurFilters) {

    }

    async getImage(format: ImageFormat) {

    }
}
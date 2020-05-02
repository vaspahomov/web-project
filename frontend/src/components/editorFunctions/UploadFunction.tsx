import ImageUploader from 'react-images-upload';
import * as React from 'react';
import {CSSProperties} from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";


type Props = {
    style: CSSProperties;
}

const pictures = [];

const onLoad = (picture: any) => {
    pictures.push(picture);
}

const UploadFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onLoad}
                    imgExtension={['.jpg', '.png', '.jpeg']}
                    maxFileSize={5242880}
                />
            </CardContent>
        </Card>
    </div>
);

export default UploadFunction;
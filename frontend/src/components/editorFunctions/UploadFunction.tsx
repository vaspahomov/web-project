import ImageUploader from 'react-images-upload';
import * as React from 'react';
import {CSSProperties, Dispatch} from 'react';
import {Card, CardContent} from "@material-ui/core";
import {EditorService} from "../../api/editor";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const pictures = [];

const onLoad = (picture: any) => {
    pictures.push(picture);
}

const UploadFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => (
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
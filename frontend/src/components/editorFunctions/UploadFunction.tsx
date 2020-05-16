import ImageUploader from 'react-images-upload';
import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {Card, CardContent} from "@material-ui/core";
import {EditorService} from "../../api/editor";
import MuiAlert from "@material-ui/lab/Alert";


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

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => setCtx(false), 3000);
}

const UploadFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => {
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    return (
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
            {success ? <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                    inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                        : undefined}
        </div>
    );
}

export default UploadFunction;
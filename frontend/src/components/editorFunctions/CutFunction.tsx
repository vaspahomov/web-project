import * as React from 'react';
import {CSSProperties, Dispatch} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {CropForm, EditorService} from "../../api/editor";

type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const CutFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button onClick={() => {
                        editorService.crop(pictureId, CropForm.Round)
                    }}>Round</Button>
                    <Button onClick={() => {
                        editorService.crop(pictureId, CropForm.Oval)
                    }}>Oval</Button>
                    <Button onClick={() => {
                        editorService.crop(pictureId, CropForm.HeartShape)
                    }}>Heart shaped</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);

export default CutFunction;
import * as React from 'react';
import {CSSProperties, Dispatch} from 'react';
import {Button, ButtonGroup, Card, CardContent, Typography} from "@material-ui/core";
import {EditorService} from "../../api/editor";

type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const SaveFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button>PNG</Button>
                    <Button>JPEG</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);

export default SaveFunction;
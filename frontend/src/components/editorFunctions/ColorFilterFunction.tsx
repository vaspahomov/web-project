import * as React from 'react';
import {CSSProperties, Dispatch} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {ColorFilters, EditorService} from "../../api/editor";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const ColorFilterFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button onClick={() => {
                        editorService.applyColorFilter(pictureId, ColorFilters.BlackAndWhite)
                    }}>Black and white</Button>
                    <Button onClick={() => {
                        editorService.applyColorFilter(pictureId, ColorFilters.Sepia)
                    }}>Sepia</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);


export default ColorFilterFunction;
import * as React from 'react';
import {CSSProperties, Dispatch} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {BlurFilters, EditorService} from "../../api/editor";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
}

const BlurFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button onClick={() => {
                        editorService.applyBlurFilter(pictureId, BlurFilters.Round)
                    }}>Round</Button>
                    <Button onClick={() => {
                        editorService.applyBlurFilter(pictureId, BlurFilters.Gauss)
                    }}>Gauss</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);


export default BlurFunction;
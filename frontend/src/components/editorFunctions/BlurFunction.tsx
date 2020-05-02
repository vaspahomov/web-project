import * as React from 'react';
import {CSSProperties} from 'react';
import {Button, ButtonGroup, Card, CardContent} from "@material-ui/core";
import {BlurFilters, EditorService} from "../../api/editor";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
}

const BlurFunction: React.FunctionComponent<Props> = ({style, editorService}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button onClick={() => {
                        editorService.applyBlurFilter(BlurFilters.Round)
                    }}>Round</Button>
                    <Button onClick={() => {
                        editorService.applyBlurFilter(BlurFilters.Gauss)
                    }}>Gauss</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);


export default BlurFunction;
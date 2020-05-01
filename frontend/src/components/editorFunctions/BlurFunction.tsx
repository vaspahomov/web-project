import * as React from 'react';
import {CSSProperties} from 'react';
import {Button, ButtonGroup, Card, CardContent, Typography} from "@material-ui/core";


type Props = {
    style: CSSProperties;
}

const BlurFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Blure filters</Typography>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button>Round</Button>
                    <Button>Gauss</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);


export default BlurFunction;
import * as React from 'react';
import {CSSProperties} from 'react';
import {Button, ButtonGroup, Card, CardContent, Typography} from "@material-ui/core";

type Props = {
    style: CSSProperties;
}

const CutFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Cut</Typography>
                <ButtonGroup variant="contained" color="primary"
                             aria-label="contained primary button group">
                    <Button>Round</Button>
                    <Button>Oval</Button>
                    <Button>Heart shaped</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </div>
);

export default CutFunction;
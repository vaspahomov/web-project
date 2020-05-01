import * as React from 'react';
import {CSSProperties} from 'react';
import {Button, ButtonGroup, Card, CardContent, Typography} from "@material-ui/core";

type Props = {
    style: CSSProperties;
}

const SaveFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Save</Typography>
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
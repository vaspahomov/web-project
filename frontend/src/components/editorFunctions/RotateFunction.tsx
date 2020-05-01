import * as React from 'react';
import {CSSProperties} from 'react';
import {Button, Card, CardContent, Slider, Typography} from "@material-ui/core";


type Props = {
    style: CSSProperties;
}

const rotateAngleMarks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 90,
        label: '90°C',
    },
    {
        value: 180,
        label: '180°C',
    },
    {
        value: 270,
        label: '270°C',
    },
    {
        value: 360,
        label: '360°C',
    },
];


const valuetext = (value: number) => {
    return `${value}°C`;
}

const RotateFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Rotate</Typography>
                <Slider
                    min={0}
                    max={360}
                    defaultValue={90}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    marks={rotateAngleMarks}
                    valueLabelDisplay="auto"
                />
                <Button variant="contained" color="primary">Submit</Button>
            </CardContent>
        </Card>
    </div>
);

export default RotateFunction;
import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {Button, Card, CardContent, Slider} from "@material-ui/core";
import {EditorService} from "../../api/editor";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
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

const RotateFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId}) => {
    const [value, changeValue] = useState(90);
    return (
        <div style={style}>
            <Card>
                <CardContent>
                    <Slider
                        min={0}
                        max={360}
                        value={value}
                        onChange={(_, v) => changeValue(Number(v))}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-custom"
                        step={10}
                        marks={rotateAngleMarks}
                        valueLabelDisplay="auto"
                    />
                    <Button
                        variant="contained"
                        color="primary" onClick={() => {
                        editorService.rotate(pictureId, value)
                    }}>Submit</Button>
                </CardContent>
            </Card>
        </div>
    )
};

export default RotateFunction;
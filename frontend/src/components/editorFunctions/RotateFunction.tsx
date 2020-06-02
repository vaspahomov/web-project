import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {Button, Card, CardContent, Slider} from "@material-ui/core";
import {CropForm, EditorService} from "../../api/editor";
import MuiAlert from "@material-ui/lab/Alert";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
    setPictureId: (id: any) => void;
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

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => setCtx(false), 3000);
}

const RotateFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId, setPictureId}) => {
    const [value, changeValue] = useState(90);
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
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
                        color="primary" onClick={async () => {
                        handleOperation(setInProgress);
                        let resp;
                        try {
                            resp = await editorService.rotate(pictureId, value)
                        } catch {
                            return handleOperation(setError)
                        }
                        handleOperation(setSuccess);
                        setPictureId(resp.id);
                    }}>Submit</Button>
                </CardContent>
            </Card>
            {success ? <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                    inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                        : undefined}
        </div>
    )
};

export default RotateFunction;
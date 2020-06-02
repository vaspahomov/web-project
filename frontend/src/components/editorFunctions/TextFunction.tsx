import * as React from 'react';
import {CSSProperties, Dispatch, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {EditorService} from "../../api/editor";
import MuiAlert from "@material-ui/lab/Alert";


type Props = {
    style: CSSProperties;
    editorService: EditorService;
    changeLoaded: Dispatch<boolean>;
    pictureId: string;
    setPictureId: (id: any) => void;
}

const styles = {
    card: {
        display: 'flex',
        'flex-wrap': 'wrap'
    }, control: {
        margin: '10px',
        width: '200px'
    }
}

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => setCtx(false), 3000);
}

const TextFunction: React.FunctionComponent<Props> = ({style, editorService, pictureId, setPictureId}) => {
    const {card, control} = styles;
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    return (
        <div style={style}>
            <Card>
                <CardContent style={card}>
                    <FormControl style={control}>
                        <Typography>Text to append:</Typography>
                    </FormControl>
                    <FormControl style={control}>
                        <TextField label="" variant="outlined"/>
                    </FormControl>
                    <FormControl style={control}>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={'#fff'}
                            onChange={(event) => {
                                return event.target;
                            }}
                        >
                            <MenuItem value={'#fff'}>White</MenuItem>
                            <MenuItem value={'#000'}>Black</MenuItem>
                            <MenuItem value={'#f00'}>Red</MenuItem>
                            <MenuItem value={'#ff0'}>Yellow</MenuItem>
                            <MenuItem value={'#0f0'}>Green</MenuItem>
                            <MenuItem value={'#00f'}>Blue</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={control}>
                        <Button variant="contained" color="primary">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
            {success ? <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                    inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                        : undefined}
        </div>
    );
};

export default TextFunction;
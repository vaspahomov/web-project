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
import {EditorService, Rectangle} from "../../api/editor";
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
    const [color, setColor] = React.useState('#fff');
    const [text, setText] = React.useState('');
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChangeColor = (event: React.ChangeEvent<{ value: unknown }>) => {
        setColor(event.target.value as string);
    };

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div style={style}>
            <Card>
                <CardContent style={card}>
                    <FormControl style={control}>
                        <Typography>Text to append:</Typography>
                    </FormControl>
                    <FormControl style={control}>
                        <TextField label="" variant="outlined" onChange={handleChangeText}/>
                    </FormControl>
                    <FormControl style={control}>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={color}
                            onChange={handleChangeColor}
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
                        <Button variant="contained" color="primary" onClick={
                            async () => {
                                handleOperation(setInProgress);
                                let resp;
                                try {
                                    resp = await editorService.addText(pictureId, text, color)
                                } catch {
                                    return handleOperation(setError)
                                }
                                handleOperation(setSuccess)
                                setPictureId(resp.id);
                            }
                        }>
                            Submit
                        </Button>
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
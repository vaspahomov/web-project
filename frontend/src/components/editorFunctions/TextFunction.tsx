import * as React from 'react';
import {CSSProperties} from 'react';
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


type Props = {
    style: CSSProperties;
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

const TextFunction: React.FunctionComponent<Props> = ({style}) => {
    const {card, control} = styles;
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
        </div>
    );
};

export default TextFunction;
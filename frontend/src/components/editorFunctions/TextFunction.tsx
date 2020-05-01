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

const TextFunction: React.FunctionComponent<Props> = ({style}) => (
    <div style={style}>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Add text on image</Typography>
                <FormControl>
                    <TextField label="" variant="outlined"/>
                </FormControl><br/>
                <FormControl>
                    <InputLabel>Color</InputLabel>
                    <Select
                        value={'#ffffff'}
                        onChange={() => {return;}}
                    >
                        <MenuItem value={'#ffffff'}>White</MenuItem>
                        <MenuItem value={'#ffffff'}>White</MenuItem>
                        <MenuItem value={'#ffffff'}>White</MenuItem>
                    </Select>
                </FormControl><br/>
                <Button variant="contained" color="primary">Submit</Button>
            </CardContent>
        </Card>
    </div>
);

export default TextFunction;
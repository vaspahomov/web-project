import * as React from "react";
import {Button} from "@material-ui/core";
import {PicturesService} from "../api/pictures";

type Props = {
    onUpload: () => void
}

const styles = {
    rootContainer: {
        margin: '20px'
    },
    input: {
        display: 'none'
    },
    description: {
        margin: '10px',
        width: '400px',
        height: '400px',
        display: 'flex',
        'flex-wrap': 'wrap',
    }
}

const UploadButton: React.FunctionComponent<Props> = ({onUpload}) => {
    const {rootContainer, input, description} = styles;
    const collectionService = new PicturesService();
    const handleFile = async (e: any) => {
        const file = e.target.files[0];
        if (file === undefined)
            return;
        await collectionService.upload(file);
        onUpload();
    }

    return (
        <div style={{...rootContainer}}>
            <input
                accept="image/*"
                style={{...input}}
                id="raised-button-file"
                type="file"
                onChange={handleFile}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span" style={{...description}}>
                    Upload
                </Button>
            </label>
        </div>
    );
};

export default UploadButton;


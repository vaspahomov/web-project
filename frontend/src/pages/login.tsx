import * as React from 'react'
import Layout from "../components/Layout";
import {Button, TextField} from "@material-ui/core";


const styles = {
    root: {
        width: '100vw',
        minHeight: 'calc(100vh - 120px)'
    }, formContainer: {
        margin: 'auto',
        width: '400px',
    }, formInput: {
        width: '390px',
    }
}

export default function Login() {
    const {root, formContainer, formInput} = styles;
    return (
        <Layout title="Photokek | Login">
            <main style={root}>
                <div style={formContainer}>
                    <form noValidate autoComplete="off">
                        <TextField label="Username" variant="outlined" style={formInput}/>
                        <TextField label="Password" variant="outlined" style={formInput} type="password"/>
                        <Button href="#text-buttons" color="primary" style={formInput}>Log in</Button>
                        <Button href="#text-buttons" color="primary" style={formInput}>Register</Button>
                    </form>
                </div>
            </main>
        </Layout>
    );
}
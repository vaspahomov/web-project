import * as React from 'react'
import Layout from "../components/Layout";
import {Button, TextField} from "@material-ui/core";
import {NavTab} from "../components/Header";


const styles = {
    root: {
        width: '100vw',
        minHeight: 'calc(100vh - 120px)'
    }, formContainer: {
        margin: '50px auto',
        maxWidth: '400px',
        width: '90%',
    }, formInput: {
        width: '100%',
        height: '60px'
    }
}

export default function Login() {
    const {root, formContainer, formInput} = styles;
    return (
        <Layout title="Photokek | Login" activeTab={NavTab.Login}>
            <main style={root}>
                <div style={formContainer}>
                    <form noValidate autoComplete="off">
                        <TextField label="Username" variant="filled" style={formInput}/>
                        <TextField label="Password" variant="filled" style={formInput} type="password"/>
                        <div style={formInput}>
                            <Button style={{width:'50%', height: '100%'}} href="#text-buttons" variant="outlined" color="primary">Log in</Button>
                            <Button style={{width:'50%', height: '100%'}} href="#text-buttons" variant="outlined" color="primary">Register</Button>
                        </div>
                    </form>
                </div>
            </main>
        </Layout>
    );
}
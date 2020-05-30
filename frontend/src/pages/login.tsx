import * as React from 'react'
import {Dispatch, useState} from 'react'
import Layout from "../components/Layout";
import {Button, TextField} from "@material-ui/core";
import {LoginService} from "../api/login";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "next/link";


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

const handleOperation = (setCtx: Dispatch<boolean>) => {
    setCtx(true);
    setTimeout(() => {
        setCtx(false)
    }, 3000);
}

export default function Login() {
    const {root, formContainer, formInput} = styles;
    const [inProgress, setInProgress] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const loginService = new LoginService();
    return (
        <Layout title="Photokek | Login" disableUserCard>
            <main style={root}>
                <div style={formContainer}>
                    <form noValidate autoComplete="off">
                        <TextField label="Username"
                                   variant="filled"
                                   style={formInput}
                                   onChange={(e) => changeUsername(e.target.value)}
                        />
                        <TextField label="Password"
                                   variant="filled"
                                   style={formInput}
                                   type="password"
                                   onChange={(e) => changePassword(e.target.value)}/>
                        <div style={formInput}>
                            <Link href={'myCollection'}>
                                <Button style={{width: '50%', height: '100%'}}
                                        href="#text-buttons"
                                        variant="outlined"
                                        color="primary"
                                        onClick={async () => {
                                            handleOperation(setInProgress);
                                            try {
                                                await loginService.login(username, password)
                                            } catch {
                                                return handleOperation(setError)
                                            }
                                            handleOperation(setSuccess)
                                        }}>Log in</Button>
                            </Link>
                            <Button style={{width: '50%', height: '100%'}}
                                    href="#text-buttons"
                                    variant="outlined"
                                    color="primary"
                                    onClick={async () => {
                                        handleOperation(setInProgress);
                                        try {
                                            await loginService.register(username, password)
                                        } catch {
                                            return handleOperation(setError)
                                        }
                                        handleOperation(setSuccess)
                                    }}>Register</Button>
                        </div>
                    </form>
                    {success ?
                        <MuiAlert variant="filled" severity="success">Operation successfully finished</MuiAlert> :
                        error ? <MuiAlert variant="filled" severity="error">Operation has failed</MuiAlert> :
                            inProgress ? <MuiAlert variant="filled" severity="info">Operation in progress</MuiAlert>
                                : undefined}
                </div>
            </main>
        </Layout>
    );
}
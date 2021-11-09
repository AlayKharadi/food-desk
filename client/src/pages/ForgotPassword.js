import { useState } from "react";
import { Avatar, Grid, CssBaseline, Button, Box, FormControl, FilledInput, InputLabel, FormHelperText, InputAdornment, Typography, IconButton, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom";

const theme = createTheme();

const ForgotPassword = () => {

    const [user, setUsername] = useState("");
    const [userWarning, setUserWarning] = useState("");

    const [newpwd, setNewPwd] = useState("");
    const [newPwdWarning, setNewPwdWarning] = useState("");

    const [confirmpwd, setConfirmPwd] = useState("");
    const [confirmPwdWarning, setConfirmPwdWarning] = useState("");

    const [showNewPassword, setshowNewPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    function handleChange(e) {
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;
        setUserWarning("");
        setNewPwdWarning("");
        setConfirmPwdWarning("");

        if (e.target.name === "username") {
            setUserWarning("");
            if (value === "") {
                setUsername("");
                setUserWarning("username is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setUserWarning("username must be alphanumerical.");
                return false;
            }
            setUsername(e.target.value);
        }

        if (e.target.name === "new-password") {
            setNewPwdWarning("");
            if (value === "") {
                setNewPwd("");
                setNewPwdWarning("new password is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setNewPwdWarning("new password must be alphanumerical.");
                return false;
            }
            setNewPwd(e.target.value);
        }

        if (e.target.name === "confirm-password") {
            setConfirmPwdWarning("");
            if (value === "") {
                setConfirmPwd("");
                setConfirmPwdWarning("confirm password is required.");
                return false;
            }
            if (!pattern.test(value)) {
                setConfirmPwdWarning("confirm password must be alphanumerical.");
                return false;
            }
            setConfirmPwd(e.target.value);
        }

        return true;
    }

    function changePwd(e) {
        e.preventDefault();
        if (user === "" || newpwd === "" || confirmpwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (newpwd === "") {
                setNewPwdWarning("new password is required.");
            }
            if (confirmpwd === "") {
                setConfirmPwdWarning("confirm password is required.");
            }
            return;
        }

        if ((user.length < 8 || user.length > 30) && (newpwd.length < 10 || newpwd.length > 30) && (confirmpwd.length < 10 || confirmpwd.length > 30)) {
            setUserWarning("Username must have at least 8 to 30 letters.");
            setNewPwdWarning("Password must have at least 10 to 30 letters.");
            setConfirmPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must have at least 8 to 30 letters.");
            return false;
        }

        if (newpwd.length < 10 || newpwd.length > 30) {
            setNewPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (confirmpwd.length < 10 || confirmpwd.length > 30) {
            setConfirmPwdWarning("Password must have at least 10 to 30 letters.");
            return false;
        }

        if (newpwd !== confirmpwd) {
            setNewPwd("");
            setConfirmPwd("");
            setNewPwdWarning("new and confirm password must be same.");
            setConfirmPwdWarning("new and confirm password must be same.");
            return;
        }
        //code for changing password
        fetch('http://localhost:4000/API/changepwd', {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, newpwd })
        })
            .then(response => {
                return response.status;
            })
            .then(status => {
                if (status === 500) {
                    setNewPwd("");
                    setConfirmPwd("");
                    setUsername("");
                    setUserWarning("Username is Invalid.");
                } else if (status === 200) {
                    setUsername("");
                    setNewPwd("");
                    setConfirmPwd("");
                }
            });
    }

    return (
        < ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <VpnKeyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box component="div" sx={{ mt: 1 }}>
                        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="username" error={userWarning !== ""}>Username</InputLabel>
                                    <FilledInput
                                        autoFocus
                                        type="text"
                                        id="username"
                                        label="username"
                                        name="username"
                                        onChange={handleChange}
                                        value={user}
                                        error={userWarning !== ""}
                                        aria-describedby="my-helper-text-user"
                                    />
                                    <FormHelperText id="my-helper-text-user" error={userWarning !== ""}>{userWarning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="new-password" error={newPwdWarning !== ""}>New password</InputLabel>
                                    <FilledInput
                                        id="new-password"
                                        name="new-password"
                                        label="New password"
                                        value={newpwd}
                                        onChange={handleChange}
                                        error={newPwdWarning !== ""}
                                        type={showNewPassword ? 'text' : 'password'}
                                        aria-describedby="my-helper-text-new-pwd"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setshowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="my-helper-text-pwd" error={newPwdWarning !== ""}>{newPwdWarning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="confirm-password" error={confirmPwdWarning !== ""}>Confirm Password</InputLabel>
                                    <FilledInput
                                        id="confirm-password"
                                        name="confirm-password"
                                        label="Confirm Password"
                                        value={confirmpwd}
                                        onChange={handleChange}
                                        error={confirmPwdWarning !== ""}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        aria-describedby="my-helper-text-confirm-pwd"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="my-helper-text-pwd" error={confirmPwdWarning !== ""}>{confirmPwdWarning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={changePwd}
                                    style={{ backgroundColor: "#E35A5C", color: "#FFFFFF" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justify="center" alignItems="center" xs={12} spacing={2} >
                            <Grid item xs>
                                <Link to="/LogIn">
                                    Already have an account?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/SignUp" >
                                    Don't have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}

export default ForgotPassword;
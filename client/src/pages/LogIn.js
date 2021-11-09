import { useState } from "react";
import { Avatar, Grid, CssBaseline, Button, Box, FormControl, FilledInput, InputLabel, FormHelperText, InputAdornment, Typography, IconButton, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { USER_LOGGEDIN } from '../storage/actiontype';
import { userStore } from '../storage/store';
import { Link } from "react-router-dom";

const theme = createTheme();

const LogIn = () => {
    //user value from the form
    const [user, setUsername] = useState("");
    //warning when the user tries to input worng user patterns
    const [userWarning, setUserWarning] = useState("");

    //pwd value from the form
    const [pwd, setPwd] = useState("");
    //warning when the user tries to input wrong password patterns
    const [pwdWarning, setPwdWarning] = useState("");

    const [showPassword, setshowPassword] = useState(false);

    //checks the user input on every change in form fields
    function handleChange(e) {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //get the value attribute of the target that created event e
        const value = e.target.value;
        const pattern = /^[0-9a-zA-Z]*$/;

        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setUsername("");
                setUserWarning("Username is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }
            //set the username
            setUsername(e.target.value);
        }
        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setPwd("");
                setPwdWarning("Password is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(value)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            //set the password
            setPwd(e.target.value);
        }
        return true;
    }

    function loginuser() {
        //clear every warnings
        setUserWarning("");
        setPwdWarning("");

        //check if the user and pwd is empty or not
        if (user === "" || pwd === "") {
            if (user === "") {
                setUserWarning("username is required.");
            }
            if (pwd === "") {
                setPwdWarning("password is required.");
            }
            return;
        }

        //size constraint for the user and pwd
        if ((user.length < 8 || user.length > 30) && (pwd.length < 10 || pwd.length > 30)) {
            setUserWarning("Username must be 8 to 30 letters long.");
            setPwdWarning("Password must be 10 to 30 letters long.");
            return false;
        }

        if (user.length < 8 || user.length > 30) {
            setUserWarning("Username must be 8 to 30 letters long.");
            return false;
        }

        if (pwd.length < 10 || pwd.length > 30) {
            setPwdWarning("Password must be least 10 to 30 letters long.");
            return false;
        }

        const pattern = /^[0-9a-zA-Z]*$/;

        //check whether values matches the pattern or not
        if (!pattern.test(user) || !pattern.test(pwd)) {
            if (!pattern.test(user) && !pattern.test(pwd)) {
                setUserWarning("Username must be alphanumerical.");
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
            if (!pattern.test(user)) {
                setUserWarning("Username must be alphanumerical.");
                return false;
            }

            if (!pattern.test(pwd)) {
                setPwdWarning("Password must be alphanumerical.");
                return false;
            }
        }

        //fetch data from the users database using fetch API
        fetch('http://localhost:4000/API/login', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, pwd })
        })
            .then(response => {
                //check the response
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                //on successful response update the Global Storage using dispatch
                setPwd("");
                setUsername("");
                if (data === undefined) {
                    //if the the credentials are wrong then clear the fields and throw warning
                    setUserWarning("Username is Invalid.");
                    setPwdWarning("Password is Invalid.");
                } else {
                    //dispatch the action to logIn user to global state of the app
                    userStore.dispatch({
                        type: USER_LOGGEDIN,
                        payload: {
                            username: data.username,
                            password: data.password
                        }
                    });
                    //set the cookie or set the local storage to keep user loggedIn during refresh
                    window.localStorage.setItem("user", JSON.stringify(userStore.getState().loggedInUser));
                    console.log('loggedin');
                }
            });
    }

    return (
        <ThemeProvider theme={theme}>
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log-In
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
                                    <InputLabel htmlFor="password" error={pwdWarning !== ""}>Password</InputLabel>
                                    <FilledInput
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={pwd}
                                        onChange={handleChange}
                                        error={pwdWarning !== ""}
                                        aria-describedby="my-helper-text-pwd"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setshowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="my-helper-text-pwd" error={pwdWarning !== ""}>{pwdWarning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={loginuser}
                                    style={{ backgroundColor: "#E35A5C", color: "#FFFFFF" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2} xs={12}>
                            <Grid item xs={12}>
                                <Link to="/ForgotPassword">
                                    Forgot Password
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/SignUp" >
                                    Don't have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LogIn;
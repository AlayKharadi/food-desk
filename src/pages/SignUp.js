import { useState } from "react";
import { Avatar, Button, CssBaseline,  InputAdornment, FormControl, InputLabel, FilledInput, FormHelperText, IconButton, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme = createTheme();

const SignUp = () => {

    //user value from the form
    const [user, setUsername] = useState("");
    //warning when the user tries to input wrong user patterns
    const [userWarning, setUserWarning] = useState("");

    //email value from the form
    const [email, setEmail] = useState("");
    //warning when the user tries to input wrong email patterns
    const [emailWarning, setEmailWarning] = useState("");

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
        const emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

        if (e.target.name === "email") {
            //check whether its empty or not and set the warning
            if (value === "") {
                setEmail("");
                setEmailWarning("Email is required.");
                return false;
            }
            //check whether it matches the pattern or not
            if (!emailpattern.test(value)) {
                setEmailWarning("Email is invalid.");
                return false;
            }
            //set the username
            setEmail(e.target.value);
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
                        Sign up
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
                                    <InputLabel htmlFor="email" error={emailWarning !== ""}>Email</InputLabel>
                                    <FilledInput
                                        autoFocus
                                        type="email"
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                        value={email}
                                        error={emailWarning !== ""}
                                        aria-describedby="my-helper-text-email"
                                    />
                                    <FormHelperText id="my-helper-text-email" error={emailWarning !== ""}>{emailWarning}</FormHelperText>
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
                                    style={{ backgroundColor: "#E35A5C", color: "#FFFFFF" }}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justify="center" alignItems="center" xs={12} spacing={2}>
                            <Grid item>
                                <Link to="/LogIn">
                                    Already have an account?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/ForgotPassword">
                                    Forgot Password
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} /> 
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
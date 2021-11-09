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
    const [cred, setCred] = useState({
        user: {
            value: "",
            warning: ""
        },
        pwd: {
            value: "",
            warning: ""
        }
    });

    const [showPassword, setshowPassword] = useState(false);

    //checks the user input on every change in form fields
    function handleChange(e) {
        e.preventDefault();
        //clear every warnings
        setCred({
            ...cred,
            user: {
                ...cred.user,
                warning: ""
            },
            pwd: {
                ...cred.pwd,
                warning: ""
            }
        });

        const pattern = /^[0-9a-zA-Z]*$/;

        //check for the username
        if (e.target.name === "username") {
            //check whether its empty or not and set the warning
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        value: "",
                        warning: "Username is required."
                    }
                });
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(e.target.value)) {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: "Username must be alphanumerical."
                    }
                });
                return false;
            }
            //set the username
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    value: e.target.value,
                    warning: ""
                }
            });
        }
        if (e.target.name === "password") {
            //check whether its empty or not and set the warning
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        value: "",
                        warning: "Password is required."
                    }
                });
                return false;
            }
            //check whether it matches the pattern or not
            if (!pattern.test(e.target.value)) {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        warning: "Password must be alphanumerical."
                    }
                });
                return false;
            }
            //set the password
            setCred({
                ...cred,
                pwd: {
                    ...cred.user,
                    value: e.target.value,
                    warning: ""
                }
            });
        }
        return true;
    }

    function loginuser() {
        //clear every warnings
        setCred({
            ...cred,
            user: {
                ...cred.user,
                warning: ""
            },
            pwd: {
                ...cred.pwd,
                warning: ""
            }
        });

        //check if the user and pwd is empty or not
        if (cred.user.value === "" || cred.pwd.value === "") {
            if (cred.user.value === "") {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: "username is required."
                    },
                    pwd: {
                        ...cred.pwd,
                        warning: ""
                    }
                });
            }
            if (cred.pwd.value === "") {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: ""
                    },
                    pwd: {
                        ...cred.pwd,
                        warning: "password is required."
                    }
                });
            }
            return;
        }

        //size constraint for the user and pwd
        if ((cred.user.value.length < 8 || cred.user.value.length > 30) && (cred.pwd.value.length < 10 || cred.pwd.value.length > 30)) {
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    warning: "Username must be 8 to 30 letters long."
                },
                pwd: {
                    ...cred.pwd,
                    warning: "Password must be 10 to 30 letters long."
                }
            });
            return false;
        }

        if (cred.user.value.length < 8 || cred.user.value.length > 30) {
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    warning: "Username must be 8 to 30 letters long."
                },
                pwd: {
                    ...cred.pwd,
                    warning: ""
                }
            });
            return false;
        }

        if (cred.pwd.value.length < 10 || cred.pwd.value.length > 30) {
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    warning: ""
                },
                pwd: {
                    ...cred.pwd,
                    warning: "Password must be least 10 to 30 letters long."
                }
            });
            return false;
        }

        const pattern = /^[0-9a-zA-Z]*$/;

        //check whether values matches the pattern or not
        if (!pattern.test(cred.user.value) || !pattern.test(cred.pwd.value)) {
            if (!pattern.test(cred.user.value) && !pattern.test(cred.pwd.value)) {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: "Username must be alphanumerical."
                    },
                    pwd: {
                        ...cred.pwd,
                        warning: "Password must be alphanumerical."
                    }
                });
                return false;
            }
            if (!pattern.test(cred.user.value)) {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: "Username must be alphanumerical."
                    },
                    pwd: {
                        ...cred.pwd,
                        warning: ""
                    }
                });
                return false;
            }

            if (!pattern.test(cred.pwd.value)) {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        warning: ""
                    },
                    pwd: {
                        ...cred.pwd,
                        warning: "Password must be alphanumerical."
                    }
                });
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
            body: JSON.stringify({
                user: cred.user.value,
                pwd: cred.pwd.value
            })
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
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        value: ""
                    },
                    pwd: {
                        ...cred.pwd,
                        value: ""
                    }
                });
                if (data === undefined) {
                    //if the the credentials are wrong then clear the fields and throw warning
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            warning: "Username is Invalid."
                        },
                        pwd: {
                            ...cred.pwd,
                            warning: "Password is Invalid."
                        }
                    });
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
                                    <InputLabel htmlFor="username" error={cred.user.warning !== ""}>Username</InputLabel>
                                    <FilledInput
                                        autoFocus
                                        type="text"
                                        id="username"
                                        label="username"
                                        name="username"
                                        onChange={handleChange}
                                        value={cred.user.value}
                                        error={cred.user.warning !== ""}
                                        aria-describedby="my-helper-text-user"
                                    />
                                    <FormHelperText id="my-helper-text-user" error={cred.user.warning !== ""}>{cred.user.warning}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="password" error={cred.pwd.warning !== ""}>Password</InputLabel>
                                    <FilledInput
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={cred.pwd.value}
                                        onChange={handleChange}
                                        error={cred.pwd.warning !== ""}
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
                                    <FormHelperText id="my-helper-text-pwd" error={cred.pwd.warning !== ""}>{cred.pwd.warning}</FormHelperText>
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
                        
                        <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
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
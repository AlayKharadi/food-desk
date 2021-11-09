import { useState } from "react";
import { Avatar, Grid, CssBaseline, Button, Box, FormControl, FilledInput, InputLabel, FormHelperText, InputAdornment, Typography, IconButton, Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const theme = createTheme();

const ForgotPassword = () => {

    const [cred, setCred] = useState({
        user: {
            value: "",
            warning: ""
        },
        pwd: {
            new: {
                value: "",
                warning: ""
            },
            confirm: {
                value: "",
                warning: ""
            }
        }
    });
    
    const [showPWD, setshowPWD] = useState({
        new: false,
        confirm: false
    });

    const [otp, setOTP] = useState({
        otp1: "",
        otp2: ""
    });

    const [open, setOpen] = useState(false);

    function handleChange(e) {
        e.preventDefault();
        const pattern = /^[0-9a-zA-Z]*$/;
        setCred({
            ...cred,
            user: {
                ...cred.user,
                warning: ""
            },
            pwd: {
                ...cred.pwd,
                new: {
                    ...cred.pwd.new,
                    warning: ""
                },
                confirm: {
                    ...cred.pwd.confirm,
                    warning: ""
                }
            }
        });

        if (e.target.name === "username") {
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
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    value: e.target.value,
                    warning: ""
                }
            });
        }

        if (e.target.name === "new-password") {
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        new: {
                            ...cred.pwd.new,
                            value: "",
                            warning: "new password is required."
                        }
                    }
                });
                return false;
            }
            if (!pattern.test(e.target.value)) {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        new: {
                            ...cred.pwd.new,
                            warning: "new password must be alphanumerical."
                        }
                    }
                });
                return false;
            }
            setCred({
                ...cred,
                pwd: {
                    ...cred.pwd,
                    new: {
                        ...cred.pwd.new,
                        value: e.target.value,
                        warning: ""
                    }
                }
            });
        }

        if (e.target.name === "confirm-password") {
            if (e.target.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        confirm: {
                            ...cred.pwd.confirm,
                            value: "",
                            warning: "confirm password is required."
                        }
                    }
                });
                return false;
            }
            if (!pattern.test(e.target.value)) {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        confirm: {
                            ...cred.pwd.confirm,
                            value: "",
                            warning: "confirm password must be alphanumerical."
                        }
                    }
                });
                return false;
            }
            setCred({
                ...cred,
                pwd: {
                    ...cred.pwd,
                    confirm: {
                        ...cred.pwd.confirm,
                        value: e.target.value,
                        warning: ""
                    }
                }
            });
        }
        return true;
    }

    function changePwd(e) {
        e.preventDefault();
        setCred({
            ...cred,
            user: {
                ...cred.user,
                warning: ""
            },
            pwd: {
                ...cred.pwd,
                new: {
                    ...cred.pwd.new,
                    warning: ""
                },
                confirm: {
                    ...cred.pwd.confirm,
                    warning: ""
                }
            }
        });
        if (cred.user.value === "" || cred.pwd.new.value === "" || cred.pwd.confirm.value === "") {
            if (cred.user.value === "") {
                setCred({
                    ...cred,
                    user: {
                        ...cred.user,
                        value: "",
                        warning: "Username is required."
                    }
                });
            }
            if (cred.pwd.new.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        new: {
                            ...cred.pwd.new,
                            value: "",
                            warning: "new password is required."
                        }
                    }
                });
            }
            if (cred.pwd.confirm.value === "") {
                setCred({
                    ...cred,
                    pwd: {
                        ...cred.pwd,
                        confirm: {
                            ...cred.pwd.confirm,
                            value: "",
                            warning: "confirm password is required."
                        }
                    }
                });
            }
            return;
        }

        if ((cred.user.value.length < 8 || cred.user.value.length > 30) && (cred.pwd.new.value.length < 10 || cred.pwd.new.value.length > 30) && (cred.pwd.confirm.value.length < 10 || cred.pwd.confirm.value.length > 30)) {
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    warning: "Username must have at least 8 to 30 letters."
                },
                pwd: {
                    ...cred.pwd,
                    new: {
                        ...cred.pwd.new,
                        warning: "Password must have at least 10 to 30 letters."
                    },
                    confirm: {
                        ...cred.pwd.confirm,
                        warning: "Password must have at least 10 to 30 letters."
                    }
                }
            });
            return false;
        }

        if (cred.user.value.length < 8 || cred.user.value.length > 30) {
            setCred({
                ...cred,
                user: {
                    ...cred.user,
                    value: "",
                    warning: "Username must have at least 8 to 30 letters."
                }
            });
            return false;
        }

        if (cred.pwd.new.value.length < 10 || cred.pwd.new.value.length > 30) {
            setCred({
                ...cred,
                pwd: {
                    ...cred.pwd,
                    new: {
                        ...cred.pwd.new,
                        value: "",
                        warning: "Password must have at least 10 to 30 letters."
                    }
                }
            });
            return false;
        }

        if (cred.pwd.confirm.value.length < 10 || cred.pwd.confirm.value.length > 30) {
            setCred({
                ...cred,
                pwd: {
                    ...cred.pwd,
                    confirm: {
                        ...cred.pwd.confirm,
                        value: "",
                        warning: "Password must have at least 10 to 30 letters."
                    }
                }
            });
            return false;
        }

        if (cred.pwd.new.value !== cred.pwd.confirm.value) {
            setCred({
                ...cred,
                pwd: {
                    ...cred.pwd,
                    new: {
                        ...cred.pwd.new,
                        value: "",
                        warning: "new and confirm password must be same."
                    },
                    confirm: {
                        ...cred.pwd.confirm,
                        value: "",
                        warning: "new and confirm password must be same."
                    }
                }
            });
            return;
        }
        //code for changing password
        fetch('http://localhost:4000/API/sendotp', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: cred.user.value
            })
        })
            .then(response => {
                if (response.status === 500) {
                    return undefined;
                }
                return response.json();
            })
            .then(data => {
                if (data === undefined) {
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            value: "",
                            warning: "Username is Invalid."
                        },
                        pwd: {
                            ...cred.pwd,
                            new: {
                                ...cred.pwd.new,
                                value: ""
                            },
                            confirm: {
                                ...cred.pwd.confirm,
                                value: ""
                            }
                        }
                    });
                    setOpen(false);
                } else {
                    setCred({
                        ...cred,
                        user: {
                            ...cred.user,
                            value: ""
                        },
                        pwd: {
                            ...cred.pwd,
                            new: {
                                ...cred.pwd.new,
                                value: ""
                            },
                            confirm: {
                                ...cred.pwd.confirm,
                                value: ""
                            }
                        }
                    });
                    setOTP({
                        ...otp,
                        otp2: data.otp
                    });
                    setOpen(true);
                }
            });
    }

    function verifyOTP() {
        const pattern = /^[0-9a-zA-Z]{10}$/;
        if ((otp.otp1 !== "") && (pattern.test(otp.otp1) === true)) {
            if (otp.otp1 === otp.otp2) {
                //code for changing password
                fetch('http://localhost:4000/API/changepwd', {
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user: cred.user.value,
                        newpwd: cred.pwd.new.value
                    })
                })
                    .then(response => {
                        return response.status;
                    })
                    .then(status => {
                        if (status === 500) {
                            setCred({
                                ...cred,
                                user: {
                                    ...cred.user,
                                    value: "",
                                    warning: "Username is Invalid."
                                },
                                pwd: {
                                    ...cred.pwd,
                                    new: {
                                        ...cred.pwd.new,
                                        value: ""
                                    },
                                    confirm: {
                                        ...cred.pwd.confirm,
                                        value: ""
                                    }
                                }
                            });
                            setOpen(false);
                        } else if (status === 200) {
                            setCred({
                                ...cred,
                                user: {
                                    ...cred.user,
                                    value: ""
                                },
                                pwd: {
                                    ...cred.pwd,
                                    new: {
                                        ...cred.pwd.new,
                                        value: ""
                                    },
                                    confirm: {
                                        ...cred.pwd.confirm,
                                        value: ""
                                    }
                                }
                            });
                            setOpen(false);
                        }
                    });
            }
        }
    }

    return (
        <>
            <Modal
                show={open}
                backdrop="static"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Enter your OTP
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        variant="filled"
                        fullWidth
                    >
                        <InputLabel htmlFor="OTP" error={false}>OTP</InputLabel>
                        <FilledInput
                            autoFocus
                            type="text"
                            id="OTP"
                            label="OTP"
                            name="OTP"
                            onChange={(e) => {
                                setOTP({
                                    ...otp,
                                    otp1: e.target.value
                                })
                            }}
                            value={otp.otp1}
                            error={false}
                            aria-describedby="my-helper-text-user"
                        />
                        <FormHelperText id="my-helper-text-user" error={false}>check your email for OTP</FormHelperText>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={verifyOTP}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                        <InputLabel htmlFor="new-password" error={cred.pwd.new.warning !== ""}>New password</InputLabel>
                                        <FilledInput
                                            id="new-password"
                                            name="new-password"
                                            label="New password"
                                            value={cred.pwd.new.value}
                                            onChange={handleChange}
                                            error={cred.pwd.new.warning !== ""}
                                            type={showPWD.new ? 'text' : 'password'}
                                            aria-describedby="my-helper-text-new-pwd"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            setshowPWD({
                                                                ...showPWD,
                                                                new: !showPWD.new
                                                            })
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showPWD.new ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText id="my-helper-text-pwd" error={cred.pwd.new.warning !== ""}>{cred.pwd.new.warning}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        variant="filled"
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="confirm-password" error={cred.pwd.confirm.warning !== ""}>Confirm Password</InputLabel>
                                        <FilledInput
                                            id="confirm-password"
                                            name="confirm-password"
                                            label="Confirm Password"
                                            value={cred.pwd.confirm.value}
                                            onChange={handleChange}
                                            error={cred.pwd.confirm.warning !== ""}
                                            type={showPWD.confirm ? 'text' : 'password'}
                                            aria-describedby="my-helper-text-confirm-pwd"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            setshowPWD({
                                                                ...showPWD,
                                                                confirm: !showPWD.confirm
                                                            });
                                                        }}
                                                        edge="end"
                                                    >
                                                        {showPWD.confirm ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText id="my-helper-text-pwd" error={cred.pwd.confirm.warning !== ""}>{cred.pwd.confirm.warning}</FormHelperText>
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
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2} >
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
        </>
    );
}

export default ForgotPassword;
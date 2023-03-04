import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RegisterMutation } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { selectRegisterError } from "./userSlice";
import { register } from "./userThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
    displayname: "",
    phone: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ width: 1 }}
                label="Username"
                name="username"
                autoComplete="new-username"
                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("username"))}
                helperText={getFieldError("username")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: 1 }}
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: 1 }}
                name="displayname"
                label="Display name"
                type="text"
                autoComplete="new-displayname"
                value={state.displayname}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("displayname"))}
                helperText={getFieldError("displayname")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ width: 1 }}
                name="phone"
                label="Phone"
                type="text"
                autoComplete="new-phone"
                value={state.phone}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("phone"))}
                helperText={getFieldError("phone")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

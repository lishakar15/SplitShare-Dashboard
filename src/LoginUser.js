import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { backendService } from "./services/backendServices";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //validate Mandatory Fields 
    const loginUser = async () => {
      const credentials = {
        userName: email,
        password: password
      }
      try {
        const userData = await backendService.loginUser(credentials)
        if (userData !== null) {
          localStorage.setItem("userData", JSON.stringify({ userId: userData.userId, userName: userData.userName }));
          localStorage.setItem("jwtToken", userData.jwtToken);
          navigate("/home");
          window.location.reload();
        }
        else{
          throw Error("Login Failed");
        }
      }
      catch (err) {
        console.log("Invalid Login user name and password " + err);
        setError("Invalid username or password");
      }
    }
    loginUser();
  };

  return (
    <Container maxWidth="xs" sx={{
      backgroundColor: "gray.200",
      borderRadius: "1",
      boxShadow: 2,
      mt: 3,
      pb: 3,
    }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in to your account
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            name="email"
            label="Email"
            autoComplete="email"
            autoFocus
            placeholder="example@gmail.com"
            InputLabelProps={{
              required: false,
            }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="password"
            InputLabelProps={{
              required: false,
            }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot your password?
              </Link>
            </Grid>
          </Grid>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#6200ea", color: "#fff" }}
          >
            Login
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography>
                Don't have an account?{" "}
                <Link href="/register" variant="body2">
                  Sign up for an account
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginUser;
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
  Alert,
} from "@mui/material";
import { backendService } from "./services/backendServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomizedSnackbars from "./utilities/CustomSnackBar";
import appLogo from './assets/SplitShare Logo image.png'

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [invitedBy, setInvitedBy] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [inviteToken, setInviteToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [urlParam, setUrlParam] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(() => {
    //Check if there are any invite parameters in the URL
    const urlParams = new URLSearchParams(location.search);
    if (urlParams) {
      setUrlParam(urlParams);
      setInvitedBy(urlParams.get('invitedBy'));
      setGroupId(urlParams.get('groupId'));
      setInviteToken(urlParams.get('token'));
    }
  }, [location.search]);

  const handleLogin = (e) => {
    e.preventDefault();

    const loginUser = async () => {
      const credentials = {
        userName: email,
        password: password
      }
      try {
        const userData = await backendService.loginUser(credentials)
        if (userData !== null) {
          localStorage.setItem("userData", JSON.stringify({ userId: userData.userId, userName: userData.userName, fullUserName: userData.fullUserName }));
          localStorage.setItem("jwtToken", userData.jwtToken);
          acceptUserGroupInvite(userData.userId);
          setTimeout(() => {
            navigate("/home");
            window.location.reload()
          }, 500);
        }
        else {
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

  const acceptUserGroupInvite = async (loggedInUserId) => {
    if (loggedInUserId && inviteToken) {
      let message = null;
      if (groupId) {
        const groupInvite = {
          groupId: groupId,
          userId: loggedInUserId
        }
        message = await backendService.joinUserInGroup(groupInvite, inviteToken);
      }
      else if (invitedBy) {
        const userInvite = {
          userId1: loggedInUserId,
          userId2: invitedBy,
          createdBy: invitedBy
        }
        message = await backendService.acceptInvite(userInvite, inviteToken);
      }
      if (message) {
        setSnackbarMessage(message);
        if ((message.includes("fail") || (message.includes("Invalid")))) {
          setSnackbarSuccess(false);
        }
        else {
          setSnackbarSuccess(true);
        }
        setSnackbarOpen(true);
      }
    }
  }

  return (
    <Container maxWidth="xs" sx={{
      backgroundColor: "gray.200",
      borderRadius: "1",
      boxShadow: 2,
      mt: !isMobile ? 8 : 2,
      py: 3,
    }}>
      <Box sx={{display:"flex", justifyContent:"center"}} >
        <Box
          component="img"
          src={appLogo}
          alt="Description of image"
          sx={{
            width: '75%',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: 2,
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
                <Link href={`/register?${urlParam.toString()}`} variant="body2">
                  Sign up for an account
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={snackbarMessage}
        isSuccess={snackbarSuccess}
        verticalPos={"top"}
        horizontalPos={"right"}
      />
    </Container>
  );
};

export default LoginUser;
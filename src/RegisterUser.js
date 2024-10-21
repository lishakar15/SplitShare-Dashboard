import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { backendService } from "./services/backendServices";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./utilities/CustomSnackBar";
import { FaHeartPulse } from "react-icons/fa6";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const today = new Date().toISOString().split('T')[0];
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [urlParam,setUrlParam] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(()=>{
    //Check if there are any invite parameters in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams)
    {
      setUrlParam(urlParams);
    }
  },[]);

  const handleRegister = (e) => {
    e.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      emailId: email,
      phoneNumber: phoneNumber,
      password: password,
      createDate: today,
      lastUpdateDate: today
    }


    const registerUser = async () => {
      try {
        const result = validateUserData(user);
        setIsLoading(true);
        if (result.isValid) {
          const isRegistered = await backendService.registerUser(user);
          if (isRegistered) {
            setSnackbarMessage("Registration Successfull");
            setSnackbarSuccess(true);
            setSnackbarOpen(true);
            setTimeout(() => {
              navigate(`/login?${urlParam}`)
            }, 1000)
              ;
          }
        }
        else{
          setError(result.message);
        }
      }
      catch (err) {
        setSnackbarMessage("Registration Failed");
        setSnackbarSuccess(false);
        setSnackbarOpen(true);
        console.log("Error occurred while registering user");
      }
      finally{
        setIsLoading(false);
      }
      
    }
    registerUser();

  }

  const validateUserData = (user) => {
    const { firstName, lastName, emailId, phoneNumber, password} = user;

    const phoneRegex = /^[0-9]{10}$/;

    if (!firstName || !lastName || !emailId || !password) {
      return { isValid: false, message: "All fields are required." };
    }

    if (phoneNumber !== "" && !phoneRegex.test(phoneNumber)) {
      return { isValid: false, message: "Phone number must be 10 digits." };
    }

    if (password.length < 6) {
      return { isValid: false, message: "Password must be at least 6 characters long." };
    }

    if(password !== confirmPassword){
      return {isValid : false, message: "Re-entered password doesn't match with Password"};
    }

    return { isValid: true, message: "User data is valid." };
  }



  return (
    <Container maxWidth="sm" sx={{
      backgroundColor: "gray.200",
      pb: 2,
      borderRadius: "1",
      boxShadow: 2,
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
          Create your account
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                placeholder="John"
                autoComplete="given-name"
                InputLabelProps={{
                  required: false,
                }}
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Cena"
                autoComplete="family-name"
                InputLabelProps={{
                  required: false,
                }}
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="email"
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
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            InputLabelProps={{
              required: false,
            }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Re-enter password"
            autoComplete="new-password"
            InputLabelProps={{
              required: false,
            }}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#6200ea",
              color: "#fff",
            }}
          >
            {isLoading ? "Registering" : "Register"}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography>
                Already have an account?{" "}
                <Link href={`/login?${urlParam}`} variant="body2">
                  Login to your account
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
      />
    </Container>
  );
};

export default RegisterUser;

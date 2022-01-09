import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import firebase from 'firebase/app'
import 'firebase/firestore'
import AuthContext from '../components/config/context'
import Alert from "./Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registeration() {
  const authContext = useContext(AuthContext)


  async function Register(value){
    const email =value.email;
    const password=value.password;
    await firebase.auth().createUserWithEmailAndPassword(value.email, value.password).catch(error => Alert.alert(error.message,"",[
        {text: 'Okay'},
    ]))
    let user = firebase.auth().currentUser
    user.sendEmailVerification().then(function() {
      alert("Verfication email has been sent.")
    }).catch(function(error) {
      alert(error.message)
    });
    console.log(value,'email sent ')
   
  
    const userRef =firebase.firestore().collection("admins")
    const snapshot = await userRef.where('email', '==', value.email ).get()
    if (snapshot.empty) {
      firebase.firestore().collection('admins').add(value).then(()=>{
          console.log("added")
        window.location.href='/'
      })

    
    }
    else {
      console.log("Already Registered")
      
    }  
   
  }
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {Register(values)}}
    >
      {({ submitForm, isSubmitting }) => (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Form className={classes.form} noValidate>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </Container>
      )}
    </Formik>
  );
}

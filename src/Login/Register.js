import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";
import styles from "../constants/styles";

function Register(props) {
  const { classes } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [quote, setQuote] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.getCurrentUsername()) {
      // logged in
      alert("You are already logged in!");
      props.history.replace("/dashboard");
    }

    //firebase.getCurrentUserQuote().then(setQuote);
  }, [props.history]);

  async function onRegister() {
    try {
      setLoading(true);
      await firebase.register(name, email, password);
      setLoading(false);
      //await firebase.addQuote(quote);
      props.history.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        {Loading ? (
          <CircularProgress size={20} />
        ) : (
          <form
            className={classes.form}
            onSubmit={(e) => e.preventDefault() && false}
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoComplete="off"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onRegister}
              className={classes.submit}
            >
              Register
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              className={classes.submit}
            >
              Go back to Login
            </Button>
          </form>
        )}
      </Paper>
    </main>
  );
}

export default withRouter(withStyles(styles)(Register));

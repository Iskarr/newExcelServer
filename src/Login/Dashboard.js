import React, { useEffect } from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";

const Dashboard = (props) => {
  //const [quote, setQuote] = useState("");
  const { classes } = props;

  useEffect(() => {
    if (!firebase.getCurrentUsername()) {
      // not logged in
      alert("Please login first");
      props.history.replace("/login");
    }

    //firebase.getCurrentUserQuote().then(setQuote);
  }, [props.history]);

  async function logout() {
    await firebase.logout();
    props.history.push("/");
  }

  return (
    <div>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello {firebase.getCurrentUsername()}
          </Typography>
          {/* <Typography component="h1" variant="h5">
            Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
          </Typography> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.push("/editpage");
            }}
            className={classes.submit}
          >
            Edit Page
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={logout}
            className={classes.submit}
          >
            Logout
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              props.history.push("/");
            }}
            className={classes.submit}
          >
            Home
          </Button>
        </Paper>
      </main>
    </div>
  );
};

export default withRouter(withStyles(styles)(Dashboard));

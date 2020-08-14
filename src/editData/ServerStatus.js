import React, { useEffect, useState } from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";
// import Sort from "../constants/Sort";
import { Table } from "reactstrap";

const ServerStatus = (props) => {
  const [phones, setPhones] = useState([]);
  const { classes } = props;

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.db;
      const data = await db.collection("Phones").get();
      setPhones(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  function checkStatus(status) {
    if (status === "updated") {
      return "green";
    } else if (status === "inactive") {
      return "gray";
    } else if (status === "needs update") {
      return "#FC6A03";
    }
  }

  return (
    <div>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VerifiedUserOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hello from Server Status
          </Typography>
          <>
            <Table bordered>
              <thead>
                <tr>
                  <th>Phone Name</th>
                  <th>Server Status</th>
                  <th>Server Notes</th>
                </tr>
              </thead>
              {phones.map((phone) => (
                <tbody>
                  <tr key={phone.phone_id}>
                    <td style={{ paddingRight: "30px" }}>{phone.phone}</td>
                    <td
                      style={{
                        paddingRight: "30px",
                        backgroundColor: checkStatus(phone.status),
                      }}
                    >
                      {phone.status}
                    </td>
                    <td style={{ paddingLeft: "10px" }}>{phone.notes}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </>

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

export default withRouter(withStyles(styles)(ServerStatus));

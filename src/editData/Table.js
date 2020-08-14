import React, { useEffect, useState } from "react";
import { Typography, Paper, Avatar, Button } from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import styles from "../constants/styles";
import { Table } from "reactstrap";

const TableView = (props) => {
  //const [quote, setQuote] = useState("");
  const [phones, setPhones] = useState([]);
  const [phone, setPhone] = useState("");
  const [os, setOS] = useState("");
  const [ppi, setPPI] = useState("");
  const [size_inch, setSizeInch] = useState("");
  const [size_cm, setSizeCM] = useState("");
  const [editing, setEditing] = useState(false);
  const { classes } = props;

  useEffect(() => {
    if (!firebase.getCurrentUsername()) {
      // not logged in
      alert("Please login first");
      props.history.replace("/login");
    }

    const fetchData = async () => {
      const db = firebase.db;
      const data = await db.collection("Phones").get();
      setPhones(data.docs.map((doc) => doc.data()));
    };
    fetchData();

    //firebase.getCurrentUserQuote().then(setQuote);
  }, [props.history]);

  //   function onSubmit(e) {
  //     e.preventDefault();

  //     firebase.db
  //       .collection("Phones")
  //       .add({ phone, os, ppi, size_cm, size_inch })
  //       .then(() => {
  //         setPhone("");
  //         setOS("");
  //         setPPI("");
  //         setSizeCM("");
  //         setSizeInch("");
  //       });
  //     props.history.push("/editpage");
  //   }

  function editingMode() {
    if (!editing) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }

  return (
    <div>
      <input type="text" value={phone} onChange={() => {}} />

      <Button onClick={editingMode} variant="contained" color="secondary">
        Edit Mode
      </Button>
    </div>
  );
};

export default withRouter(withStyles(styles)(TableView));

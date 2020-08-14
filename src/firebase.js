import * as firebase from "firebase";
import "firebase/firestore";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyByu5nensJnP8yL7abT031AzJEktHr3N1g",
  authDomain: "fir-hooks-app.firebaseapp.com",
  databaseURL: "https://fir-hooks-app.firebaseio.com",
  projectId: "fir-hooks-app",
  storageBucket: "fir-hooks-app.appspot.com",
  messagingSenderId: "619688857990",
  appId: "1:619688857990:web:78688486f3ea5fa6c01c07",
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getData() {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }
    let store = firebase.firestore();
    const db = store.collection("Phones").get();

    return { db, store };
  }
}

export default new Firebase(config);

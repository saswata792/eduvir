import firebase from "firebase"
const config= {
  apiKey: "AIzaSyARTXmjEhFbh_jMYv1s-ovDj0_fZWmzHRI",
  authDomain: "virtual-education-bb134.firebaseapp.com",
  databaseURL: "https://virtual-education-bb134-default-rtdb.firebaseio.com",
  projectId: "virtual-education-bb134",
  storageBucket: "virtual-education-bb134.appspot.com",
  messagingSenderId: "806947223843",
  appId: "1:806947223843:web:d3957c25d811961a68f496"
};

  firebase.initializeApp(config);
  export default firebase;
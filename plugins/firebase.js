// import firebase from "firebase/app";
// import 'firebase/firestore'
// import 'firebase/auth'

// const config = {
//     apiKey: "AIzaSyBWI3rqm3ZqMQHBxFJxG_ma7Vm8h3CFeP4",
//     authDomain: "anvui-firestore.firebaseapp.com",
//     databaseURL: "https://anvui-firestore.firebaseio.com",
//     projectId: "anvui-firestore",
//     storageBucket: "anvui-firestore.appspot.com",
//     messagingSenderId: "978123247240",
//     appId: "1:978123247240:web:957b7e55b784e9d1d6593d"
// }

// firebase.initializeApp(config)
// let firestore = firebase.firestore()
// let database = null;

// if(!firebase.auth.currentUser){
//     firebase.auth().signInWithEmailAndPassword('quocnam@anvui.vn', 'nam@anvui@1')
//     .then((firebaseUser) => {
//         console.log('connected realtime firebase');
//         database = firestore.collection("trips");

//     })
//     .catch(function (error) {
//         console.log(error)
//         console.log('connect firebase error');
//     });
// }

// export default ({ app, $http }, inject) => {
//     inject('fireb', database)
// }

// firebase.initializeApp(envConst[process.env.APP_ENV || 'dev'].firebase)
// export const db = firebase.firestore()

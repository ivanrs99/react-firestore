import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdmgCPvJhB0cs8XiBHuhkrpLYqo3RPJAI",
    authDomain: "fb-crud-react-a6a81.firebaseapp.com",
    databaseURL: "https://fb-crud-react-a6a81.firebaseio.com",
    projectId: "fb-crud-react-a6a81",
    storageBucket: "fb-crud-react-a6a81.appspot.com",
    messagingSenderId: "441266636909",
    appId: "1:441266636909:web:a5fcc6f0c7077b2eead764"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

//Conexion firestore
export const db = fb.firestore();
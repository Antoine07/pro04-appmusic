
import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDFKTjp4zaeBPvi3h_9GL63dyixBHYUACU",
    authDomain: "app-music-71bd0.firebaseapp.com",
    databaseURL: "https://app-music-71bd0.firebaseio.com",
    projectId: "app-music-71bd0",
    storageBucket: "app-music-71bd0.appspot.com",
    messagingSenderId: "123652786365",
    appId: "1:123652786365:web:807eb42651c1dfc9"
}

firebase.initializeApp(firebaseConfig);

export default firebase ;
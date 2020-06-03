import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyBEEtrcWAchxKweASIzc4UuUe05-Yy-q7M',
    authDomain: 'jyesru.firebaseapp.com',
    databaseURL: 'https://jyesru.firebaseio.com',
    projectId: 'jyesru',
    storageBucket: 'jyesru.appspot.com',
    messagingSenderId: '159147139958',
    appId: '1:159147139958:web:c25af1cc56ce1c8ab69057'
  }
  firebase.initializeApp(config)
  firebase.firestore().settings({ timestampsInSnapshots: true })
}
const fireDb = firebase.firestore()
export { fireDb }

// https://medium.com/@pascalluther/nuxt-js-v2-firestore-ssr-938d8fb7d2b0

import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyAyD1v4lt4e5TSzxA8jBz6bSmKkDb6Qbd8',
  authDomain: 'heroes-d362c.firebaseapp.com',
  databaseURL: 'https://heroes-d362c.firebaseio.com',
  projectId: 'heroes-d362c',
  storageBucket: 'heroes-d362c.appspot.com',
  messagingSenderId: '284327527478',
  appId: '1:284327527478:web:cf8410fd96036238e4497',
  measurementId: 'G-SY4C6KN8M5',
};
const exported_firebase = firebase.initializeApp(firebaseConfig);
export default exported_firebase;

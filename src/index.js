import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import ContextWrapper from './context/ContextWrapper';

// firebase initialize
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCBATVLmPyP29uMiXFT_XZsU2CJ43CRFw4',
  authDomain: 'def-hacks-clone.firebaseapp.com',
  projectId: 'def-hacks-clone',
  storageBucket: 'def-hacks-clone.appspot.com',
  messagingSenderId: '677286999737',
  appId: '1:677286999737:web:97cb30419f3599e1bf8d68',
  measurementId: 'G-8FM4D2KR6Z',
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ContextWrapper>
      <Router>
        <App />
      </Router>
    </ContextWrapper>
  </React.StrictMode>,
  rootElement
);

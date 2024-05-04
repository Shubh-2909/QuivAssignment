import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDXDH1iqsLZOCxBrlbt1cbFKU2Gs5x7u1I",
  authDomain: "quiv-6813d.firebaseapp.com",
  projectId: "quiv-6813d",
  storageBucket: "quiv-6813d.appspot.com",
  messagingSenderId: "735664433868",
  appId: "1:735664433868:web:51c71db53c68ac9f15b069",
  measurementId: "G-MREEQ97J3L"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
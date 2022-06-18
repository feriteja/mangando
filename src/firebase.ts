import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNFnG3ReA76bVmJvrWfBVWC-amIQ5cqks",
  authDomain: "project-clone-d291a.firebaseapp.com",
  databaseURL:
    "https://project-clone-d291a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-clone-d291a",
  storageBucket: "project-clone-d291a.appspot.com",
  messagingSenderId: "967035871012",
  appId: "1:967035871012:web:18f4440ed37273c889ddb1",
  measurementId: "G-KCX118R85K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_BASE_SITE_KEY),

  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);

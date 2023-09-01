
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseStorage, getStorage, ref } from 'firebase/storage'
import 'dotenv/config'
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "agendatelefonicastorage.firebaseapp.com",
  projectId: "agendatelefonicastorage",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: "622938534692",
  appId: "1:622938534692:web:9c181da095f1bf8c3fb9b1",
  measurementId: "G-XZ9DTD8FH5"
};

export class FirebaseImageStorage {
    private app: FirebaseApp
    private storage: FirebaseStorage

    constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.storage = getStorage(this.app);
    }
}

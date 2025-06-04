
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
	apiKey: "AIzaSyDPQ5lKXs9pNffjDqioOr73GJpET4FwpeU",
	authDomain: "projecttodo-50ae7.firebaseapp.com",
	projectId: "projecttodo-50ae7",
	storageBucket: "projecttodo-50ae7.firebasestorage.app",
	messagingSenderId: "136501845463",
	appId: "1:136501845463:web:7668da9126683c2d81ff92",
	databaseURL: 'https://projecttodo-50ae7-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

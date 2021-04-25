import { firebaseApp } from "./firebase";
import * as firebase from 'firebase';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const signInWithEmailAndPassword = async({email, pass})=>{
    const result = {statusResponse : true, error : null};
    try {
        await firebase.auth().signInWithEmailAndPassword(email, pass);
    } catch (error) {
        result.statusResponse = false;
        result.error = "Usuario o contraseña no válido";
    }
    return result;
}

export const getCurrentUser = ()=>{
    return firebase.auth().currentUser;
}

export const addDocumentWithoutId = async(collection, data)=>{
    const result = {statusResponse : false, error : null}
    try {
        await db.collection(collection).add(data);
    } catch (error) {
        result.statusResponse = true;
        result.error = error;
    }
    return result;
}

export const getDocuments = async (collection) => {
    const result = {
      statusResponse: true,
      error: null,
      documents: [],
      startDocuments: null,
    };
    try {
      const response = await db
        .collection(collection)
        .where("user","==",getCurrentUser().uid)
        .get();
      if (response.docs.length > 0) {
        result.startDocuments = response.docs[response.docs.length - 1];
      }
      response.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        result.documents.push(document);
      });
    } catch (error) {
        console.log(error);
      result.statusResponse = false;
      result.error = error;
    }
  
    return result;
  };

  export const updateDocument = async(collection, id, data)=>{
    const result = {statusResponse : true, error : null}
    try {
        await db.collection(collection).doc(id).update(data);
    } catch (error) {
        result.statusResponse = false;
        result.error = error;
    }
    return result;
  }

  export const deleteDocument = async(collection, id)=>{
    const result = {statusResponse : true, error : null}
    try {
        await db.collection(collection).doc(id).delete();
    } catch (error) {
        result.statusResponse = false;
        result.error = error;
    }
    return result;
  }
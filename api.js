import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    doc, 
    getDoc, 
    query,
    where 
} from "firebase/firestore/lite";

// Rest of your code remains the same
const firebaseConfig = {
  apiKey: "AIzaSyC1a0l8oVdByDgLbf2Up6bGJw4jzkkPzfs",
  authDomain: "vanlife-5fe69.firebaseapp.com",
  projectId: "vanlife-5fe69",
  storageBucket: "vanlife-5fe69.appspot.com",
  messagingSenderId: "303081497945",
  appId: "1:303081497945:web:5bb8aee3f1e499453dd848"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Refactoring the fetching functions below
const vanCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vanCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)

    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vanCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
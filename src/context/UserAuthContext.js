import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, query, where, getDocs,  } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const context = createContext();

export function UserAuthContextProvider({ children }) {

  // Storage

  const [progress, setProgress] = useState(0)

  const uploadImg = (file) => {
    if (!file) return;
    const fileName = new Date().getTime() + file.name
    const stroageRef = ref(storage, fileName)
    const uploadImg = uploadBytesResumable(stroageRef, file)
    uploadImg.on('state-change', (snapshot) => {
      const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(prog);
    }, (err) => {
      console.log(err);
    }, () => {
      getDownloadURL(uploadImg.snapshot.ref)
        .then((url) => {
          console.log(url);
          let imageURL = url;
          // Now you have valid `imageURL` from async call
          var user = auth.currentUser;
          updateProfile(user, { photoURL: imageURL })
            .then(function () { getData() })
            .catch(function (error) { console.log(error) });
        })
    })
  }

  // Collections
  const [userMovies, setUserMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const addOrEditMovie = async (movieObj) => {
    try {
      const docRef = await addDoc(collection(db, "movies"), { ...movieObj, postBy: user.displayName, userId: user.uid });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getUserMovies = async () => {
    console.log(auth);
    let userId = auth.currentUser;
    console.log(userId);
    const q = await query(collection(db, "movies"), where("uid", "==", userId.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserMovies(doc.data())
      console.log(doc.id, " => ", doc.data());
    });

  }

  // const filteredUserMovies = user && movies.filter(movie =>
  //   movie.uid.includes(auth.currentUser.uid)
  // );

  const getData = () => {
    onSnapshot(collection(db, "movies"), (doc) => {
      const allMovies = [];

      doc.forEach((doc) => {        
        allMovies.push({ ...doc.data(), id: doc.id });
      });
      console.log(allMovies);
      setMovies(allMovies);
    });
  }

  const deleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await deleteDoc(doc(db, "movies", id));
    }
  }

  const updateLikes = async (id, obj) => {
    const likes = doc(db, "movies", id);
    await updateDoc(likes, obj);
  }

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredMovies = movies && movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );


  // Authentication

  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    getData();
    // getUserMovies();

    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    user,
    userMovies,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    addOrEditMovie,
    filteredMovies,
    handleChange,
    movies,
    deleteMovie,
    updateLikes,
    progress,
    uploadImg
  }

  return (
    <context.Provider value={values}>
      {children}
    </context.Provider>
  );
}

export function useUserAuth() {
  return useContext(context);
}

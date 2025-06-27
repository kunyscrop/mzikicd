// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQHfXEcC-LgqbtYKpxoTmj0Ns5nmungwE",
  authDomain: "mzikicd.firebaseapp.com",
  projectId: "mzikicd",
  storageBucket: "mzikicd.firebasestorage.app",
  messagingSenderId: "656917047429",
  appId: "1:656917047429:web:901057f18288feaba9e1ec",
  databaseURL: "https://mzikicd-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

// Connexion unique
function signIn() {
  const email = "kunylakalwi@gmail.com";
  const pass = "kuny137$KN";
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => alert("✅ Connecté"))
    .catch(err => alert("Erreur de connexion contact kuny137 : " + err.message));
}
console.log("main.js chargé");
// Upload fichier
function uploadFile() {
  const file = document.getElementById("mediaFile").files[0];
  if (!file) return alert("Aucun fichier sélectionné !");
  const ref = storage.ref("medias/" + file.name);
  ref.put(file)
    .then(() => alert("✅ Fichier uploadé avec succès !"))
    .catch(err => alert("❌ Échec de l'upload : " + err.message));
}

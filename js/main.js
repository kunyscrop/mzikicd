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

function signIn() {
  const email = "kuny137@gmail.com";
  const pass = "kuny137$KN";
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => alert("✅ Connecté"))
    .catch(err => alert("❌ " + err.message));
}

function uploadFile() {
  const file = document.getElementById("mediaFile").files[0];
  if (!file) return alert("Choisis un fichier à uploader.");

  const ref = storage.ref("medias/" + file.name);
  ref.put(file)
    .then(() => alert("✅ Fichier uploadé !"))
    .catch(err => alert("❌ Erreur : " + err.message));
}

// Afficher les médias
window.onload = () => {
  const audioList = document.getElementById("audio-list");
  const videoList = document.getElementById("video-list");

  const db = firebase.database();

  const fakeMedias = [
    {
      name: "rumba_legende.mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/mzikicd.firebasestorage.app/o/medias%2Frumba_legende.mp3?alt=media",
      type: "audio"
    },
    {
      name: "soukous_vibes.mp3",
      url: "https://firebasestorage.googleapis.com/v0/b/mzikicd.firebasestorage.app/o/medias%2Fsoukous_vibes.mp3?alt=media",
      type: "audio"
    },
    {
      name: "clip_fally_ipupa.mp4",
      url: "https://firebasestorage.googleapis.com/v0/b/mzikicd.firebasestorage.app/o/medias%2Fclip_fally_ipupa.mp4?alt=media",
      type: "video"
    },
    {
      name: "konono_live.webm",
      url: "https://firebasestorage.googleapis.com/v0/b/mzikicd.firebasestorage.app/o/medias%2Fkonono_live.webm?alt=media",
      type: "video"
    }
  ];

  fakeMedias.forEach(file => {
    const card = document.createElement("div");

    const btn = document.createElement("button");
    const counter = document.createElement("p");
    const id = file.name.replace(/\./g, "_");

    btn.textContent = "⬇️ Télécharger";
    btn.onclick = () => {
      window.open(file.url, "_blank");
      db.ref(`downloads/${file.type}/${id}`).transaction(n => (n || 0) + 1);
    };

    db.ref(`downloads/${file.type}/${id}`).on("value", snap => {
      counter.textContent = "Téléchargements : " + (snap.val() || 0);
    });

    if (file.type === "audio") {
      const player = document.createElement("audio");
      player.controls = true;
      player.src = file.url;
      card.appendChild(player);
      card.appendChild(btn);
      card.appendChild(counter);
      audioList.appendChild(card);
    }

    if (file.type === "video") {
      const player = document.createElement("video");
      player.controls = true;
      player.src = file.url;
      card.appendChild(player);
      card.appendChild(btn);
      card.appendChild(counter);
      videoList.appendChild(card);
    }
  });
};
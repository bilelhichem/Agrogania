import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as databaseURL, set , onValue ,remove} from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDLwFM61vVpvEV-Dq9PD9HsqRWZTCtTP2k",
    authDomain: "agrogania.firebaseapp.com",
    projectId: "agrogania",
    storageBucket: "agrogania.appspot.com",
    messagingSenderId: "28769174899",
    databaseURL: "https://agrogania-default-rtdb.firebaseio.com",
    appId: "1:28769174899:web:099ab55d324501bd3c3106",
    measurementId: "G-ZMV59WRXHH"
  };


  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const db = databaseURL(database,"Agrigania/");









document.getElementById('abd').addEventListener('click', function() {
    console.log("GO button clicked");

    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    const z = parseInt(document.getElementById('z').value);
    const typePlante = document.getElementById('typePlante').value;
    

    if (isNaN(x) || isNaN(y)) {
        alert('Veuillez entrer des valeurs numériques valides pour X et Y.');
        return;
    }

    console.log(`Moving to X: ${x}, Y: ${y} , Z: ${z} , typePlante: ${typePlante}`);

    // Logique pour envoyer ces données à l'Arduino
    fetch('http://localhost:8000/api/control', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y , z, typePlante}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Mouvement effectué.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Une erreur est survenue lors de l\'envoi des données.');
    });
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const typePlante = document.getElementById('typePlante').value;
    const demarre = document.getElementById('demarre').value;
    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    const z = parseInt(document.getElementById('z').value);
    const rayon = parseInt(document.getElementById('rayon').value);
    const depth = parseInt(document.getElementById('depth').value);
    const statut = document.getElementById('statut').value;
    const eau = document.getElementById('eau').value;
    const etaler = document.getElementById('etaler').value;
    const hauteur = document.getElementById('hauteur').value;

    const newRecordRef = push(db);
    const newRecordKey = newRecordRef.key;


    const newData = {
        typePlante : typePlante , 
        x :x,
        y: y, 
        demarre : demarre,
        z:z, 
        rayon : rayon , 
        depth : depth , 
        statut : statut , 
        eau : eau , 
        etaler  : etaler , 
        hauteur : hauteur 






      } ; 

      set(newRecordRef, newData) ;

      setInterval(function() {
        location.reload();
      }, 100);

    

  
});

document.querySelector('.delete-btn').addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette plante ?')) {
        
        alert('Plante supprimée.');
    }
});
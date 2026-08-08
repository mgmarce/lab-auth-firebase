
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
import { firebaseConfig } from "./firebase-config.js";


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Test
console.log("Firebase conectado correctamente");
console.log(app);

// Registro
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email-registro").value;
        const password = document.getElementById("password-registro").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            alert("Usuario registrado correctamente");

            console.log("Usuario creado:", userCredential.user);

            window.location.href = "index.html";
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            alert("Error al registrar usuario: " + error.message);
        }
    });
}

const formLogin = document.getElementById("form-login");

if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            alert("Usuario conectado correctamente");

            console.log("Usuario conectado:", userCredential.user);

            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Error al conectar usuario:", error.message);
            alert("Error al conectar usuario: " + error.message);
        }
    });
}

const usuarioInfo = document.getElementById("usuario-info");

if (usuarioInfo) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            usuarioInfo.textContent = `Bienvenido, ${user.email}`;
        } else {
            window.location.href = "index.html";
        }
    });
}

const btnLogout = document.getElementById("btn-logout");

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada correctamente");
            window.location.href = "index.html";
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            alert("Error al cerrar sesión: " + error.message);
        }
    });
}
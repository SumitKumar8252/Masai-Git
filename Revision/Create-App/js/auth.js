import { auth, db } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {doc, getDocs, setDoc} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded',()=>{
    const loginBtn= document.getElementById('login-btn')
    const signupBtn= document.getElementById('signup-btn')
    const logoutBtn= document.getElementById('logout-btn')

    if(loginBtn){
        loginBtn.addEventListener('click', async()=>{
            const email= document.getElementById('login-email').value;
            const password= document.getElementById('login-password').value;
            try {
                await signInWithEmailAndPassword(auth, email, password)
                //Redirect the user to dashboard page

                window.open("dashboard.html", "_blank")
            } catch (error) {
                document.getElementById('login-message').innerText= error.message                
            }
        })
    }

    if(signupBtn){
        signupBtn.addEventListener('click', async ()=>{
            const email= document.getElementById('signup-email').value;
            const password= document.getElementById('signup-password').value;
            const role= document.getElementById('role').value;
            try {
                const userCredentials= await createUserWithEmailAndPassword(auth, email, password)
                await setDoc(doc(db, "users", userCredentials.user.uid), {email, role})
                window.location.href="index.html"
            } catch (error) {
                document.getElementById('signup-message').innerText= error.message
            }
        })
    }

    if(logoutBtn){
        logoutBtn.addEventListener('click', async()=>{
            await signOut(auth)
            window.location.href= "index.html"
        })
    }
})
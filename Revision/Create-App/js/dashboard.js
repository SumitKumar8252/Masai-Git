import { auth, db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  doc,
  getDocs,
  getDoc,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const notesList = document.getElementById("notes-list");
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");

  let currentUser = null;

  //check Auth state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      document.getElementById("user-email").innerText = currentUser.email;

      //Fetch user role
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        document.getElementById("user-role").innerText = role;

        //Load Notes
        loadNotes(user, role);
      }
    } else {
      //Redirect if not logged in
      window.location.href = "index.html";
    }
  });

  //Load Notes
  async function loadNotes(user, role) {
    notesList.innerHTML = "";
    const notesRef = collection(db, "notes");

    //Fetch all the notes (so every user can see all the notes)
    const querySnapshot = await getDocs(notesRef);

    querySnapshot.forEach((doc) => {
      const noteData = doc.data();
      displayNote(doc.id, noteData, user.uid, role);
    });
  }

  function displayNote(id, data, userId, role) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    
    //Create Elements
    const noteContent = document.createElement('p')
    noteContent.innerText= data.content

    const noteOwner= document.createElement('small')
    noteOwner.innerText= `By: ${data.userEmail}`

    noteDiv.append(noteContent, noteOwner)

    //Only admin or owner should be able to edit or delete
    if(data.userId === userId || role=== "admin"){
        //Edit button
        const editBtn= document.createElement('button')
        editBtn.innerText= "Edit"
        editBtn.classList.add("edit-btn")
        editBtn.onclick= ()=>{
            const editTextArea= document.createElement('textarea')
            editTextArea.value= noteContent.innerText

            const saveBtn= document.createElement('button')
            saveBtn.innerText= "Save"
            saveBtn.classList.add("save-btn")

            // change the text sand save 
            saveBtn.onclick= async()=>{
                const newContent= editTextArea.value.trim();
                if(newContent !=""){
                    await setDoc(doc(db, "notes", id),{...data, content: newContent})
                    noteContent.innerText= newContent;
                    noteDiv.replaceChild(noteContent, editTextArea)
                    noteDiv.replaceChild(saveBtn, editBtn)
                } 
            }

            noteDiv.replaceChild(editTextArea, noteContent)
            noteDiv.replaceChild(saveBtn, editBtn)
        }

        //Delete button
        const deleteBtn= document.createElement('button')
        deleteBtn.innerText= "Delete"
        deleteBtn.classList.add('delete-btn')
        deleteBtn.onclick= async()=>{
            await deleteDoc(doc(db, 'notes', id));
            noteDiv.remove()
        }

        noteDiv.appendChild(editBtn)
        noteDiv.appendChild(deleteBtn)
    } 

    notesList.appendChild(noteDiv);
  }

  //Add note
  addNoteBtn.addEventListener("click", async () => {
    const content = noteInput.value.trim();
    if (content === "") return;

    await addDoc(collection(db, "notes"), {
      content,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      createdAt: new Date(),
    });

    noteInput.value=""
    loadNotes(currentUser, document.getElementById('user-role').innerText)
  });
});

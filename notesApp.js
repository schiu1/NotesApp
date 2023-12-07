//import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
//document.getElementById('noteText').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);
let noteCount = 0;
if(localStorage.getItem("saved") == null){
    noteCount = 1;
    const trashIcon = document.createElement("i"); 
    trashIcon.classList.toggle("fa");
    trashIcon.classList.toggle("fa-trash");
    trashIcon.id = "trash-icon";
    trashIcon.setAttribute("aria-hidden", "true");

    const textSpace = document.createElement("textarea");
    textSpace.classList.toggle("noteText");
    textSpace.id = "noteText";
    textSpace.innerHTML = "Hello, welcome to the Notes App."
    
    const createdNote = document.createElement("div");
    createdNote.classList.toggle("note");
    createdNote.id = "note1";

    createdNote.appendChild(trashIcon);
    createdNote.appendChild(textSpace);
    document.body.appendChild(createdNote);

    localStorage.setItem("noteOrder", "1");
    console.log("new");
}
else{
    noteCount = parseInt(localStorage.noteCount);
    console.log("old");
}

function AddNote(){
    if(localStorage.getItem("saved") == null){
        localStorage.setItem("saved", "true");
    }
    //create new note with unique id, which will append to end
    const trashIcon = document.createElement("i"); 
    trashIcon.classList.toggle("fa");
    trashIcon.classList.toggle("fa-trash");
    trashIcon.id = "trash-icon";
    trashIcon.setAttribute("aria-hidden", "true");

    const textSpace = document.createElement("textarea");
    textSpace.classList.toggle("noteText");
    textSpace.id = "noteText";
    
    const createdNote = document.createElement("div");
    createdNote.classList.toggle("note");
    createdNote.id = "note" + (noteCount + 1);
    console.log(createdNote.id);

    createdNote.appendChild(trashIcon);
    createdNote.appendChild(textSpace);
    document.body.appendChild(createdNote);
    noteCount++;
    localStorage.setItem("noteCount", noteCount);

    //make changes for it to perform as intended
    const newNote = document.getElementById(createdNote.id);
    const deleteIcon = newNote.getElementsByTagName("i")[0];
    deleteIcon.onclick = function(){DeleteNote(createdNote.id)}; 

    //append all other notes behind newest created, pushing it to top
    //do the same with updating a note but add if statemnt to check if same name as updated note
    //if it is, continue
    let counter = 0;
    const allNotes = document.getElementsByClassName("note");
    while(counter < allNotes.length){
        if(counter + 1 != allNotes.length){
            document.body.appendChild(allNotes[0]);
        }
        counter += 1;
    }

    let noteOrder = "";
    for(let element of allNotes){
        noteOrder = noteOrder + element.id.slice(4) + ",";
    } 
    noteOrder = noteOrder.slice(0, -1);
    console.log(noteOrder);
    localStorage.setItem("noteOrder", noteOrder);
}

function DeleteNote(noteNum){
    if(localStorage.getItem("saved") == null){
        localStorage.setItem("saved", "true");
    }
    if(confirm("Do you wish to delete this note?") == true){
        const elem = document.getElementById(noteNum);
        elem.remove();
    }
}
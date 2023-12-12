//import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
//document.getElementById('noteText').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
const plus = document.getElementById("plus-icon");
plus.addEventListener("click", function(){ AddNote(); });
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
    localStorage.setItem(createdNote.id, "");
    console.log("created new");
}
else if(localStorage.getItem("saved") != null){
    noteCount = parseInt(localStorage.noteCount);
    const currentOrder = localStorage.getItem("noteOrder");
    if(currentOrder != ""){
        const orderArray = currentOrder.split(",");
        for(let id of orderArray){
            AddNote(id);
            const savedText = localStorage.getItem("note" + id);
            if(savedText != null){
                const note = document.getElementById("note" + id);
                note.getElementsByTagName("textarea")[0].innerHTML = savedText;
            };
            
        } 
    }
    else{
        console.log("no existing notes to load from save");
    }
    console.log("loaded old save");
}

function AddNote(newId){
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
    if(newId == undefined){
        createdNote.id = "note" + (noteCount + 1);
        noteCount++;
        localStorage.setItem("noteCount", noteCount);
    }
    else if (newId != undefined){
        createdNote.id = "note" + newId;
    }
    console.log("added " + createdNote.id);

    createdNote.appendChild(trashIcon);
    createdNote.appendChild(textSpace);
    document.body.appendChild(createdNote);

    //make changes for it to perform as intended
    localStorage.setItem(createdNote.id, "");
    const newNote = document.getElementById(createdNote.id);
    const deleteIcon = newNote.getElementsByTagName("i")[0];
    deleteIcon.onclick = function(){ DeleteNote(createdNote.id) };
    const textBox = newNote.getElementsByTagName("textarea")[0];
    textBox.onblur = function(){ UpdateNote(createdNote.id) }; 

    //append all other notes behind newest created, pushing it to top
    const allNotes = document.getElementsByClassName("note");
    if (newId == undefined) {
        let counter = 0;
        while(counter < allNotes.length){
            if(counter + 1 != allNotes.length){
                document.body.appendChild(allNotes[0]);
            }
            counter += 1;
        }   
    }

    let noteOrder = "";
    for(let element of allNotes){
        noteOrder = noteOrder + element.id.slice(4) + ",";
    } 
    noteOrder = noteOrder.slice(0, -1);
    localStorage.setItem("noteOrder", noteOrder);
}

function DeleteNote(noteNum){
    if(localStorage.getItem("saved") == null){
        localStorage.setItem("saved", "true");
    }
    if(confirm("Do you wish to delete this note?") == true){
        const elem = document.getElementById(noteNum);
        elem.remove();
        let order = localStorage.getItem("noteOrder");
        if(order.indexOf(",") != -1){
            let temp = order.split(",");
            temp.splice(temp.indexOf(noteNum.slice(4)), 1);
            order = temp.join(",");
        }
        else{
            order = "";
        }
        localStorage.setItem("noteOrder", order);
        localStorage.removeItem(noteNum);
        console.log("deleted " + noteNum);
    }
}

function UpdateNote(noteId){
    const note = document.getElementById(noteId);
    const text = note.getElementsByTagName('textarea')[0].value;
    if(localStorage.getItem(noteId) != text){
        const allNotes = document.getElementsByClassName("note");
        for(const element of allNotes){
            if(element.id == noteId){
                document.body.insertBefore(element, allNotes[0]);
            }
        }
        localStorage.setItem(noteId, text);
        console.log("saved " + noteId + " text");
    }
    
}
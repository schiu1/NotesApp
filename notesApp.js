const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);
let noteCount = 1;

function AddNote(){
    /*
    const allNotes = document.getElementsByClassName("note");
    const original = allNotes[0];
    let clone = original.cloneNode(true);
    */
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

    createdNote.appendChild(trashIcon);
    createdNote.appendChild(textSpace);
    document.body.appendChild(createdNote);
    noteCount++;

    //make changes for it to perform as intended
    const newNote = document.getElementById(createdNote.id);
    const deleteIcon = newNote.getElementsByTagName("i")[0];
    deleteIcon.onclick = function(){DeleteNote(createdNote.id)}; 

    //append all other notes behind newest created, pushing it to top
    //do the same with updating a note but add if statemnt to check if same name as updated note
    //if it is, continue
    let counter = 0;
    const allNotes = document.getElementsByClassName("note");
    while(counter < allNotes.length - 1){
        document.body.appendChild(allNotes[0]);
        counter += 1;
    }   
}

function DeleteNote(noteNum){
    const elem = document.getElementById(noteNum);
    elem.remove();
}
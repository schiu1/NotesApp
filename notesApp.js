const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);

function AddNote(){
    //add new note with unique id, which will append to end
    const allNotes = document.getElementsByClassName("note");
    const original = document.getElementById("note" + allNotes.length);
    let clone = original.cloneNode(true);
    clone.id = "note" + (allNotes.length + 1);
    document.body.appendChild(clone);

    //make changes for it to perform as intended
    const newNote = document.getElementById(clone.id);
    console.log("innerHTML: " + newNote.getElementsByTagName("textarea")[0].innerHTML);
    console.log("value: " + newNote.getElementsByTagName("textarea")[0].value);
    const textarea = newNote.getElementsByTagName("textarea")[0];
    textarea.innerHTML = "";
    textarea.value = "";
    const deleteIcon = newNote.getElementsByTagName("i")[0];
    deleteIcon.onclick = function(){DeleteNote(clone.id)}; 

    //append all other notes behind newest created, pushing it to top
    //do the same with updating a note but add if statemnt to check if same name as updated note
    //if it is, continue
    let counter = 0;
    while(counter < allNotes.length - 1){
        document.body.appendChild(allNotes[0]);
        counter += 1;
    }   
}

function DeleteNote(noteNum){
    console.log(noteNum);
}
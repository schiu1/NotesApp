const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);

function AddNote(){
    //add new note with unique id, which will append to end
    const allNotes = document.getElementsByClassName("note");
    const original = document.getElementById("note" + allNotes.length); //change this to be more general
    let clone = original.cloneNode(true);
    clone.id = "note" + (allNotes.length + 1);
    document.body.appendChild(clone);
    
    //append all other notes behind newest created, pushing it to top
    //do the same with updating a note but add if statemnt to check if same name as updated note
    //if it is, continue
    let counter = 0;
    while(counter < allNotes.length - 1){
        document.body.appendChild(allNotes[0]);
        counter += 1;
    }
    
}
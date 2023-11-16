const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);

function AddNote(){
    const original = document.getElementById("note2"); //change this to be more general
    const allNotes = document.getElementsByClassName("note");
    let clone = original.cloneNode(true);
    clone.id = "note" + (allNotes.length + 1);
    document.body.appendChild(clone);
    for(let i = 0; i < allNotes.length; i++){
        console.log(allNotes[i]);
        document.body.appendChild(allNotes[i]);
        //supposed to get note1 and note2 and append them to the end of note3, pushing the newest created note to the top
    }
    
    
}
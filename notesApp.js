const plus = document.getElementById("plus-icon");
plus.addEventListener("click", AddNote);

function AddNote(){
    const original = document.getElementById("note1");
    const clone = original.cloneNode(true);
    document.body.appendChild(clone);
}
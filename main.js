let noteArea = document.querySelector('.note-area')
let title = document.querySelector('.title')
let noteText = document.querySelector('.note-text')
let notes = document.querySelector('#notes')
let note = document.querySelector('.note') 

// show note text when clicked

const showNoteText = () => {
  noteText.style = 'display: block';
  noteArea.classList.add('note-now');
  title.setAttribute('placeholder', 'Title')
  title.style = 'font-size: 20px'
}



// hide note text when document is clicked

const hideNoteText = () => {
  noteText.style.display = 'none'
  noteArea.classList.remove('note-now');
  title.setAttribute('placeholder', 'take a note...')
  title.style = 'font-size: 15px'
}
// Add the note to the list of notes

const addNote = (T,N) => {
  notes.innerHTML += `  <div class="note">
         <h3 class="title-text" id="title-text">${T}</h3>
         <p class="note-blog" id="note-blog">${N}</p>
         <i class="fa fa-trash"></i>
      </div>`
      title.value = null;
      noteText.value = null;
}
document.addEventListener('click' ,(e) => {
  let isclicked = noteArea.contains(e.target)
  if(!isclicked){
    hideNoteText();
    if(title.value.length === 0 && noteText.value.length === 0){
      return
    }else{
      addNoteToLocalStorage([title.value, noteText.value]);
      addNote(title.value , noteText.value);
    }
  }
})
noteArea.addEventListener('click',showNoteText)

// show the icon button 



// hide the icon button

// delete from local storage
const deleteFromLocalStorage = (deletedNote) => {
  let oldNote;
  if(localStorage.getItem('notes') === null){
    oldNote = []
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'))
  }
  oldNote.map((note,index) => {

    if(note[0] == deletedNote.children[0].textContent.trim() && note[1] == deletedNote.children[1].textContent.trim()){
      oldNote.splice(index,1);
      return oldNote;
    }
  })
  localStorage.setItem('notes',JSON.stringify(oldNote))
  
}

// remove the note if clicked the button

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-trash')){
    e.target.parentElement.remove()
    deleteFromLocalStorage(e.target.parentElement)
  }
})



//  Local Storage 

const addNoteToLocalStorage = (note) => {
  if(note.length < 0){
    return;
  }
  let oldNote;
  if(localStorage.getItem('notes') === null){
    oldNote = []
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'))
  }
  oldNote.push(note)
  localStorage.setItem('notes', JSON.stringify(oldNote))
}

//  read the notes from the local storage 
const getNotesFromLocalStorage = () => {
  let oldNote;
  if(localStorage.getItem('notes') === null){
    oldNote = []
  }else{
    oldNote = JSON.parse(localStorage.getItem('notes'))
  }
  oldNote.forEach(note => {
    notes.innerHTML += `  <div class="note">
         <h3 class="title-text" id="title-text">${note[0]}</h3>
         <p class="note-blog" id="note-blog">${note[1]}</p>
         <i class="fa fa-trash"></i>
      </div>`
  })
}

document.addEventListener('DOMContentLoaded', getNotesFromLocalStorage)


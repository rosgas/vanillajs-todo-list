//Note Controller
const NoteUICtrl = (function (TodosUICtrl) {
  //Get create notification from todos UI controller
  const createNotification = TodosUICtrl.getCreateNotification

  const hasClassName = TodosUICtrl.getHasClassName()

  return {
    showNoteArea: function (e) {
      if (e.target.classList.contains('add-note')) {
        const togglerEl = e.target.closest('.menu').parentNode.firstElementChild
        const noteEl = e.target.closest('.menu').parentNode.nextElementSibling
        const bookmarkEl = e.target.closest('.row').children[3]

        if (noteEl.classList.contains('close')) {
          noteEl.classList.remove('close')
        }

        if (bookmarkEl.classList.contains('visible')) {
          bookmarkEl.classList.add('move')
        }

        noteEl.classList.add('show')

        togglerEl.checked = false
      }
    },

    activesAddNoteBtn: function (e) {
      if (e.target.classList.contains('note-area')) {
        e.target.value.charAt(0).toUpperCase()
        const addNoteBtn = e.target.parentElement.children[3].firstElementChild

        if (e.target.value.trim() !== '') {
          addNoteBtn.classList.add('active')
        } else {
          addNoteBtn.classList.remove('active')
        }
      }
    },

    addNote: function (e) {
      if (e.target.classList.contains('active')) {
        const noteEl = e.target.closest('.note')
        const bookmarkEl = e.target.closest('.row').children[3]
        const noteText = noteEl.querySelector('.note-area')

        noteText.value = `${noteText.value.trim()}`

        if (bookmarkEl.classList.contains('visible')) {
          bookmarkEl.classList.remove('move')
        } else {
          bookmarkEl.classList.add('visible')
        }

        noteEl.classList.remove('show')
        noteEl.classList.add('close')

        setTimeout(() => {
          e.target.classList.remove('active')
        }, 1000)
      }
    },

    deleteNoteClick: function () {
      createNotification('Are you sure to delete the note?')
      document.querySelector('.confirm-delete').classList.add('delete-note')
    },

    deleteNote: function (e, listItem) {
      const boxNotification = document.querySelector('.notification-box')
      const noteEl = listItem.querySelector('.note')
      const noteToDelete = listItem.querySelector('.note-area')
      const bookmarkEl = listItem.querySelector('.bookmark-container')
      const addNoteBtn = listItem.querySelector('.add-note-btn')

      boxNotification.classList.remove('fadein')
      boxNotification.classList.add('fadeout')

      setTimeout(() => boxNotification.remove(), 300)

      noteToDelete.value = ''

      bookmarkEl.classList.remove('visible')
      bookmarkEl.classList.remove('move')

      noteEl.classList.remove('show')
      noteEl.classList.add('close')

      addNoteBtn.classList.remove('active')
    },

    closeNote: function (e) {
      if (
        e.target.classList.contains('close-note') ||
        e.target.parentElement.classList.contains('close-note')
      ) {
        const noteEl = e.target.parentNode.parentNode.parentNode
        const noteArea = noteEl.querySelector('.note-area')

        const bookmarkEl = e.target.closest('.row').children[3]

        if (bookmarkEl.classList.contains('visible')) {
          bookmarkEl.classList.remove('move')
        }

        if (bookmarkEl.classList.contains('visible') && noteArea.value === '') {
          bookmarkEl.classList.remove('visible')
        }

        noteEl.classList.remove('show')
        noteEl.classList.add('close')
      }
    },

    closeNoteIfOutside: function (e) {
      const notes = document.querySelectorAll('#note')

      noteElsClassList = [
        'add-note',
        'note-container',
        'note-area',
        'close-note',
        'fa-times',
        'note-btn',
        'add-note-btn',
        'delete-note-btn',
      ]

      if (hasClassName(e, noteElsClassList) === false) {
        notes.forEach((note) => {
          if (note.classList.contains('show')) {
            const noteText = note.querySelector('.note-area').value
            const bookmark = note
              .closest('.row')
              .querySelector('.bookmark-container')

            bookmark.classList.remove('move')
            note.classList.remove('show')
            note.classList.add('close')

            if (noteText === '') {
              bookmark.classList.remove('visible')
            } else {
              bookmark.classList.add('visible')
            }
          }
        })
      }
    },
  }
})(TodosUICtrl)

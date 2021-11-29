//Form app controller
const FormAppCtrl = (function (ItemCtrl, StorageCtrl, FormUICtrl, NoteUICtrl) {
  //Load event listener
  const loadFormEventListeners = function () {
    const form = document.getElementById('todo-form')
    const formUISelectors = FormUICtrl.getSelectors()

    formUISelectors.demoBtn.addEventListener('click', FormUICtrl.showDemo)
    formUISelectors.closeDemoBtn.addEventListener('click', FormUICtrl.closeDemo)

    formUISelectors.infoToggle.addEventListener('click', FormUICtrl.openAppInfo)
    form.addEventListener('click', addPriorityIcon)
    form.addEventListener('click', removeIcon)
    form.addEventListener('click', NoteUICtrl.showNoteArea)
    form.addEventListener('keyup', NoteUICtrl.activesAddNoteBtn)
    form.addEventListener('click', NoteUICtrl.addNote)
    form.addEventListener('click', NoteUICtrl.closeNote)
    form.addEventListener('submit', addItemSubmit)

    formUISelectors.todoInput.addEventListener(
      'keyup',
      FormUICtrl.activesAddTodoBtn,
    )
    formUISelectors.todoInput.addEventListener('blur', FormUICtrl.blurInput)
    formUISelectors.todoInput.addEventListener('keypress', addItem)
    formUISelectors.todoInput.addEventListener('focus', FormUICtrl.focusInput)
  }

  const addPriorityIcon = function (e) {
    if (
      e.target.parentElement.classList.contains('priority-btns') ||
      e.target.parentElement.parentElement.classList.contains('priority-btns')
    ) {
      FormUICtrl.addPriorityIcon(e)
    }
  }

  const removeIcon = function (e) {
    if (
      e.target.parentElement.parentElement.classList.contains('priority-icon')
    ) {
      FormUICtrl.removeIcon(e)
    }
  }

  const addItemSubmit = function (e) {
    const input = FormUICtrl.getItemInput()
    ItemCtrl.logData()

    //Add item
    const newItem = ItemCtrl.addItem(
      input.todo,
      input.note,
      input.priorityIcon,
      input.bookmark,
    )

    //AddItem to the UI list
    FormUICtrl.addListItem(newItem)

    //Clear form input
    FormUICtrl.clearInput()

    //Get todos left
    const todosLeft = ItemCtrl.getTodosLeft()

    //Add total todo left to the todos UI controller
    TodosUICtrl.showTotTodosLeft(todosLeft)

    // //Store in local storage
    StorageCtrl.storeItem(newItem)

    e.preventDefault()
  }

  const addItem = function (e) {
    let key = e.which || e.keyCode || 0
    const priorIcon = e.target.parentElement.children[0]

    if (
      key === 13 &&
      e.target.value.trim() === '' &&
      priorIcon.innerHTML === ''
    ) {
      e.preventDefault()
    } else if (key === 13 && e.target.value.trim() !== '') {
      addItemSubmit(e)
      e.target.blur()
    }
  }
  //Public methods
  return {
    init: function () {
      //Load event listeners
      loadFormEventListeners()
    },
  }
})(ItemCtrl, StorageCtrl, FormUICtrl, NoteUICtrl)

//Initialize App
const infoHeight = FormUICtrl.setInfoHeight()

FormAppCtrl.init()
TodosAppCtrl.init()

window.onresize = function () {
  location.reload()
}

function func(e) {
  event.preventDefault()
}

//Item list app controller
const TodosAppCtrl = (function (ItemCtrl, StorageCtrl, TodosUICtrl) {
  const hasClassName = TodosUICtrl.getHasClassName()
  const itemList = document.querySelector('.todos')
  //Load event listener
  const loadTodosEventListeners = function () {
    const todosUISelectors = TodosUICtrl.getSelectors()

    document.addEventListener('click', clickOutside)
    document.addEventListener('click', saveEditedTodoIfClickOutside)

    itemList.addEventListener('click', changePriorityIcon)
    itemList.addEventListener('click', removeIcon)

    itemList.addEventListener('click', editTodo)
    itemList.addEventListener('keypress', updateTodoChanges)

    itemList.addEventListener('click', TodosUICtrl.fadeCompleted)

    itemList.addEventListener('click', deleteTodoClick)
    todosUISelectors.confirmNotif.addEventListener('click', deleteTodo)
    todosUISelectors.confirmNotif.addEventListener('click', cancelDelete)

    itemList.addEventListener('click', NoteUICtrl.showNoteArea)
    itemList.addEventListener('keyup', activateAddNoteBtn)
    itemList.addEventListener('click', addNote)
    itemList.addEventListener('click', NoteUICtrl.closeNote)
    itemList.addEventListener('click', deleteNoteclick)
    todosUISelectors.confirmNotif.addEventListener('click', deleteNote)

    itemList.addEventListener('click', checkCompleted)

    todosUISelectors.filter.addEventListener(
      'blur',
      TodosUICtrl.blurFilterInput,
    )
    todosUISelectors.filter.addEventListener(
      'focus',
      TodosUICtrl.focusFilterInput,
    )
    todosUISelectors.filter.addEventListener('keyup', TodosUICtrl.filterTodos)

    todosUISelectors.clearFilterBtn.addEventListener(
      'click',
      TodosUICtrl.clearFilter,
    )

    todosUISelectors.filterAll.addEventListener(
      'click',
      TodosUICtrl.showAllTodos,
    )
    todosUISelectors.filterCompleted.addEventListener(
      'click',
      TodosUICtrl.showCompletedTodos,
    )
    todosUISelectors.clearCompleted.addEventListener(
      'click',
      clearCompetedTodos,
    )
  }

  const clickOutside = function (e) {
    TodosUICtrl.closeMenuIfOutside(e)
    TodosUICtrl.closeNotificationIfOutside(e)
    NoteUICtrl.closeNoteIfOutside(e)
  }

  const saveEditedTodoIfClickOutside = function (e) {
    ElsClassList = [
      'todo-text',
      'edit-todo',
      'delete',
      'add-note',
      'note-container',
      'note-area',
      'close-note',
      'fa-times',
      'note-btn',
      'add-note-btn',
      'delete-note-btn',
      'notification-box',
      'notif-icon',
      'content',
      'confirm-delete',
      'cancel-delete',
    ]

    if (
      ItemCtrl.hasCurrentItem() === true &&
      hasClassName(e, ElsClassList) === false
    ) {
      const editedItemBeforeClick = getListItem()
      const updatedTodo = editedItemBeforeClick.querySelector('.todo-text')
        .value
      const updatedNote = editedItemBeforeClick.querySelector('.note-area')
        .value
      const updatedBookmark = editedItemBeforeClick.querySelector(
        '.bookmark-container',
      ).classList.value

      TodosUICtrl.updateTodo(editedItemBeforeClick.querySelector('.todo-text'))

      const updatedItem = ItemCtrl.updateItem(
        updatedTodo,
        updatedNote,
        updatedBookmark,
      )

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }
  }

  const setCurrentItem = function (e) {
    //Get list item id (ex:item-1)
    const listItemId = e.target.closest('.row').id
    //Break into array
    const itemIdArr = listItemId.split('-')
    //Get the actual id
    const id = parseInt(itemIdArr[1])
    //Get item
    const itemToSet = ItemCtrl.getItemById(id)
    //Set current item
    ItemCtrl.setCurrentItem(itemToSet)
  }

  const getListItem = function () {
    const currentItemId = ItemCtrl.getCurrentItemId()
    const currItemIdStr = JSON.stringify(currentItemId)
    const itemId = 'item-' + currItemIdStr
    const item = document.getElementById(itemId)
    return item
  }

  const removeIcon = function (e) {
    if (
      e.target.parentElement.parentElement.classList.contains('priority-icon')
    ) {
      setCurrentItem(e)
      const updatedIcon = TodosUICtrl.removeIcon(e)
      const updatedItem = ItemCtrl.updateIcon(updatedIcon)

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }
  }

  const changePriorityIcon = function (e) {
    if (
      e.target.parentElement.classList.contains('priority-btns') ||
      e.target.parentElement.parentElement.classList.contains('priority-btns')
    ) {
      setCurrentItem(e)
      const updatedIcon = FormUICtrl.addPriorityIcon(e)
      const updatedItem = ItemCtrl.updateIcon(updatedIcon)

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }
  }

  const editTodo = function (e) {
    if (e.target.classList.contains('edit-todo')) {
      setCurrentItem(e)
      const todoInput = e.target.closest('.row').children[1]
      TodosUICtrl.showEditTodoState(todoInput)
    }
  }

  const updateTodoChanges = function (e) {
    if (e.target.classList.contains('todo-text')) {
      const todoInput = e.target.closest('.row').children[1]
      let key = e.which || e.keyCode || 0

      if (key === 13) {
        updateItemTodo(todoInput)
      }
    }
  }

  const updateItemTodo = function (todoInput) {
    TodosUICtrl.updateTodo(todoInput)
    const updatedTodo = todoInput.value
    const updatedItem = ItemCtrl.updateTodo(updatedTodo)

    StorageCtrl.updateItemStored(updatedItem)
    ItemCtrl.resetCurrentItem()
  }

  const deleteTodoClick = function (e) {
    if (e.target.classList.contains('delete')) {
      setCurrentItem(e)
      TodosUICtrl.deleteTodoClick(e)
    }
  }

  const deleteTodo = function (e) {
    if (e.target.classList.contains('delete-todo')) {
      const itemToDelete = getListItem()
      const currentItemId = ItemCtrl.getCurrentItemId()

      ItemCtrl.deleteCurrentItem()
      const todosLeft = ItemCtrl.getTodosLeft()

      TodosUICtrl.deleteTodo(e, itemToDelete)
      TodosUICtrl.showTotTodosLeft(todosLeft)

      StorageCtrl.deleteItemFromStorage(currentItemId)
      ItemCtrl.resetCurrentItem()
    }
  }

  const activateAddNoteBtn = function (e) {
    if (e.target.classList.contains('note-area')) {
      setCurrentItem(e)
      NoteUICtrl.activesAddNoteBtn(e)
    }
  }
  const addNote = function (e) {
    if (e.target.classList.contains('active')) {
      const listItem = getListItem()
      const noteText = listItem.querySelector('.note-area').value.trim()

      NoteUICtrl.addNote(e)

      const updatedItem = ItemCtrl.addNote(noteText)

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }
  }

  const deleteNoteclick = function (e) {
    if (e.target.classList.contains('delete-note-btn')) {
      setCurrentItem(e)
      NoteUICtrl.deleteNoteClick()
    }
  }

  const deleteNote = function (e) {
    if (e.target.classList.contains('delete-note')) {
      const listItem = getListItem()

      NoteUICtrl.deleteNote(e, listItem)

      const updatedItem = ItemCtrl.deleteNote()

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }

    StorageCtrl.resetIdsStorage()
  }

  const cancelDelete = function (e) {
    if (e.target.classList.contains('cancel-delete')) {
      TodosUICtrl.cancelDelete(e)
      ItemCtrl.resetCurrentItem()
    }
  }

  const checkCompleted = function (e) {
    if (e.target.classList.contains('completed-checkbox')) {
      setCurrentItem(e)

      const checkedItem = getListItem()
      const isCompleted = checkedItem.querySelector('.completed-checkbox')
        .checked

      const updatedItem = ItemCtrl.updateCompleted(isCompleted)
      const todosLeft = ItemCtrl.getTodosLeft()

      TodosUICtrl.showTotTodosLeft(todosLeft)

      StorageCtrl.updateItemStored(updatedItem)
      ItemCtrl.resetCurrentItem()
    }
  }

  const clearCompetedTodos = function (e) {
    const todosCompletedIds = TodosUICtrl.clearCompetedTodos(e)
    let completedItemIds = []
    todosCompletedIds.forEach((itemCompleted) => {
      const itemIdArr = itemCompleted.split('-')
      const id = parseInt(itemIdArr[1])
      completedItemIds.push(id)
    })
    ItemCtrl.clearCompletedItems(completedItemIds)
    completedItemIds.forEach((completedItemId) => {
      StorageCtrl.deleteItemFromStorage(completedItemId)
    })

    StorageCtrl.resetIdsStorage()
  }

  return {
    init: function () {
      //Fetch Items from data structure
      const items = ItemCtrl.getItems()

      //Populate list with items
      if (items.length !== 0) {
        itemList.style.visibility = 'visible'
        TodosUICtrl.populateItemList(items)
      } else {
        itemList.style.visibility = 'hidden'
      }

      //Get todos left
      const todosLeft = ItemCtrl.getTodosLeft()

      //Add total todo left to the todos UI controller
      TodosUICtrl.showTotTodosLeft(todosLeft)

      //Load event listeners
      loadTodosEventListeners()
    },
  }
})(ItemCtrl, StorageCtrl, TodosUICtrl)

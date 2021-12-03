//Item list UI controller
const TodosUICtrl = (function () {
  const itemList = document.querySelector('.todos')
  const todosUISelectors = {
    totTodosLeft: document.querySelector('.todos-left'),
    keepTodoBtn: document.querySelector("input[value='No, thanks']"),
    confirmNotif: document.getElementById('notification'),
    filter: document.getElementById('filter'),
    clearFilterBtn: document.querySelector('.clear-filter'),
    filterResults: document.querySelector('.results-found'),
    filterAll: document.querySelector('.btn-filter-all'),
    filterCompleted: document.querySelector('.btn-filter-completed'),
    clearCompleted: document.querySelector('.btn-clear-completed'),
  }

  //Check checkbox, if todo is completed
  const isCompleted = function (completed, li) {
    if (completed === true) {
      li.querySelector('.completed-checkbox').checked = true
      li.querySelector('.todo-text').classList.add('completed')
    }
    if (completed === false) {
      li.querySelector('.completed-checkbox').removeAttribute('checked')
    }
  }

  const createNotification = function (msg) {
    const notificationEl = document.createElement('div')
    notificationEl.classList.add('notification-box', 'fadein')

    notificationEl.innerHTML = `
    <div class="content">
      <i class="icon notif-icon fas fa-exclamation-circle fa-2x"></i>
      <h2 class="title">${msg}</h2> 
    </div>
    <div class="notif-btn">
      <input type="button" class="cancel-delete" value="No, thanks">
      <input type="button" class="confirm-delete" value="Delete">
    </div>`

    todosUISelectors.confirmNotif.appendChild(notificationEl)
  }

  const hasClassName = function (e, elsClasslist) {
    array = [e.target.classList.value]

    if (array.some((className) => elsClasslist.indexOf(className) !== -1)) {
      return true
    } else {
      return false
    }
  }

  const hideTodos = function () {
    const visibleItems = getVisibleItems()

    if (visibleItems.length === 0) {
      itemList.style.visibility = 'hidden'
    } else {
      itemList.style.visibility = 'visible'
    }
  }

  const getVisibleItems = function () {
    let visible = []

    const items = itemList.querySelectorAll('.row')

    items.forEach((item) => {
      if (item.style.display == 'flex' || item.style.display == '') {
        visible.push(item)
      }
    })

    return visible
  }

  const getCurrentTodos = function () {
    const resultsEl = todosUISelectors.filterResults

    const filteredTodos = ItemCtrl.getFilteredItems()

    let currentTodos

    if (filteredTodos.length === 0 && resultsEl.style.display === 'none') {
      currentTodos = itemList.querySelectorAll('.row')
    } else {
      currentTodos = filteredTodos
    }

    return currentTodos
  }

  const setVisibleItems = function () {
    const visibleTodos = getVisibleItems()
    ItemCtrl.setVisibleItems(visibleTodos)
  }

  const changeColor = function (btnEl) {
    btnEl.parentElement.querySelectorAll('button').forEach((btn) => {
      btn.style.color = 'rgb(166, 172, 175)'
    })
    btnEl.style.color = 'rgb(22, 160, 133)'
  }

  const updateFilterResults = function (items) {
    text = todosUISelectors.filter.value

    const resultsEl = todosUISelectors.filterResults
    const matches = resultsEl.querySelector('.matches')

    resultsEl.style.display = 'block'

    let matchesFound = 0

    if (text === '') {
      resultsEl.style.display = 'none'
    } else {
      items.forEach(function (todo) {
        const item = todo.querySelector('.todo-text').value

        if (item.toLowerCase().indexOf(text) !== -1) {
          matchesFound++
        }
      })
    }

    matches.textContent = matchesFound
  }

  const activeFilter = function (text) {
    const visibleItems = ItemCtrl.getVisibleItems()
    updateFilterResults(visibleItems)

    if (text === '') {
      document
        .querySelectorAll('.todos-row')
        .forEach((todo) => (todo.style.display = 'flex'))
    } else {
      todosUISelectors.clearFilterBtn.classList.add('show-clear-btn')
      visibleItems.forEach(function (todo) {
        const item = todo.querySelector('.todo-text').value

        if (item.toLowerCase().indexOf(text) !== -1) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
      })
    }

    hideTodos()
  }

  const setFilteredItems = function () {
    const filteredTodos = getVisibleItems()
    ItemCtrl.setFilteredItems(filteredTodos)
  }

  const setFilterBlur = function (textField) {
    textField.parentElement.classList.remove('focus-input')
    todosUISelectors.filterResults.style.display = 'none'
    document.querySelectorAll('.todos-row').forEach(function (todo) {
      todo.style.display = 'flex'
    })
    ItemCtrl.resetFilteredItems()
    hideTodos()
  }

  //Public methods
  return {
    populateItemList: function (items) {
      items.forEach(function (item) {
        const li = document.createElement('li')
        li.setAttribute('id', `item-${item.id}`)
        li.classList.add('todos-row', 'row')

        li.innerHTML = `
        <div class="priority-icon ">
        ${item.icon}
        </div>
        <input type='text' id = "todo-text" class="todo-text" disabled="disabled" />
        <label></label>
        <div class="${item.bookmark}"><div class="bookmark"></div></div>
        <input type="checkbox" class="completed-checkbox" />
        <div id="menu-wrap">
          <input type="checkbox" id="toggler" class="toggler" />
          <div class="dots"><div></div></div>
          <div class="menu">
            <ul class="menu-actions">
              <li class="priority">
                Priority
                <div class="priority-btns">
                  <button class="high" onclick="func(event)"></button>
                  <button class="medium" onclick="func(event)"></button>
                  <button class="low" onclick="func(event)"></button>
                </div>
              </li>
              <li>
                <button class="edit-todo" onclick="func(event)">
                  Edit todo
                  <i class="far fa-edit"></i>
                </button>
              </li>
              <li>
                <button class="add-note" onclick="func(event)">
                  Add/Edit note
                  <i class="far fa-edit"></i>
                </button>
              </li>
              <li>
                <button class="delete" onclick="func(event)">
                  Delete
                  <i class="far fa-trash-alt"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div id="note" class="note close">
          <div class="note-container close">
            <label for="note-area"></label>
            <textarea
              name="note-area"
              class="note-area"
              rows="4"
              placeholder="Add note..."
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            >${item.note}</textarea>

            <button class="close-note" onclick="func(event)">
              <i class="fas fa-times"></i>
            </button>

            <div class="note-btn">
              <input type="button" value="Add note" class="add-note-btn" />
              <input type="button" value="Delete note" class="delete-note-btn" />
            </div>
          </div>
        </div>`

        if (item.icon.indexOf('light-color') === -1) {
          li.querySelector('.priority-icon').classList.add('cursor-active')
        }

        isCompleted(item.completed, li)

        li.querySelector('.todo-text').value = `${item.todo}`
        itemList.appendChild(li)
      })
    },

    removeIcon: function (e) {
      const priorIcon = e.target.closest('.row').children[0]

      priorIcon.innerHTML = '<i class="fas fa-arrow-right light-color" ></i>'
      priorIcon.classList.remove('cursor-active')

      return priorIcon.innerHTML
    },

    fadeCompleted: function (e) {
      if (e.target.classList.contains('completed-checkbox')) {
        const todoText = e.target.parentElement.children[1]
        if (e.target.checked) {
          todoText.classList.add('completed')
        } else {
          todoText.classList.remove('completed')
        }
      }
    },

    showEditTodoState: function (todoInput) {
      todoInput.removeAttribute('disabled')
      todoInput.focus()
      todoInput.parentElement.classList.add('focus')
      todoInput.parentElement.querySelector('.toggler').checked = false
    },

    updateTodo: function (todoInput) {
      todoInput.blur()
      todoInput.setAttribute('disabled', 'disabled')
      todoInput.parentElement.classList.remove('focus')
    },

    deleteTodoClick: function (e) {
      e.target.closest('.menu').parentElement.firstElementChild.checked = false
      createNotification('Are you sure to delete the todo?')
      document.querySelector('.confirm-delete').classList.add('delete-todo')
    },

    cancelDelete: function (e) {
      const boxNotification = document.querySelector('.notification-box')

      boxNotification.classList.remove('fadein')
      boxNotification.classList.add('fadeout')

      setTimeout(() => boxNotification.remove(), 300)
    },

    deleteTodo: function (e, itemToDelete) {
      const boxNotification = document.querySelector('.notification-box')

      boxNotification.classList.remove('fadein')
      boxNotification.classList.add('fadeout')

      setTimeout(() => boxNotification.remove(), 300)

      itemToDelete.remove()

      if (itemList.innerHTML === '') {
        itemList.style.visibility = 'hidden'
      }
    },

    showTotTodosLeft: function (todosLeft) {
      todosUISelectors.totTodosLeft.textContent = todosLeft
    },

    blurFilterInput: function (e) {
      if (e.target.value === '') {
        setFilterBlur()
      }
      if (todosUISelectors.filter.value === '') {
        ItemCtrl.resetVisibleItems()
      }
    },

    focusFilterInput: function (e) {
      if (todosUISelectors.filter.value === '') {
        setVisibleItems()
      }
      FormUICtrl.focusInput(e)
    },

    filterTodos: function (e) {
      const text = e.target.value.toLowerCase()
      activeFilter(text)
      setFilteredItems()
    },

    clearFilter: function () {
      todosUISelectors.filter.value = ''
      todosUISelectors.clearFilterBtn.classList.remove('show-clear-btn')
      setFilterBlur(todosUISelectors.filter)
      hideTodos()
    },

    showCompletedTodos: function () {
      const currentTodos = getCurrentTodos()
      currentTodos.forEach((todo) => {
        const checkbox = todo.querySelector('.completed-checkbox')
        if (checkbox.checked === false) {
          todo.style.display = 'none'
        } else {
          todo.style.display = 'flex'
        }
      })
      changeColor(todosUISelectors.filterCompleted)

      const visibleItems = getVisibleItems()
      updateFilterResults(visibleItems)
      hideTodos()
    },

    showAllTodos: function () {
      const currentTodos = getCurrentTodos()

      currentTodos.forEach((todo) => {
        const checkbox = todo.querySelector('.completed-checkbox')
        if (checkbox.checked === false) {
          todo.style.display = 'flex'
        }
      })
      changeColor(todosUISelectors.filterAll)

      const visibleItems = getVisibleItems()
      updateFilterResults(visibleItems)
      hideTodos()
    },

    clearCompetedTodos: function () {
      const todorows = itemList.querySelectorAll('.row')
      let todosCompletedIds = []
      todorows.forEach((todorow) => {
        const checkbox = todorow.querySelector('.completed-checkbox')
        if (checkbox.checked) {
          todorow.remove()
          todosCompletedIds.push(todorow.id)
        }
      })

      changeColor(todosUISelectors.clearCompleted)
      hideTodos()

      return todosCompletedIds
    },

    closeMenuIfOutside: function (e) {
      const togglers = document.querySelectorAll('#toggler')

      menuElsClassList = [
        'menu',
        'menu-actions',
        'priority',
        'high',
        'medium',
        'low',
        'toggler',
      ]

      if (hasClassName(e, menuElsClassList) === false) {
        togglers.forEach((toggle) => {
          if (toggle.checked === true) {
            toggle.checked = false
          }
        })
      }

      if (e.target.classList.contains('toggler')) {
        togglers.forEach((toggle) => {
          if (toggle.contains(e.target)) {
          } else {
            toggle.checked = false
          }
        })
      }
    },

    closeNotificationIfOutside: function (e) {
      notifElsClassList = [
        'notification-box',
        'notif-icon',
        'content',
        'confirm-delete',
        'cancel-delete',
        'delete',
        'delete-note-btn',
      ]
      if (hasClassName(e, notifElsClassList) === false) {
        if (todosUISelectors.confirmNotif.innerHTML !== '') {
          const boxNotification = document.querySelector('.notification-box')

          boxNotification.classList.remove('fadein')
          boxNotification.classList.add('fadeout')

          setTimeout(() => boxNotification.remove(), 300)
        }
      }
    },

    getCreateNotification: function (msg) {
      return createNotification(msg)
    },

    getSelectors: function () {
      return todosUISelectors
    },

    getHasClassName: function () {
      return hasClassName
    },
  }
})()

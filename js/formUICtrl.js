//Form UI controller
const FormUICtrl = (function () {
  const form = document.getElementById('todo-form')
  const formUISelectors = {
    appInfo: document.querySelector('.info-content'),
    infoToggle: document.querySelector('.toggle-info-btn'),
    demoBtn: document.querySelector('.demo-btn'),
    closeDemoBtn: document.querySelector('.close-demo-btn'),
    demoPopUp: document.getElementById('demo-pop-up'),
    video: document.getElementById('demo'),
    todoInput: form.querySelector('#todo'),
    addTodoBtn: form.querySelector('.btn-add'),
    noteArea: form.querySelector('.note-area'),
    priorityIcon: form.querySelector('.priority-icon'),
    bookmark: form.querySelector('.bookmark-container'),
  }

  const setVideoSrc = function (video) {
    const mediaMobile = window.matchMedia('(max-width: 500px')

    if (mediaMobile.matches) {
      video
        .querySelector('source')
        .setAttribute(
          'src',
          'https://rosgas.github.io/vanillajs-todo-list/assets/videos/demo-rec-mobile.mp4',
        )
    } else {
      video
        .querySelector('source')
        .setAttribute(
          'src',
          'https://rosgas.github.io/vanillajs-todo-list/assets/videos/demo-rec.mp4',
        )
    }

    video.load()
  }

  //Public methods
  return {
    setInfoHeight: function () {
      const infoHeight = formUISelectors.appInfo.offsetHeight + 'px'
      formUISelectors.appInfo.style.height = infoHeight
      formUISelectors.appInfo.style.height = '0'
      return infoHeight
    },

    openAppInfo: function () {
      const appInfo = formUISelectors.appInfo

      appInfo.classList.toggle('open')

      if (appInfo.classList.contains('open')) {
        appInfo.style.height = infoHeight
      } else {
        appInfo.style.height = '0'
      }
    },

    showDemo: function () {
      setVideoSrc(formUISelectors.video)
      if (formUISelectors.demoPopUp.classList.contains('hide-demo')) {
        formUISelectors.demoPopUp.classList.remove('hide-demo')
      }
      formUISelectors.demoPopUp.classList.add('show-demo')

      formUISelectors.video.play()
    },

    closeDemo: function () {
      if (formUISelectors.demoPopUp.classList.contains('show-demo')) {
        formUISelectors.demoPopUp.classList.remove('show-demo')
      }
      formUISelectors.demoPopUp.classList.add('hide-demo')

      formUISelectors.video.pause()
    },

    //Get item input from the form
    getItemInput: function () {
      return {
        todo: formUISelectors.todoInput.value.trim(),
        note: formUISelectors.noteArea.value,
        priorityIcon: formUISelectors.priorityIcon.innerHTML,
        bookmark: formUISelectors.bookmark.classList.value,
      }
    },

    addListItem: function (item) {
      const itemList = document.querySelector('.todos')
      const li = document.createElement('li')
      li.classList.add('todos-row', 'row')
      li.setAttribute('id', `item-${item.id}`)

      li.innerHTML = `
      <div class="priority-icon ">
      ${item.icon}
      </div>
      <input type='text' class="todo-text" disabled="disabled"/>
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

      li.querySelector('.todo-text').value = `${item.todo}`

      if (item.icon === '') {
        item.icon =
          '<i class="fas fa-arrow-right light-color" aria-hidden= "true" ></i>'
        li.querySelector('.priority-icon').innerHTML =
          '<i class="fas fa-arrow-right light-color" aria-hidden= "true" ></i>'
      } else {
        li.querySelector('.priority-icon').classList.add('cursor-active')
      }

      itemList.style.visibility = 'visible'
      itemList.appendChild(li)
    },

    activesAddTodoBtn: function (e) {
      const formUISelectors = FormUICtrl.getSelectors()
      const input = FormUICtrl.getItemInput()

      if (input.todo.trim() !== '') {
        formUISelectors.addTodoBtn.classList.add('active-btn')
      } else {
        formUISelectors.addTodoBtn.classList.remove('active-btn')
      }
    },

    clearInput: function () {
      formUISelectors.todoInput.value = ''
      formUISelectors.todoInput.parentElement.classList.remove('focus-input')

      formUISelectors.todoInput.parentElement.children[3].classList.remove(
        'visible',
      )
      formUISelectors.addTodoBtn.classList.remove('active-btn')

      formUISelectors.noteArea.value = ''

      formUISelectors.priorityIcon.innerHTML = ''
      formUISelectors.priorityIcon.style.display = 'none'
    },

    blurInput: function (e) {
      if (
        e.target.value === '' &&
        e.target.parentElement.children[0].innerHTML === ''
      ) {
        e.target.parentElement.classList.remove('focus-input')
      }
    },

    focusInput: function (e) {
      if (e.target.value === '') {
        e.target.parentElement.classList.add('focus-input')
      }
      if (e.target.classList.contains('todo') && e.target.value === '') {
        e.target.parentElement.querySelector('.toggler').checked = false
        e.target.parentElement.querySelector('.note').classList.add('close')
      }
      if (e.target.classList.contains('todo')) {
        TodosUICtrl.getSelectors().filter.value = ''
        TodosUICtrl.getSetFilterBlur()
        ItemCtrl.resetVisibleItems()
      }
    },

    addPriorityIcon: function (e) {
      const priorIcon = e.target.closest('.row').children[0]
      const todoInput = e.target.closest('.row').children[1]

      priorIcon.innerHTML = ''
      priorIcon.style.display = 'block'
      priorIcon.classList.add('cursor-active')
      const icon = document.createElement('div')

      icon.style.cursor = 'pointer'

      if (todoInput.value === '') {
        todoInput.parentElement.classList.add('focus-input')
      }

      if (
        e.target.classList.contains('high') ||
        e.target.parentElement.classList.contains('high')
      ) {
        icon.innerHTML = `<i class="fas fa-arrow-up high-priority-color "></i>`

        priorIcon.appendChild(icon)
      }

      if (
        e.target.classList.contains('medium') ||
        e.target.parentElement.classList.contains('medium')
      ) {
        icon.innerHTML = `<i class="fas fa-grip-lines medium-priority-color "></i>`
        priorIcon.appendChild(icon)
      }

      if (
        e.target.classList.contains('low') ||
        e.target.parentElement.classList.contains('low')
      ) {
        icon.innerHTML = `<i class="fas fa-arrow-down low-priority-color "></i>`
        priorIcon.appendChild(icon)
      }
      return priorIcon.innerHTML
    },

    removeIcon: function (e) {
      const todoInput = e.target.closest('.priority-icon').nextElementSibling
      const priorIcon = e.target.closest('.row').children[0]

      priorIcon.firstElementChild.remove()
      priorIcon.style.display = 'none'

      if (todoInput.value === '') {
        todoInput.parentElement.classList.remove('focus-input')
      }
    },

    getSelectors: function () {
      return formUISelectors
    },
  }
})()

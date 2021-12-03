//Item controller
const ItemCtrl = (function () {
  //Item constructor
  const Item = function (id, todo, note, icon, bookmark, completed) {
    this.id = id
    this.todo = todo
    this.note = note
    this.icon = icon
    this.bookmark = bookmark
    this.completed = completed
  }

  //Data structure
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    visibleItems: [],
    filteredItems: [],
    todosLeft: 0,
  }

  //Public methods
  return {
    getItems: function () {
      return data.items
    },

    addItem: function (todo, note, icon, bookmark) {
      StorageCtrl.assignItemId()
      let completed = false

      newItem = new Item(id, todo, note, icon, bookmark, completed)

      data.items.push(newItem)

      return newItem
    },

    hasCurrentItem: function () {
      let found
      if (data.currentItem !== null) {
        found = true
      } else {
        found = false
      }
      return found
    },

    getCurrentItemId: function () {
      const currentItemId = data.currentItem.id
      return currentItemId
    },

    getItemById: function (id) {
      let found = null
      data.items.forEach(function (item) {
        if (id === item.id) {
          found = item
        }
      })
      return found
    },

    updateIcon: function (updatedIcon) {
      let found = null
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.icon = updatedIcon
          found = item
        }
      })
      return found
    },

    updateTodo: function (updatedTodo) {
      let found = null
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.todo = updatedTodo
          found = item
        }
      })
      return found
    },

    updateItem: function (updatedTodo, updatedNote, updatedBookmark) {
      let found
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.todo = updatedTodo
          item.note = updatedNote
          item.bookmark = updatedBookmark
          found = item
        }
      })
      return found
    },

    deleteCurrentItem: function () {
      data.items.forEach(function (item, index) {
        if (item.id === data.currentItem.id) {
          data.items.splice(index, 1)
        }
      })
      data.currentItem = null
    },

    setVisibleItems: function (visibleTodos) {
      data.visibleItems = visibleTodos
    },

    getVisibleItems: function () {
      return data.visibleItems
    },

    resetVisibleItems: function () {
      if (data.visibleItems !== []) {
        data.visibleItems = []
      }
    },

    setFilteredItems: function (filteredTodos) {
      data.filteredItems = filteredTodos
    },

    getFilteredItems: function () {
      return data.filteredItems
    },

    resetFilteredItems: function () {
      if (data.filteredItems !== []) {
        data.filteredItems = []
      }
    },

    addNote: function (noteText) {
      let found
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.note = noteText
          item.bookmark = 'bookmark-container visible'
          found = item
        }
      })
      return found
    },

    deleteNote: function () {
      let found = null
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.note = ''
          item.bookmark = 'bookmark-container'
          found = item
        }
      })
      return found
    },

    updateCompleted: function (isCompleted) {
      let found
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.completed = isCompleted
          found = item
        }
      })
      return found
    },

    setCurrentItem: function (item) {
      data.currentItem = item
      return item
    },

    resetCurrentItem: function (item) {
      data.currentItem = null
    },

    clearCompletedItems(completedItemIds) {
      completedItemIds.forEach(function (completedItemId) {
        data.items.forEach(function (item, index) {
          if (item.id === completedItemId) {
            data.items.splice(index, 1)
          }
        })
      })
    },

    getTodosLeft: function () {
      let totalLeft = 0

      data.items.forEach(function (item) {
        if (item.completed === false) {
          totalLeft++
        }
      })

      data.todosLeft = totalLeft
      return data.todosLeft
    },

    logData: function () {
      return data
    },
  }
})()

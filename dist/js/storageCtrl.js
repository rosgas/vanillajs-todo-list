//Storage controller
const StorageCtrl = (function () {
  return {
    storeItem: function (item) {
      let items

      if (localStorage.getItem('items') === null) {
        items = []
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
      } else {
        items = JSON.parse(localStorage.getItem('items'))
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
      }
    },
    getItemsFromStorage: function () {
      let items

      if (localStorage.getItem('items') === null) {
        items = []
      } else {
        items = JSON.parse(localStorage.getItem('items'))
      }

      return items
    },
    updateItemStored: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'))

      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem)
        }
      })

      localStorage.setItem('items', JSON.stringify(items))
    },
    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem('items'))

      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1)
        }
      })

      localStorage.setItem('items', JSON.stringify(items))
    },
    assignItemId: function () {
      if (localStorage.getItem('id') === null) {
        localStorage.setItem('id', '0')
        id = 0
      } else {
        id_value = localStorage.getItem('id')
        id_value++
        id = id_value
        localStorage.setItem('id', id_value)
      }
      return id
    },

    resetIdsStorage: function () {
      const items = StorageCtrl.getItemsFromStorage()

      if (items.length === 0) {
        localStorage.setItem('id', '0')
      }
    },
  }
})()

<template>
    <div class="organiser-container row">
      <BoxContainer @boxSelected="boxSelected" @itemMoved="itemMoved"
        @addBox="addBox" @remove="remove" @editBox="editBox" @editMode="editMode"
        :boxes="boxes" :selectedBox="selectedBox" :error="error" :edit="edit" />
      <itemContainer :selectedBox="selectedBox" :items="items" :edit="edit"
        @addItem="addItem" @remove="remove" />
    </div>
</template>

<script>
import BoxContainer from './BoxContainer'
import ItemContainer from './ItemContainer'
import { newID } from '../utils'

export default {
  name: 'Organiser',
  components: {
    BoxContainer,
    ItemContainer
  },
  data () {
    return {
      error: false,
      edit: null,
      selectedBox: null,
      boxes: [
        { id: newID(), name: 'Kitchen' },
        { id: newID(), name: 'Living Room' },
        { id: newID(), name: 'Bathroom' },
        { id: newID(), name: 'Porch' }
      ],
      items: [
        { id: newID(), box: '1', name: 'Spoon' },
        { id: newID(), box: '1', name: 'Knife' },
        { id: newID(), box: '1', name: 'Fork' },
        { id: newID(), box: '1', name: 'Plate' }
      ]
    }
  },
  methods: {
    boxSelected (id) {
      this.selectedBox = id
      if (this.edit) { this.edit = null }
    },
    itemMoved (data) {
      const i = this.items.findIndex(item => item.id === data.itemID)
      this.items[i].box = data.boxId
    },
    addItem (name, box) {
      this.items.push({ id: newID(), name: name, box: box })
    },
    addBox (name) {
      if (!~this.boxes.findIndex(box => box.name === name)) {
        const id = newID()
        this.boxes.push({ id: id, name: name })
        this.boxSelected(id)
      } else {
        this.error = true
        setTimeout(() => { this.error = false }, 2000)
      }
    },
    editBox (name, id) {
      this.boxes = this.boxes.map(box => {
        if (box.id === id) { box.name = name }
        return box
      })
    },
    remove (entity, id) {
      this[entity].splice(this[entity].findIndex(entity => entity.id === id), 1)
    },
    editMode (id) {
      this.edit = id
      if (id) { this.selectedBox = id }
    }
  }
}
</script>

<style>
.alert {
  position: absolute;
  right: 10px;
  left: 10px;
  top: 20%;
  transform: translateY(-50%);
}

.organiser-container {
  margin: auto;
  max-width: 650px;
  padding: 5px;
}

.entity {
  border: 1px solid black;
  max-height: 75vh;
  min-height: 50vh;
  max-width: 300px;
  overflow-y: auto;
  padding: 8px;
  margin: auto;
}

input.add {
  text-align: center;
  margin-bottom: 4px;
  width: 100%;
  height: 26px;
}

input.edit {
  height: 24px;
  width: 100%;
  border: none;
  text-align: center;
  padding: 0;
  background-color: yellow;
}

.entity ul {
  padding: 0;
}

.entity li {
  list-style-type: none;
  margin-bottom: 4px;
  cursor: pointer;
  border: 1px solid lightgray;
  position: relative;
  user-select: none;
}
.selected {
  background-color: orangered;
  color: white;
}

.close-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  display: none;
}

.selected .close-icon {
  display: block;
}
</style>

<template>
  <div class="entity col-sm">
    <div v-if="selectedBox">
      <input class="add" v-on:keyup="addItem" placeholder="Add Item" />
      <ul>
        <li draggable="true" v-for="item in items" :key="item.id"
          v-if="item.box === selectedBox" @dragstart="itemDrag(item.id, $event)"
          @mouseleave.self="itemUnhovered"  @mouseover.self="itemHovered" >

          {{ item.name }}

          <span class="close-icon" @click="deleteItem(item.id)">Delete</span>

        </li>
      </ul>
    </div>
    <div v-else class="alert alert-info">Select a box to begin.</div>
  </div>
</template>

<script>

import Vue from 'vue'
import { formatStr } from '../utils'

export default {
  name: 'ItemContainer',
  props: [ 'selectedBox', 'items', 'edit' ],
  watch: {
    selectedBox: function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== null && !this.edit) {
        Vue.nextTick(() => { this.$el.querySelector('input.add').focus() }, 0)
      }
    }
  },
  data () {
    return {
      noBox: false
    }
  },
  methods: {
    itemHovered (e) {
      e.target.classList.add('selected')
    },
    itemUnhovered (e) {
      e.target.classList.remove('selected')
    },
    addItem (e) {
      if (e.which === 13 && e.target.value) {
        this.$emit('addItem', formatStr(e.target.value), this.selectedBox)
        e.target.value = ''
      }
    },
    deleteItem (id) {
      this.$emit('remove', 'items', id)
    },
    itemDrag (id, e) {
      e.dataTransfer.setData('itemId', id)
    }
  }
}
</script>

<style scoped>

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

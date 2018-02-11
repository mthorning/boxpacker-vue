<template>
  <div class="entity col-sm">
    <div v-if="error" class="alert alert-danger">
      A box with this name already exists
    </div>
    <div v-else>
      <input class="add" autofocus @keyup="inputMade($event, 'add')"
        placeholder="Add Box" />
      <ul>
        <li @click.stop="clickHandle(box.id)" v-for="box in boxes"
           :key="box.id" @drop="itemDropped" @dragover.prevent
          :class="box.id === selectedBox ? 'selected' : '' " >
          <input class="edit" v-if="edit === box.id" :value="box.name"
            @keyup.prevent="inputMade($event, 'edit', box.id)" @blur="blurHandle" >
          <div :id="box.id" v-else >
            {{ box.name }}
          </div>
          <span class="close-icon" @click="deleteBox(box.id)" >Delete</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import { formatStr } from '../utils'

export default {
  name: 'BoxContainer',
  data () {
    return {
      clicks: 0
    }
  },
  props: [ 'boxes', 'selectedBox', 'error', 'edit' ],
  watch: {
    error: function (newVal, oldVal) {
      if (!newVal) {
        Vue.nextTick(() => { this.$el.querySelector('input.add').focus() })
      }
    },
    edit: function (newVal, oldVal) {
      if (this.boxes.find(box => box.id === newVal)) {
        Vue.nextTick(() => { this.$el.querySelector('input.edit').focus() })
      }
    }
  },
  methods: {
    clickHandle (id) {
      this.clicks++
      if (this.clicks === 1 && !this.edit) {
        this.timer = setTimeout(() => {
          this.$emit('boxSelected', id === this.selectedBox ? null : id)
          this.clicks = 0
        }, 250)
      } else {
        clearTimeout(this.timer)
        this.clicks = 0
        this.$emit('editMode', id)
      }
    },
    blurHandle () {
      if (this.edit) { this.$emit('editMode', null) }
    },
    removeSelectedClass () {
      this.$el.querySelectorAll('li').forEach(li => {
        li.classList.remove('selected')
      })
    },
    inputMade (e, type, id) {
      if (e.which === 13 && e.target.value) {
        this.$emit(type + 'Box', formatStr(e.target.value), id)
        this.$emit('editMode', null)
        e.target.value = ''
      }
    },
    deleteBox (id) {
      this.$emit('remove', 'boxes', id)
    },
    itemDropped (e) {
      this.$emit('itemMoved', {
        itemID: e.dataTransfer.getData('itemId'),
        boxId: e.target.id
      })
    }
  }
}
</script>

<style scoped>

</style>

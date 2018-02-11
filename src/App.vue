<template>
  <div class="container-fluid" id="app">
    <organiser />
  </div>
</template>

<script>
import Organiser from './components/Organiser'

export default {
  name: 'App',
  components: {
    Organiser
  }
}
</script>

<style>
body {
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

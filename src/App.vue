<template>
  <div class="wrapper">
    <rubrics-tree/>
  </div>
</template>

<script>
import RubricsTree from './components/RubricsTree.vue'

export default {
  name: 'App',
  components: {
    RubricsTree
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
}
</style>

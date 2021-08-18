<template>
<div class="error">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "Error"
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 18px;
  text-align: center;
  border: red 1px solid;
  border-radius: 5px;
  padding: 10px;
}
</style>
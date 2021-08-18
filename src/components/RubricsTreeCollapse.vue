<template>
  <span :class="{toggle: isFolder}" @click.stop="toggle">
    <span v-if="isFolder && !$_isOpen" class="material-icons md-18">add_box</span>
    <span v-if="isFolder && $_isOpen" class="material-icons md-18">indeterminate_check_box</span>
  </span>

  <span :class="{toggle: isFolder}">
      <slot name="title"></slot>
  </span>

  <div v-show="$_isOpen">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RubricsTreeCollapse",
  props: {
    isFolder: Boolean,
    isOpen: Boolean,
  },
  data() {
    return {
      $_isOpen: this.isOpen || false,
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.$_isOpen = !this.$_isOpen;
      }
    },
  }
}
</script>

<style scoped>
.toggle {
  user-select: none;
  font-weight: bold;
}

.toggle :hover {
  cursor: pointer;
}

.material-icons.md-18 {
  font-size: 18px;
  vertical-align: text-bottom;
}
</style>
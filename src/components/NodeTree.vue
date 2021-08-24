<template>
  <li class="node-tree">
    <input :id="node.id" type="checkbox" v-model="checked" @change="onChange"/>

    <rubrics-tree-collapse :isFolder="Boolean(isFolder)" :isOpen="true">

      <template v-slot:title>
        <a class="label" :href="url" @click.prevent :title="url">{{ node.title }}</a>
        <label :for="node.id">
          <span>({{ node.count }})</span> <span v-if="isFolder"> ({{ sumBranchCounts }})</span>
        </label>
      </template>

      <ul v-if="isFolder">
        <node v-for="(child, index) in node.children"
              :node="child"
              :index="index"
              :key="child.id"
              @upSelfCount="collectCount"
              @upSums="$emit('upSums', $event)"
        />
      </ul>
    </rubrics-tree-collapse>

  </li>
</template>

<script>
import RubricsTreeCollapse from "@/components/RubricsTreeCollapse";
import {sumOfArrayElements} from "@/utils/utils";

export default {
  name: "node",

  components: {
    RubricsTreeCollapse,
  },

  props: {
    node: Object,
    index: Number,
    topBranchIndex: Number,
    isTopBranch: Boolean,
  },

  data() {
    return {
      checked: true,
      childrenCounts: [],
      baseURL: 'https://www.example.ru'
    }
  },

  computed: {
    isFolder() {
      return this.node.children && this.node.children.length;
    },

    sumBranchCounts() {
      return sumOfArrayElements(this.childrenCounts) + this.node.count
    },

    itemChildrenCounts() {
      return this.sumBranchCounts * (+this.checked)
    },

    url() {
      return new URL(this.node.url, this.baseURL)
    }
  },

  methods: {
    emitter(isMounted = true) {
      if (isMounted) {
        !this.isTopBranch && this.$emit('upSelfCount', this.itemChildrenCounts, this.index)
        this.isTopBranch && !this.node.children.length && this.$emit('upSums', this.itemChildrenCounts, this.topBranchIndex)
      } else {
        !this.isTopBranch && this.$emit('upSelfCount', this.itemChildrenCounts, this.index)
        this.isTopBranch && this.$emit('upSums', this.itemChildrenCounts, this.topBranchIndex)
      }
    },

    onChange() {
      this.emitter(false)
    },

    collectCount(count, index) {
      this.childrenCounts[index] = count
    },
  },

  mounted() {
    this.emitter()
  },

  watch: {
    sumBranchCounts() {
      this.onChange()
    }
  }
}
</script>

<style scoped>

</style>
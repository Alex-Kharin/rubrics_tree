<template>
  <Error v-if="error">{{ error.name }}: {{ error.message }}</Error>

  <p>Total checked count:
    <span class="total-count"> {{ totalSum }}</span>
  </p>

  <div v-if="!isFetching">
    <span>Rubrics Tree: </span>
    <rubrics-tree-collapse :isFolder="true" :isOpen="true">
      <ul class="tree-list">
        <NodeTree v-for="(item, index) in treeData"
                  :node="item"
                  :topBranchIndex="index"
                  :isTopBranch="true"
                  :key="item.id"
                  @upSums="collectSums"
        />
      </ul>
    </rubrics-tree-collapse>
  </div>

  <div v-else>Loading...</div>
</template>

<script>
import NodeTree from "@/components/NodeTree"
import RubricsTreeCollapse from "@/components/RubricsTreeCollapse";
import Error from "@/components/Error";
import {sumOfArrayElements} from "@/utils/utils";
import {jsonServerApi} from "@/api/api";

export default {
  name: 'RubricsTree',
  components: {
    RubricsTreeCollapse,
    NodeTree,
    Error
  },

  data() {
    return {
      treeData: null,
      sums: [],
      isFetching: false,
      error: null,
    }
  },

  computed: {
    totalSum() {
      return sumOfArrayElements(this.sums)
    }
  },

  mounted() {
    this.fetchTree()
  },

  methods: {
    collectSums(sum, index) {
      this.sums[index] = sum
    },

    async fetchTree(endPoint = 'data1') {
      try {
        this.isFetching = true
        this.treeData = await jsonServerApi.getData(endPoint)
      } catch (error) {
        this.error = error
      } finally {
        this.isFetching = false
      }
    }
  },

}
</script>

<style>
.total-count {
  font-weight: bold;
  font-size: 24px;
}

a {
  color: #000000;
}
</style>

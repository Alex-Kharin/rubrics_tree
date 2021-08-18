<template>
  <Error v-if="error">{{ error.name }}:{{ error.message }}</Error>
  <Error v-if="error">load data from another server.</Error>
    <p>
    <span>
      Show empty rubrics ?:
      <input class="largerCheckbox" type="checkbox" v-model="allowEmpty" @change="onChange"/>
    </span>
    </p>

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
import {jsonServerApi, klerkApi} from "@/api/api";

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
      allowEmpty: false,
      isFetching: false,
      error: null,
      isFetchError: true,
    }
  },

  computed: {
    totalSum() {
      return sumOfArrayElements(this.sums)
    }
  },

  mounted() {
    this.fetchTree(klerkApi, 'getRubrics')
  },

  methods: {
    collectSums(sum, index) {
      this.sums[index] = sum
    },

    onChange() {
      this.sums = []
      this.fetchTree(klerkApi, 'getRubrics', this.allowEmpty)
    },

    async fetchTree(api, getMethod, allowEmpty, url) {
      try {
        this.isFetching = true
        this.treeData = !allowEmpty ? await api[getMethod](url) : await api[getMethod](Number(allowEmpty))
      } catch (error) {
        this.error = error
        this.isFetchError && await this.fetchTree(jsonServerApi, 'getData', undefined, 'data1')
      } finally {
        this.isFetchError = false
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

.largerCheckbox {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

a {
  color: #000000;
}
</style>

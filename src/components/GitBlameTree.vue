<template>
  <div class="git-tree">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <div class="git-tree-header"> Path: {{ formatTreePath(treepath) }}</div>
      <div class="git-tree-list">
        <div class="git-tree-entry" v-for="(entry, index) in treeEntries" :key="index">
          <TreeEntry :entry="entry" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TreeEntry from '@/components/TreeEntry.vue'
export default {
  name: 'GitBlameTree',
  props: {
    username: {
      type: String,
      required: true,
    },
    reponame: {
      type: String,
      required: true,
    },
    treepath: {
      type: [String, Array],
      required: true,
    },
  },
  components: { TreeEntry },
  data() {
    return {
      isLoaded: false,
      treeEntries: [],
    };
  },

  created() {
    this.fetchData();
  },
  methods: {
    formatTreePath(x) {
      if (Array.isArray(x)) {
        // 是字符串数组,则调用 join 方法返回字符串
        return x.join('/')
      } else {
        // 直接返回字符串
        return x
      }
    },

    fetchData() {
      axios
        .get(`/api/v2/${this.username}/${this.reponame}/tree`, {
          params: { path: this.formatTreePath(this.treepath) },
        })
        .then((response) => {
          this.isLoaded = true;
          this.treeEntries = response.data.tree_entries;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.git-tree {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.git-tree-header {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}

.git-tree-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.git-tree-entry {
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 0;
}
</style>
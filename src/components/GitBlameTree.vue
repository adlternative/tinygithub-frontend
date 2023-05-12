<template>
  <div class="git-tree">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <div class="git-tree-header"> {{ treepath }}</div>
      <div class="git-tree-list">
        <div class="git-tree-entry" v-for="(entry, index) in treeEntries" :key="index">
          <div class="git-tree-path">{{ entry.path }}</div>
          <div class="git-tree-message-header">{{ entry.last_commit.header }}</div>
          <div class="git-tree-date">{{ entry.last_commit.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      type: String,
      required: true,
    },
  },
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
    fetchData() {
      axios
        .get(`/api/v2/${this.username}/${this.reponame}/tree`, {
          params: { path: this.treepath },
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
  gap: 20px;
}

.git-tree-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.git-tree-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.git-tree-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 1.5;
}

.git-tree-path {
  flex: 1;
  text-align: left;
  margin-right: 10px;
  overflow: hidden; /* 控制文本溢出 */
  white-space: nowrap; /* 控制文本不换行 */
  text-overflow: ellipsis; /* 当文本溢出时，显示省略号 */
}

.git-tree-message-header {
  flex: 1;
  text-align: left;
  overflow: hidden; /* 控制文本溢出 */
  white-space: nowrap; /* 控制文本不换行 */
  text-overflow: ellipsis; /* 当文本溢出时，显示省略号 */
}

.git-tree-date {
  flex: 1;
  text-align: right;
  margin-left: 10px;
}
</style>
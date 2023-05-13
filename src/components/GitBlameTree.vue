<template>
  <div class="git-tree">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <div class="git-tree-header"> Path: {{ formatTreePath(treepath) }}</div>
      <div class="git-tree-list">
        <div class="git-tree-entry" v-for="(entry, index) in treeEntries" :key="index">
          <TreeEntry :entry="entry" :username="username" :reponame="reponame" :basetreepath="treepath" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
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
    this.$watch(
      () => this.treepath,
      () => {
        this.fetchData()
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    )
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

      this.isLoaded = false;

      axios
        .get(`/api/v2/${this.username}/${this.reponame}/tree`, {
          params: { path: this.formatTreePath(this.treepath) },
        })
        .then((response) => {
          this.isLoaded = true;
          this.treeEntries = response.data.tree_entries;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              // 路由跳转到 NotFound 页面
              router.push('/404');
            } else {
              this.$emit('show-error', error.response.data.error)
            }
          } else {
            this.$emit('show-error', error.message)
          }
          this.isLoaded = true;
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
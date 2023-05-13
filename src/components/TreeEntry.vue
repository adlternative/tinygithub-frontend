<template>
  <div class="tree-entry">
    <span class="icon" v-if="entry.type === 'blob'">
      <img src="@/assets/file.svg" />
    </span>
    <span class="icon" v-else>
      <img src="@/assets/directory.svg" />
    </span>
    <router-link :to="linkUrl" class="git-tree-path">{{ entry.path }}</router-link>
    <div class="git-tree-message-header">{{ entry.last_commit.header }}</div>
    <div class="git-tree-date">{{ entry.last_commit.date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    reponame: {
      type: String,
      required: true,
    },
    entry: {
      type: Object,
      required: true
    },
    basetreepath: {
      type: [String, Array],
      required: true
    }
  },
  computed: {
    linkUrl() {
      let newTreePath = ''
      if (this.basetreepath == '/' || this.basetreepath == '') {
        newTreePath = this.entry.path
      } else if (typeof this.basetreepath === 'string') {
        newTreePath = [this.basetreepath, this.entry.path]
      } else {
        newTreePath = this.basetreepath.slice()
        newTreePath.push(this.entry.path)
      }

      if (this.entry.type === 'blob') {
        return {
          name: 'blob',
          params: {
            username: this.username,
            reponame: this.reponame,
            blobpath: newTreePath
          }
        };
      } else {
        return {
          name: 'tree',
          params: {
            username: this.username,
            reponame: this.reponame,
            treepath: newTreePath
          }
        };
      }
    }
  }
}
</script>

<style>
.git-tree-path {
  flex: 1;
  text-align: left;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.git-tree-message-header {
  flex: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.git-tree-date {
  flex: 1;
  text-align: right;
  margin-left: 10px;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
}

.tree-entry {
  display: flex;
  /* 设置为 flex 布局 */
  align-items: center;
  /* 子元素垂直居中 */
}

.icon img {
  width: 20px;
}
</style>
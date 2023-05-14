<template>
  <div class="repo-view-container">
    <div class="repo-name-line">
      <repo-name-line :username="username" :reponame="reponame" />
    </div>
    <div class="git-blam-tree">
      <git-blame-tree :username="username" :reponame="reponame" :treepath="treepath" :revision="revision" />
    </div>
  </div>
</template>

<script>
import GitBlameTree from '@/components/GitBlameTree.vue';
import RepoNameLine from '@/components/RepoNameLine.vue';
export default {
  name: 'TreeView',
  components: {
    RepoNameLine,
    GitBlameTree,
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    reponame() {
      return this.$route.params.reponame;
    },
    treepath() {
      return this.$route.params.treepath;
    },
    revision() {
      return this.$route.query.revision
    }
  },
};
</script>

<style scoped>
.repo-view-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 100px;
  margin-top: 100px;
  margin-right: 40%;
  margin-left: 5%;
}

.git-blame-tree {
  flex-grow: 1;
}

.repo-name-line {
  flex-grow: 1;
  left: 50px;
}
</style>
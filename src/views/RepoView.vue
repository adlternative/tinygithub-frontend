<template>
  <div class="repo-view">
    <div class="repo-name-line">
      <repo-name-line :username="username" :reponame="reponame" />
      <git-blame-tree :username="username" :reponame="reponame" :treepath="'/'" />
    </div>
  </div>
</template>

<script>
import GitBlameTree from '@/components/GitBlameTree.vue';
import RepoNameLine from '@/components/RepoNameLine.vue';
export default {
  name: 'RepoView',
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
  },
};
</script>

<style scoped>
.repo-view {
  position: relative;
  padding-top: 80px;
}

.repo-name-line {
  position: absolute;
  left: 0;
  top: 0;
  max-width: calc(100% - 40px);
  padding: 20px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-name-line repo-name {
  font-size: 24px;
}

@media screen and (max-height: 880px) {
  .repo-name-line {
    top: 80px;
  }
}
</style>
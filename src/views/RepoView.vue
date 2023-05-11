<template>
  <div class="repo-view">
    <div class="repo-name-line">
      <repo-name-line :username="username" :reponame="reponame" />
    </div>
    <!-- 其他内容 -->
  </div>
</template>

<script>
import RepoNameLine from '@/components/RepoNameLine.vue';
export default {
  name: 'RepoView',
  components: {
    RepoNameLine,
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
<template>
  <div class="repo-view-container">
    <div class="repo-name-line">
      <repo-name-line :username="username" :reponame="reponame" />
    </div>
    <div class="file-view">
      <file-view :username="username" :reponame="reponame" :blobpath="blobpath" :revision="revision"/>
    </div>
  </div>
</template>

<script>
import RepoNameLine from '@/components/RepoNameLine.vue';
import FileView from '@/views/FileView.vue';
export default {
  name: 'BlobView',
  components: {
    RepoNameLine,
    FileView,
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    reponame() {
      return this.$route.params.reponame;
    },
    blobpath() {
      return this.$route.params.blobpath;
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
}

.file-view {
  flex-grow: 1;
}

.repo-name-line {
  flex-grow: 1;
  left: 50px;
  margin-left: 50px;
}
</style>
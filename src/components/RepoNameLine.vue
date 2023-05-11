<template>
  <div class="repo-name">
    <span class="username">{{ username }}</span>/<span class="reponame">{{ reponame }}</span>
  </div>
</template>

<script>
export default {
  name: 'RepoNameLine',
  props: {
    username: {
      type: String,
      required: true,
    },
    reponame: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.repo-name {
  font-size: 24px;
}

.username {
  font-weight: bold;
  color: #0366d6;
}

.reponame {
  font-weight: bold;
  color: #0366d6;
}
</style>
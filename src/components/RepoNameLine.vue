<template>
  <div class="repo-name">
    <router-link class="username"
      :to="{ name: 'user', params: { username: username } }">{{ username }}</router-link>/<router-link class="reponame"
      :to="{ name: 'repo', params: { username: username, reponame: reponame } }">{{ reponame }}</router-link>
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
}</style>
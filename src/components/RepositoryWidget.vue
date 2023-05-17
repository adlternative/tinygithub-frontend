<template>
  <div class="repository">
    <div class="repository-info">
      <router-link :to="{ name: 'repo', params: { username: username, reponame: name } }"
        class="repository-name">{{ name }}</router-link>
      <div class="repository-description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryWidget',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.repository {
  background-color: #f2f2f2;
  height: 100px;
  border-radius: 10px;
}

.repository-info {
  padding: 10px;
}

.repository-name {
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.repository-description {
  font-size: 14px;
}
</style>
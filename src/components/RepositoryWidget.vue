<template>
  <div class="repository">
    <div class="repository-info">
      <div class="repository-name">{{ name }}</div>
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
  },
};
</script>

<style scoped>
.repository {
  background-color: #f2f2f2;
  border-radius: 4px;
  height: 100px;
}

.repository-info {
  padding: 10px;
}

.repository-name {
  font-weight: bold;
  font-size: 18px;
}

.repository-description {
  font-size: 14px;
}
</style>
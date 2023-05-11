<template>
  <div class="repositories">
    <div class="repositories-header">Repositories</div>
    <div class="repositories-list">
      <div class="repository-widget" v-for="(repo, index) in repositories" :key="index">
        <RepositoryWidget :name="repo.name" :description="repo.description" />
      </div>
    </div>
  </div>
</template>

<script>
import RepositoryWidget from '@/components/RepositoryWidget.vue';

export default {
  name: 'RepositoriesWidget',
  components: {
    RepositoryWidget,
  },
  data() {
    return {
      repositories: [
        {
          name: 'my-first-repo',
          description: 'This is my first repository',
        },
        {
          name: 'my-second-repo',
          description: 'This is my second repository',
        },
        {
          name: 'my-third-repo',
          description: 'This is my third repository',
        },
      ],
    };
  },
};
</script>

<style scoped>
.repositories {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  background-color: #fff;

  float: right;
  margin-right: 10%;
  width: 70%;
}

.repositories-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.repositories-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.repository-widget {
  width: 100%;
}
</style>
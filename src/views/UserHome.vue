<template>
  <div class="user-home">
    <UserWidget :username="username" :email="email" />
    <RepositoriesWidget />
  </div>
</template>

<script>
import UserWidget from '@/components/UserWidget.vue';
import RepositoriesWidget from '@/components/RepositoriesWidget.vue';

export default {
  name: 'UserHome',
  components: {
    UserWidget,
    RepositoriesWidget,
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    email() {
      // 这里可以从 API 或其他数据源获取用户的邮箱
      return 'user@example.com';
    },
  },
};
</script>

<style scoped>
.user-home {
  display: flex;
}
</style>
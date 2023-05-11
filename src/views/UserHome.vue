<template>
  <div class="user-home">
    <UserWidget :username="username" :email="email" />
    <!-- 其他用户主页内容 -->
  </div>
</template>

<script>
import UserWidget from '@/components/UserWidget.vue';

export default {
  name: 'UserHome',
  components: {
    UserWidget,
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
  /* 用户主页样式 */
}
</style>
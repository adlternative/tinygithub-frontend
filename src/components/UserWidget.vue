<template>
  <div class="user-widget">
    <div class="user-info">
      <div class="username">{{ username }}</div>
      <div class="email">{{ email }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserWidget',
  props: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-widget {
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  /* 将高度改为 bottom，占满整个屏幕 */
  width: 20%;
}

.user-info {
  padding: 10px;
}

.username {
  font-weight: bold;
  font-size: 18px;
}

.email {
  font-size: 14px;
}
</style>
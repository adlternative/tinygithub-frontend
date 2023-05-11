<template>
  <div>
    <nav-bar />
    <div class="error-container">
      <error-view v-if="shouldShowError" :message="errorMessage" @hide-error="errorMessage = ''" />
    </div>
    <router-view @show-error="errorMessage = $event" />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import ErrorView from '@/components/Error.vue'; // 导入 Error 组件

export default {
  name: 'App',
  data() {
    return {
      errorMessage: '',
    }
  },
  components: {
    NavBar,
    ErrorView,
  },
  computed: {
    shouldShowError() {
      return !!this.errorMessage;
    }
  }
}
</script>

<style>
.error-container {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
</style>

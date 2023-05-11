<template>
  <div class="error">{{ message }}</div>
</template>

<script>
export default {
  name: 'ErrorView',
  props: {
    message: String
  },
  data() {
    return {
      visible: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.visible = false;
      this.$emit('hide-error');
    }, 1000);
  },
  computed: {
    shouldShow() {
      return this.visible && this.message;
    }
  }
};
</script>

<style>
.error {
  background-color: #ff4136;
  color: #fff;
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  transition: opacity 0.5s ease-in-out;
}

.error.fade-out {
  opacity: 0;
}
</style>
<template>
  <div class="about-section">
    <div class="title">
      <h2>About</h2>
    </div>
    <div>{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.about-section {
  background-color: #f2f2f2;
  padding: 20px;
}


.title {
  display: flex;
  align-items: flex-start;
}
</style>
<template>
  <div>
    <img :src="imageUrl" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Blob,
      required: true
    }
  },
  data() {
    return {
      imageUrl: null
    }
  },
  mounted() {
    const reader = new FileReader();
    reader.readAsDataURL(this.data);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.onerror = (error) => {
      console.error(error);
    };
  }
};
</script>
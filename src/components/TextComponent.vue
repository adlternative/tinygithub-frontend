<template>
  <div>
    <pre>{{ text }}</pre>
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
      text: null
    }
  },
  mounted() {
    const reader = new FileReader();
    reader.readAsText(this.data);
    reader.onload = () => {
      this.text = reader.result;
    };
    reader.onerror = (error) => {
      console.error(error);
    };
  }
};
</script>
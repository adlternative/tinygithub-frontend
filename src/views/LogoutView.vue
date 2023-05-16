<template>
  <div class="logout-page">
    <h2>Logging out...</h2>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LogoutView',
  mounted() {
    axios.get('/api/v2/auth/logout', { withCredentials: true })
      .then((response) => {

        this.$store.commit("deleteSession")

        console.log(response.data.message);
        this.$router.replace('/');
      })
      .catch((error) => {
        const message = error.response ? error.response.data.message : 'Unknown error';
        this.$emit('show-error', message);
      });
  },
};
</script>
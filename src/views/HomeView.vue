<template>
  <div v-if="!isLogin" class="home">
    <img src="../assets/logo.png" class="logo">
    <div class="tiny-github">
      <h1>TinyGithub</h1>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(["isLogin"])
  },
  created() {
    this.fetchUsername()
  },
  methods: {
    fetchUsername() {
      axios.get('/api/v2/users/current', { withCredentials: true })
        .then(response => {
          let username = response.data.user.Name
          this.$router.replace('/' + username)
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401) {
              return
            } else if (error.response.status === 404) {
              console.error(error)
              this.$emit('show-error', error.message)
              this.$store.commit("deleteSession")
              this.$router.push('/404')
            }
          }
        })
    }
  }

}


</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  place-items: center;
  width: 250px;
  height: 250px;
  margin-bottom: 300px;
}

.tiny-github {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 5rem;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 100px;
}
</style>
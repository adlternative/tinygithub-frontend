<template>
  <nav>
    <ul class="navbar-list">
      <li> <router-link to="/"> <img src="../assets/logo.png" class="navbar-logo"> </router-link> </li>
      <li>
        <div class="navbar-right">
          <router-link v-if="isLogin" class="navbar-item" to="/logout">Logout</router-link>
          <template v-else>
            <router-link class="navbar-item" to="/login">Login</router-link>
            <router-link class="navbar-item" to="/register">Register</router-link>
          </template>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLogin"])
  },


}; </script>

<style>
nav {
  background-color: #333;
  color: #fff;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.navbar-item {
  color: #fff;
  font-size: 24px;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 28px;
  /* 增加字体大小 */
}

.navbar-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.router-link-active {
  font-weight: bold;
}

.navbar-logo {
  max-height: 5%;
  max-width: 5%;
  height: auto;
  width: auto;
  border-radius: 50%;
}
</style>
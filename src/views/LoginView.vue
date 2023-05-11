<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/api/v2/auth/login', {
          account: this.username,
          password: this.password
        });

        console.log(response.data.message);
      } catch (error) {
        if (error.response) {
          console.error('Request failed with status code:', error.response.status);
          console.error('Error message:', error.response.data.error);
          this.$emit('show-error', error.response.data.error)
        } else {
          console.error('An error occurred:', error.message);
          this.$emit('show-error', error.message);
        }
      }
    }
  }
}
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
}

.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
  font-size: 18px;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #3E8E41;
}
</style>
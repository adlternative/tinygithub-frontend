<template>
  <div class="create-repo">
    <h1>Create a new Repository</h1>
    <form @submit.prevent="createRepository">
      <div class="input-group">
        <label for="reponame">RepoName:</label>
        <input type="text" id="reponame" v-model="reponame">
      </div>
      <div class="input-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description">
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateRepositoryView',
  data() {
    return {
      reponame: '',
      description: '',
    };
  },
  beforeCreate() {
    if (!this.$store.getters.isLogin) {
      // 如果未登录，重定向到登录页面
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    createRepository() {
      const request = {
        reponame: this.reponame,
        description: this.description,
      };
      axios.post('/api/v2/repos/new', request, { withCredentials: true })
        .then((response) => {
          console.log(response.data.message);
          // 创建成功后跳转到仓库列表页面
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.error(error);
          this.$emit('show-error', error.message)
        });
    },
  },
};
</script>

<style>
.create-repo {
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
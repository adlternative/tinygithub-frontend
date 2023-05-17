<template>
  <div class="repositories">
    <div class="repositories-header">Repositories</div>
    <div class="repositories-list">
      <div class="repository-widget" v-for="(repo, index) in repositories" :key="index">
        <RepositoryWidget :username="username" :name="repo.Name" :description="repo.Desc" />
      </div>
    </div>
  </div>
</template>

<script>
import RepositoryWidget from '@/components/RepositoryWidget.vue';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'RepositoriesWidget',
  components: {
    RepositoryWidget,
  },
  data() {
    return {
      isLoaded: false,
      repositories: [],
      username: ""
    };
  },

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.username = this.$route.params.username

      // 发送 API 请求获取用户数据
      axios.get(`/api/v2/users/${this.$route.params.username}`, { params: { tab: 'repositories' } })
        .then(response => {
          // 从响应中获取邮箱数据
          this.isLoaded = true;
          this.repositories = response.data.repositories
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 404) {
              // 路由跳转到 NotFound 页面
              router.push('/404');
            } else {
              this.$emit('show-error', error.response.data.error)
            }
          } else {
            this.$emit('show-error', error.message)
          }
          this.isLoaded = true;
        });
    }
  }
};
</script>

<style scoped>
.repositories {
  position: fixed;
  top: 10%;
  right: 0;
  bottom: 10%;
  background-color: #fff;

  margin-right: 10%;
  width: 70%;

  border: 1px solid #ccc;
  border-radius: 8px;
}

.repositories-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 10px;
}

.repositories-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.repository-widget {
  padding: 10px;
}
</style>
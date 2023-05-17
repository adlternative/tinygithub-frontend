<template>
  <div v-if="isLoaded" class="user-home">
    <UserWidget class="user-widget" :username="username" :email="email" />
    <RepositoriesWidget class="repositories-widget" :username="username" />
  </div>
</template>

<script>
import UserWidget from '@/components/UserWidget.vue';
import RepositoriesWidget from '@/components/RepositoriesWidget.vue';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'UserHome',
  components: {
    UserWidget,
    RepositoriesWidget,
  },
  data() {
    return {
      email: null,
      username: null,
      isLoaded: false,
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
      // 发送 API 请求获取用户数据
      axios.get(`/api/v2/users/${this.$route.params.username}`)
        .then(response => {
          // 从响应中获取邮箱数据
          this.email = response.data.email;
          this.username = response.data.name;
          this.isLoaded = true;
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
.user-home {
  display: flex;

}

.user-widget {
  background-color: #f2f2f2;

  top: 10%;
  width: 18%;
  left: 1%;
  bottom: 5%;
}

.repositories-widget {
  top: 10%;
  bottom: 5%;
}

</style>
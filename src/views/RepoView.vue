<template>
  <div class="repo-view-container">
    <div v-if="!isLoaded">Loading...</div>
    <div v-else>
      <div class="repo-name-line">
        <repo-name-line :username="username" :reponame="reponame" />
      </div>
      <div class="about-section">
        <about-section :description="repository.Desc" />
      </div>
      <div class="top-bar">
        <revisions-selection class="revisions-selection-container" :username="username" :reponame="reponame" />
        <div class="button-container">
          <button class="delete-button" @click="confirmDelete">Delete</button>
          <code-dropdown class="code-dropdown-container" :username="username" :reponame="reponame" />
        </div>
      </div>
      <git-blame-tree class="git-blame-tree" :username="username" :reponame="reponame" :treepath="'/'"
        :revision="revision" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import GitBlameTree from '@/components/GitBlameTree.vue';
import RepoNameLine from '@/components/RepoNameLine.vue';
import AboutSection from '@/components/AboutSection.vue';
import RevisionsSelection from '@/components/RevisionsSelection.vue';
import CodeDropdown from '@/components/CodeDropDown.vue';
export default {
  name: 'RepoView',
  components: {
    RepoNameLine,
    GitBlameTree,
    AboutSection,
    RevisionsSelection,
    CodeDropdown,
  },
  data() {
    return {
      isLoaded: false,
      revision: '',
      repository: null,
    }
  },
  created() {
    this.$watch(
      () => ({
        params: this.$route.params,
        query: this.$route.query,
      }),
      () => {
        this.revision = this.$route.query.revision;
        this.fetchData()
      },
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.isLoaded = false;

      axios.get(`/api/v2/${this.$route.params.username}/${this.$route.params.reponame}`)
        .then(response => {
          // 从响应中获取仓库数据
          this.isLoaded = true;
          this.repository = response.data.repo
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
    },
    confirmDelete() {
      if (confirm("do you really want to delete this repository?")) {
        axios.post(`/api/v2/repos/delete`, { reponame: this.reponame }, { withCredentials: true })
          .then(response => {
            console.log(response.data)
            // 删除成功，跳转到仓库列表页面
            this.$router.push({ name: 'home' });
          })
          .catch(error => {
            this.$emit('show-error', error.response.data.error)
          });
      }
    },
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
    reponame() {
      return this.$route.params.reponame;
    },
  },
};
</script>

<style scoped>
.repo-view-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 100px;
  margin-top: 100px;
  margin-right: 40%;
  margin-left: 5%;
}

.git-blame-tree {
  flex-grow: 1;
}

.repo-name-line {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.about-section {
  position: fixed;
  top: 15%;
  right: 20px;
  width: 35%;
  max-width: 50%;
  bottom: 30px;
}

.revisions-selection-container {
  margin-top: 20px;
}

.top-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  margin-right: 10px;
}

.code-dropdown-container {
  margin-right: 10px;
}
</style>
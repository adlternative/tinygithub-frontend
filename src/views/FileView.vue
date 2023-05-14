<template>
  <div v-if="!isLoaded">Loading...</div>
  <div v-else>
    <div class="git-blob-path"> Path: {{ formatBlobPath(blobpath) }}</div>

    <div class="file-content">
      <image-component v-if="fileType === 'image'" :data="fileBlob" />
      <text-component v-else-if="fileType === 'text'" :data="fileBlob" />
      <div v-else>
        Unsupported file type.
      </div>
    </div>
  </div>
</template>

<script>

import ImageComponent from '@/components/ImageComponent.vue'
import TextComponent from '@/components/TextComponent.vue';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'FileView',
  props: {
    username: {
      type: String,
      required: true,
    },
    reponame: {
      type: String,
      required: true,
    },
    blobpath: {
      type: [String, Array],
      required: true,
    },
    revision: {
      type: String,
    },
  },
  components: { ImageComponent, TextComponent },

  data() {
    return {
      isLoaded: false,
      fileType: '',
      fileData: '',
    }
  },
  created() {
    this.$watch(
      () => this.$route.blobpath,
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
      this.isLoaded = false;

      axios.get(`/api/v2/${this.username}/${this.reponame}/blob`, {
        params: {
          path: this.formatBlobPath(this.blobpath),
          revision: this.revision
        },
        responseType: 'arraybuffer'
      })
        .then(response => {
          this.isLoaded = true;
          const contentType = response.headers['content-type'];
          const arrayBuffer = response.data;
          const fileBlob = new Blob([arrayBuffer], { type: contentType });
          this.fileBlob = fileBlob;
          this.fileType = this.getFileType(contentType);
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
    getFileType(contentType) {
      if (contentType.startsWith('image/')) {
        return 'image';
      } else if (contentType.startsWith('text/')) {
        return 'text';
      } else {
        return 'unknown';
      }
    },
    formatBlobPath(x) {
      if (Array.isArray(x)) {
        // 是字符串数组,则调用 join 方法返回字符串
        return x.join('/')
      } else {
        // 直接返回字符串
        return x
      }
    },
  }
};
</script>

<style scoped>
.git-blob-path {
  font-weight: bold;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.file-content {
  margin-left: 50px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>
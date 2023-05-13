<template>
  <div class="git-blob-path"> Path: {{ formatBlobPath(blobpath) }}</div>

  <div class="file-content">
    <image-component v-if="fileType === 'image'" :data="fileBlob" />
    <text-component v-else-if="fileType === 'text'" :data="fileBlob" />
    <div v-else>
      Unsupported file type.
    </div>
  </div>
</template>

<script>

import ImageComponent from '@/components/ImageComponent.vue'
import TextComponent from '@/components/TextComponent.vue';
import axios from 'axios';

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
  },
  components: { ImageComponent, TextComponent },

  data() {
    return {
      fileType: '',
      fileData: '',
    }
  },
  created() {
    axios.get(`/api/v2/${this.username}/${this.reponame}/blob`, {
      params: { path: this.formatBlobPath(this.blobpath) },
      responseType: 'arraybuffer'
    })
      .then(response => {
        const contentType = response.headers['content-type'];
        const arrayBuffer = response.data;
        const fileBlob = new Blob([arrayBuffer], { type: contentType });
        this.fileBlob = fileBlob;
        this.fileType = this.getFileType(contentType);
      })
      .catch(error => {
        console.error(error);
      });
  },

  methods: {
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
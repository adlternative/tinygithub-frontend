<template>
  <div class="code-dropdown">
    <button class="code-button" @click="toggleDropdown">Code</button>
    <div class="code-dropdown-content" v-show="showDropdown">
      <div class="http-link">
        <span class="http-link-text">{{ httpLink }}</span>
        <button class="copy-button" @click="copyLink">Copy</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  name: 'CodeDropdown',
  props: {
    username: {
      type: String,
      required: true
    },
    reponame: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    httpLink() {
      return `http://localhost:8083/${this.username}/${this.reponame}.git`;
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    copyLink() {
      const clipboard = new ClipboardJS('.copy-button', {
        text: () => this.httpLink
      });
      clipboard.on('success', () => {
        console.log('Link copied to clipboard');
      });
      clipboard.on('error', () => {
        console.log('Failed to copy link to clipboard');
      });
    }
  }
};
</script>

<style scoped>
.code-dropdown {
  position: relative;
}

.code-button {
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 7px;
}

.code-dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  padding: 12px;
  border-radius: 4px;
}

.code-dropdown:hover .code-dropdown-content {
  display: block;
}

.http-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.http-link-text {
  margin-right: 8px;
}

.copy-button {
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}
</style>
<template>
  <div class="button-dropdown" ref="dropdown">
    <button @click="toggleDropdown">{{ buttonText }}</button>
    <ul v-if="dropdownVisible" class="dropdown-list">
      <li>
        <div class="selection-mode">
          <span class="selection-label" @click="toggleBranches">Branches</span>
          <span class="selection-label" @click="toggleTags">Tags</span>
        </div>
        <div class="selection-items">
          <div v-if="selectionMode === 'branches'">
            <div v-for="branch in branches" :key="branch">
              <div @click="onSelect(branch)">
                <li>{{ branch }}</li>
              </div>
            </div>
          </div>
          <div v-if="selectionMode === 'tags'">
            <div v-for="tag in tags" :key="tag">
              <div @click="onSelect(tag)">
                <li>{{ tag }}</li>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RevisionsSelection',
  props: {
    username: {
      type: String,
      required: true,
    },
    reponame: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dropdownVisible: false,
      buttonText: 'Revisions',
      branches: [],
      tags: [],
      selectionMode: 'branches',
    };
  },
  methods: {
    fetchBranches() {
      axios
        .get(`/api/v2/${this.username}/${this.reponame}/branches`)
        .then((response) => {
          this.branches = response.data.branches;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchTags() {
      axios
        .get(`/api/v2/${this.username}/${this.reponame}/tags`)
        .then((response) => {
          this.tags = response.data.tags;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    toggleBranches() {
      this.selectionMode = 'branches';
      this.fetchBranches();
    },
    toggleTags() {
      this.selectionMode = 'tags';
      this.fetchTags();
    },
    onSelect(item) {
      this.$emit('select', item);
      this.dropdownVisible = false;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.dropdownVisible = false;
      }
    },
  },
  computed: {
    selectionItems() {
      return this.selectionMode === 'branches' ? this.branches : this.tags;
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
  .button-dropdown {
    position: relative;
  }

  .dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .selection-mode {
    display: flex;
    flex-direction: row;
  }

  .selection-label {
    padding: 8px;
    margin-right: 8px;
    background-color: #f8f8f8;
    cursor: pointer;
  }

  .selection-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    background-color: #f8f8f8;
    margin-bottom: 4px;
  }

  .selection-items li {
    cursor: pointer;
    margin-right: 8px;
    margin-bottom: 4px;
    white-space: nowrap;
  }

  .selection-items li:hover {
    background-color: #e8e8e8;
  }
</style>
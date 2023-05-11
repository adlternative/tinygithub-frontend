<template>
  <div class="home">
    <img src="../assets/logo.png" class="logo">
    <div class="tiny-github">
      <h1>TinyGithub</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  width: 250px;
  height: 250px;
  margin-bottom: 300px;
}

.tiny-github {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 5rem;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 100px;
}
</style>
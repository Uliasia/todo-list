<template>
  <div id="app" class="app-wrapper">

    <div class="app-conteiner">
      <h1>Заметки</H1>
      <router-view />
    </div>

  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.app-wrapper {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 3%;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.5em;

  text-align: center;
  color: #222;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  margin: 0 auto;
}
</style>

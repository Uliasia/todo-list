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
  name: 'App',

  beforeCreate () {
    this.$store.dispatch('downloadNotes')
  }
}
</script>

<style lang="scss">
* {
  outline: none;
}

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
  color: #101122;
  background: linear-gradient(
    180deg,
    rgba(2,0,36,.7595413165266106) 0%,
    rgba(82,9,121,.6951155462184874) 40%,
    rgba(255,0,232,.5) 100%
  );

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;

  &::-webkit-scrollbar {
    width: 3%;
    max-width: 10px;

    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #52097940;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #5209793a;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8c008f3a;
  }
}

.app-container {
  margin: 0 auto;
}

a {
  display: block;

  text-decoration: none;
  color: inherit;;
}

button {
  box-sizing: border-box;
  margin: .5%;

  color: #2a2e3c;
  border: none;
  border-radius: 20px;
  background-color: #f7c1bbab;

  &:hover {
    cursor: pointer;
    background-color: darken($color: #f7c1bbab, $amount: 10%);
  }

  &:disabled {
    background-color: #f7c1bb4a;
  }
}

input:disabled {
  color: inherit;
}

</style>

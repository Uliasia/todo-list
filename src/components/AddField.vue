<template>
  <form
    class="add-field"
    @submit.prevent="onSubmit"
  >
    <button
      class="add-field__button"
      type="submit"
      :disabled="content ? false : true"
    >
      <span class="icon-plus"></span>
    </button>

    <input
      class="add-field__input"
      type="text"
      v-model="content"
    >
  </form>
</template>

<script>
export default {
  name: 'AddField',

  data () {
    return {
      content: ''
    }
  },

  methods: {
    onSubmit () {
      if (this.content.trim()) {
        this.$emit('add-element', this.content)
        // Cleaning after submitting form
        this.content = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-field {
    display: flex;
    height: 1.2em;
    margin: .3125em;

    font-size: 1.5em;

    border-top: solid 2px #5209793b;
    border-bottom: solid 2px #5209793b;

    &__button {
      width: 1.9em;
      height: 100%;
      margin: 0;

      font-size: .83em;

      border-radius: 0;
    }

    &__input {
      width: 100%;
      padding: 2% 3%;

      border: none;
      outline: none;
      background-color: #fbddec;

      &:focus {
        background-color: #fbd9e8;
      }
    }
  }
</style>

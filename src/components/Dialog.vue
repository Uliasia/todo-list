<template>
  <div
    class="modal"
    v-if="show"
    @click.self="negative"
  >
    <div class="modal__mask">
      <div class="modal__container">

        <div class="modal__header">
          <slot name="header">
          </slot>
        </div>

        <div class="modal__footer">
          <button
            class="modal__button--negative"
            @click="negative"
          >
            <span class="icon-negative"></span>
          </button>
          <button
            class="modal__button--positive"
            @click="positive"
          >
            <span class="icon-positive"></span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    negative () {
      this.$emit('negative-answ')
    },

    positive () {
      this.$emit('positive-answ')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, .5);
  }

  &__container {
    width: 70%;
    max-width: 350px;
    margin: auto;
    padding: 20px 30px;

    text-align: center;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }

  &__header {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.5em;
  }

  &__footer {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    margin: 0 auto;
  }

  &__button {
    padding: .5em;

    font-size: 1em;

    border-radius: 50%;

    &--positive {
      background-color: #a3bf8fab;

      @extend .modal__button;

      &:hover {
        background-color: darken($color: #a3bf8fab, $amount: 10%);
      }
    }

    &--negative {
      background-color: #dd7875ab;

      @extend .modal__button;

      &:hover {
        background-color: darken($color: #dd7875ab, $amount: 10%);
      }
    }
  }
}

</style>

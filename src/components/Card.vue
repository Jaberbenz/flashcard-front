<template>
  <li class="card-box">
    <transition name="flip">
      <article @click="flipCard" :key="card.flipped" class="single-card">
        <button
          type="button"
          class="delete-icon"
          @click.stop="deleteCard(card.id)"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <path
              d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"
            />
            <path
              d="M35.707 16.293a.999.999 0 0 0-1.414 0L26 24.586l-8.293-8.293a.999.999 0 1 0-1.414 1.414L24.586 26l-8.293 8.293a.999.999 0 1 0 1.414 1.414L26 27.414l8.293 8.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L27.414 26l8.293-8.293a.999.999 0 0 0 0-1.414z"
            />
          </svg>
        </button>
        <h2 class="title">{{ card.flipped ? card.back : card.front_text }}</h2>
      </article>
    </transition>
  </li>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const flipCard = () => {
      props.card.flipped = !props.card.flipped;
    };

    const deleteCard = (id) => {
      emit("deleteTrigger", id);
    };

    return {
      flipCard,
      deleteCard,
    };
  },
};
</script>

<style scoped>
.card-box {
  padding: 0.8rem;
  flex: 1 1 0;
  max-width: 283.5px;
  margin-left: auto;
  margin-right: auto;
}

.single-card {
  width: 250px;
  border-radius: 8px;
  height: 335px;
  padding: 80px 30px;
  background-color: #007bff;
  margin: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  color: #fff;
  box-shadow: 0 0 8px 1px rgba(0, 123, 255, 0.3);
  transition: box-shadow 0.3s;
}

.single-card:hover {
  box-shadow: 0 0 8px 1px rgba(0, 123, 255, 1);
}

.title {
  font-size: 1.286rem;
  line-height: 1.6;
  font-weight: bold;
}

button {
  border: 0;
  background-color: transparent;
  position: absolute;
  fill: white;
  padding: 0;
}

.delete-icon {
  right: 15px;
  top: 15px;
  width: 25px;
}

.delete-icon .icon {
  opacity: 0.5;
  transition: all 0.5s;
}

.delete-icon .icon:hover {
  transform: rotate(180deg);
  opacity: 1;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.6s;
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>

<template>
  <div id="radio-container">
    <form class="form" v-if="props.type === 'radio'">
      <div id="form-field" v-for="item in props.content">
        <input
          :id="item!.bind"
          :type="props.type"
          :rel="props.rel"
          name="same"
          :default="item!.bind"
          :checked="item!.default"
          @change="handleChange"
        />
        <label :for="item!.bind">{{ item!.name }}</label>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useEditorStore } from "../store/index";
interface Content {
  name?: string;
  bind?: string;
  default?: boolean;
}
const store = useEditorStore();
const props = defineProps<{
  content: Array<Content>,
  rel: string,
  type: string,
}>();
const handleChange = () => {
  //监听单选值的变化
  let checked;
  const checkedList = document.querySelectorAll('input[type="radio"]:checked');

  for (checked of checkedList) {
    if (checked.getAttribute("rel") == "outerskin") {
      store.chooseOuterSkin(checked.id);
    } else if (checked.getAttribute("rel") == "innerskin") {
      store.chooseInnerSkin(checked.id);
    } else if (checked.getAttribute("rel") == "language") {
      store.chooseLanguage(checked.id);
    } else if (checked.getAttribute("rel") == "toolbar_mode") {
      store.chooseToolBarMode(checked.id);
    } else if (checked.getAttribute("rel") == "toolbar_location") {
      store.chooseToolBarLocation(checked.id);
    }
  }
};
onMounted(() => {
  handleChange();
});
</script>
<style lang="less" scoped>
.form {
  --text: #414856;
  --radio: #7c96b2;
  --radio-checked: var(--checkBox);
  --radio-size: 20px;
  --width: 100%;
  --border-radius: 10px;
  width: var(--width);
  border-radius: var(--border-radius);
  color: var(--text);
  position: relative;
  display: flex;
  flex-wrap: wrap;
  #form-field {
    display: flex;
    label {
      margin: 0 1em 0 0.5em;
    }
  }
}

.form label {
  cursor: pointer;
  transform: translateY(0.5em);
}

.form input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  height: var(--radio-size);
  width: var(--radio-size);
  outline: none;
  margin: 0;
  margin-top: 0.5em;
  cursor: pointer;
  border: 2px solid var(--radio);
  background: transparent;
  border-radius: 50%;
  display: grid;
  justify-self: end;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  transition: border 0.5s ease;
}

.form input[type="radio"]::before,
.form input[type="radio"]::after {
  content: "";
  display: flex;
  justify-self: center;
  border-radius: 50%;
}

.form input[type="radio"]::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background);
  z-index: 1;
  opacity: var(--opacity, 1);
}

.form input[type="radio"]::after {
  position: relative;
  width: calc(100% / 2);
  height: calc(100% / 2);
  background: var(--radio-checked);
  top: var(--y, 100%);
  transition: top 0.5s cubic-bezier(0.48, 1.97, 0.5, 0.63);
}

.form input[type="radio"]:checked {
  --radio: var(--radio-checked);
}

.form input[type="radio"]:checked::after {
  --y: 0%;
  animation: stretch-animate 0.3s ease-out 0.17s;
}

.form input[type="radio"]:checked::before {
  --opacity: 0;
}

.form input[type="radio"]:checked ~ input[type="radio"]::after {
  --y: -100%;
}

.form input[type="radio"]:not(:checked)::before {
  --opacity: 1;
  transition: opacity 0s linear 0.5s;
}

@keyframes stretch-animate {
  0% {
    transform: scale(1, 1);
  }

  28% {
    transform: scale(1.15, 0.85);
  }

  50% {
    transform: scale(0.9, 1.1);
  }

  100% {
    transform: scale(1, 1);
  }
}

.socials {
  position: fixed;
  display: block;
  left: 20px;
  bottom: 20px;
}

.socials > a {
  display: block;
  width: 30px;
  opacity: 0.2;
  transform: scale(var(--scale, 0.8));
  transition: transform 0.3s cubic-bezier(0.38, -0.12, 0.24, 1.91);
}

.socials > a:hover {
  --scale: 1;
}
</style>

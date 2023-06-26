<template>
  <div id="switch-container">
    <label
      class="switch"
      v-for="item in props.content"
      v-if="props.type === 'switch'"
    >
      <input
        type="checkbox"
        class="switch"
        :id="item!.name"
        :checked="item!.default"
        @change="handleChange"
      />
      <span class="slider"></span>
      <label :for="item!.name" id="switchLabel">{{ item!.title }}</label>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useEditorStore } from "../store/index";
interface Content {
    name?: string,
    title?: string,
    default?: boolean
}
const props = defineProps<{
  content: Array<Content>,
  rel: string,
  type: string,
}>();
const store = useEditorStore();
const handleChange = () => {
  //监听单选值的变化
  let checked;
  const checkedList = document.querySelectorAll(
    'input[class="switch"]:checked'
  );
  //记录正确属性
  let trueList: string[] = [];
  for (checked of checkedList) {
    trueList.push(checked.getAttribute("id") as string);
  }
  if (trueList.indexOf("resize") !== -1) {
    store.switchResize(true);
  } else {
    store.switchResize(false);
  }
  if (trueList.indexOf("skeletonScreen") !== -1) {
    store.switchSkeletonScreen(true);
  } else {
    store.switchSkeletonScreen(false);
  }
  if (trueList.indexOf("statusbar") !== -1) {
    store.switchStatusBar(true);
  } else {
    store.switchStatusBar(false);
  }
  if (trueList.indexOf("elementpath") !== -1) {
    store.switchElementPath(true);
  } else {
    store.switchElementPath(false);
  }
  if (trueList.indexOf("word") !== -1) {
    store.switchWord(true);
  } else {
    store.switchWord(false);
  }
};
onMounted(handleChange);
</script>
<style lang="less" scoped>
@import url("../assets/base.css");
#switch-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -0.8em;
  .switch {
    --button-width: 3.5em;
    --button-height: 2em;
    --toggle-diameter: 1.5em;
    --button-toggle-offset: calc(
      (var(--button-height) - var(--toggle-diameter)) / 2
    );
    --toggle-shadow-offset: 10px;
    --toggle-wider: 3em;
    --color-grey: #cccccc;
    --color-green: #4296f4;
    display: flex;
    margin-bottom: 0.8em;
    align-items: center;
    flex-wrap: wrap;
    #switchLabel {
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      margin-right: 3em;
    }
  }

  .slider {
    cursor: pointer;
    margin-right: 0.5em;
    display: inline-block;
    width: var(--button-width);
    height: var(--button-height);
    background-color: var(--color-grey);
    border-radius: calc(var(--button-height) / 2);
    position: relative;
    transition: 0.3s all ease-in-out;
  }

  .slider::after {
    content: "";
    display: inline-block;
    width: var(--toggle-diameter);
    height: var(--toggle-diameter);
    background-color: #fff;
    border-radius: calc(var(--toggle-diameter) / 2);
    position: absolute;
    top: var(--button-toggle-offset);
    transform: translateX(var(--button-toggle-offset));
    box-shadow: var(--toggle-shadow-offset) 0
      calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
    transition: 0.3s all ease-in-out;
  }

  .switch input[type="checkbox"]:checked + .slider {
    background-color: var(--color-green);
    cursor: pointer;
  }

  .switch input[type="checkbox"]:checked + .slider::after {
    cursor: pointer;
    transform: translateX(
      calc(
        var(--button-width) - var(--toggle-diameter) -
          var(--button-toggle-offset)
      )
    );
    box-shadow: calc(var(--toggle-shadow-offset) * -1) 0
      calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
  }

  .switch input[type="checkbox"] {
    display: none;
  }

  .switch input[type="checkbox"]:active + .slider::after {
    width: var(--toggle-wider);
  }

  .switch input[type="checkbox"]:checked:active + .slider::after {
    transform: translateX(
      calc(
        var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)
      )
    );
  }
}
</style>

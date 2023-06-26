<template>
  <div class="nav-container" :style="'background-color:' + state.barColor">
    <h1 :style="'color:' + state.titleColor">富文本编辑器</h1>
    <label class="switch">
      <input type="checkbox" v-model="state.checked" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watchEffect } from "vue";
import { useStatusStore } from "@/store/index";
let state = reactive({
  checked: true,
  titleColor: "#fff",
  barColor: "#333",
});
const store = useStatusStore();
watchEffect(() => {
  const body = document.body;
  if (state.checked) {
    state.titleColor = "#fff";
    state.barColor = "#333";
    body.style.backgroundColor = "#fff";
  } else {
    state.titleColor = "#ccc";
    state.barColor = "#000";
    body.style.backgroundColor = "#333";
  }
  store.checked = state.checked;
});
onMounted(() => {
  state.checked = store.checked;
});
</script>
<style lang="less" scoped>
@import url("../assets/base.css");
html,
body {
  transition: all 0.5s;
}
.nav-container {
  transition: all 0.5s;
  width: 100%;
  height: 60px;
  color: #e2e2e2;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 0px 6px 0px #333;
  h1 {
    transition: all 0.5s;
    margin-left: 20px;
    font-size: 24px;
    font-style: italic;
    // color: var(--lightBar);
  }
  /* The switch - the box around the slider */
  .switch {
    margin-right: 20px;
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 4.2em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    --background: var(--dark);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.6em;
    width: 1.6em;
    border-radius: 50%;
    border: 0;
    left: 10%;
    bottom: 10%;
    box-shadow: inset 8px -4px 0px 0px var(--sun);
    background: var(--background);
    transition: 0.5s;
  }

  input:checked + .slider {
    background-color: var(--light);
  }

  input:checked + .slider:before {
    transform: translateX(120%);
    box-shadow: inset 15px -4px 0px 15px var(--sun);
  }
}
</style>

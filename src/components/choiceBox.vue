<template>
  <div id="choice-container">
    <div class="checkbox-wrapper-12">
      <div class="cbx">
        <input :id="'cbx' + props.label" type="checkbox" v-model="checked" />
        <label :for="'cbx' + props.label"></label>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="4"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo-12"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
    <label :for="'cbx' + props.label" class="label"> {{ props.label }}</label>
  </div>
</template>

<script lang="ts" setup>
import {  ref, watchEffect } from "vue";
import { useEditorStore } from "@/store/index";
let checked = ref<boolean>();
const store = useEditorStore();
const props = defineProps({
  default: {
    type: Boolean,
    default: false,
  },
  bind: String,
  rel: String,
  label: String,
});
//断言非空
checked.value = props!.default;
const rel = props!.rel!;
const bind = props!.bind!;
watchEffect(() => {
  if (checked.value && rel == "menubar") {
    store.addMenuBar(bind);
  }
  if (checked.value && rel == "toolbar") {
    store.addToolBar(bind);
  }
  if (checked.value && rel == "plugins") {
    store.addPlugins(bind);
    if (bind === "textpattern") {
      //定义md编辑器解析模式
      const mdpattern = [
        { start: "*", end: "*", format: "italic" },
        { start: "**", end: "**", format: "bold" },
        { start: "#", format: "h1" },
        { start: "##", format: "h2" },
        { start: "###", format: "h3" },
        { start: "####", format: "h4" },
        { start: "#####", format: "h5" },
        { start: "######", format: "h6" },
        { start: "1. ", cmd: "InsertOrderedList" },
        { start: "* ", cmd: "InsertUnorderedList" },
        { start: "- ", cmd: "InsertUnorderedList" },
      ];
      store.chooseTextParttern(mdpattern);
    }
  }
});
</script>
<style lang="less" scoped>
#choice-container {
  position: relative;
  margin-top: 0.5em;
  .label {
    cursor: pointer;
    vertical-align: middle;
  }
  .checkbox-wrapper-12 {
    transform: scale(0.8);
    display: inline-block;
    margin-right: 0.3em;
    vertical-align: middle;
    position: relative;
  }

  .checkbox-wrapper-12 > svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
  }

  .checkbox-wrapper-12 * {
    box-sizing: border-box;
  }

  .checkbox-wrapper-12 input[type="checkbox"],
  .checkbox-wrapper-12 input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
  }

  .checkbox-wrapper-12 input[type="checkbox"]:focus,
  .checkbox-wrapper-12 input[type="radio"]:focus {
    outline: 0;
  }

  .checkbox-wrapper-12 .cbx {
    width: 24px;
    height: 24px;
    top: calc(100px - 12px);
    left: calc(100px - 12px);
  }

  .checkbox-wrapper-12 .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #bfbfc0;
    border-radius: 50%;
  }

  .checkbox-wrapper-12 .cbx label {
    width: 24px;
    height: 24px;
    background: none;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }

  .checkbox-wrapper-12 .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
  }

  .checkbox-wrapper-12 .cbx svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }

  .checkbox-wrapper-12 .cbx input:checked + label {
    animation: splash-12 0.6s ease forwards;
  }

  .checkbox-wrapper-12 .cbx input:checked + label + svg path {
    stroke-dashoffset: 0;
  }

  @-moz-keyframes splash-12 {
    40% {
      background: var(--checkBox);
      box-shadow: 0 -18px 0 -8px var(--checkBox),
        16px -8px 0 -8px var(--checkBox), 16px 8px 0 -8px var(--checkBox),
        0 18px 0 -8px var(--checkBox), -16px 8px 0 -8px var(--checkBox),
        -16px -8px 0 -8px var(--checkBox);
    }

    100% {
      background: var(--checkBox);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @-webkit-keyframes splash-12 {
    40% {
      background: var(--checkBox);
      box-shadow: 0 -18px 0 -8px var(--checkBox),
        16px -8px 0 -8px var(--checkBox), 16px 8px 0 -8px var(--checkBox),
        0 18px 0 -8px var(--checkBox), -16px 8px 0 -8px var(--checkBox),
        -16px -8px 0 -8px var(--checkBox);
    }

    100% {
      background: var(--checkBox);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @-o-keyframes splash-12 {
    40% {
      background: var(--checkBox);
      box-shadow: 0 -18px 0 -8px var(--checkBox),
        16px -8px 0 -8px var(--checkBox), 16px 8px 0 -8px var(--checkBox),
        0 18px 0 -8px var(--checkBox), -16px 8px 0 -8px var(--checkBox),
        -16px -8px 0 -8px var(--checkBox);
    }

    100% {
      background: var(--checkBox);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @keyframes splash-12 {
    40% {
      background: var(--checkBox);
      box-shadow: 0 -18px 0 -8px var(--checkBox),
        16px -8px 0 -8px var(--checkBox), 16px 8px 0 -8px var(--checkBox),
        0 18px 0 -8px var(--checkBox), -16px 8px 0 -8px var(--checkBox),
        -16px -8px 0 -8px var(--checkBox);
    }

    100% {
      background: var(--checkBox);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }
}
</style>

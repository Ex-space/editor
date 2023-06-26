<template>
  <div id="list-container">
    <h3>{{ props.title }}</h3>
    <div class="choiceList">
      <choiceBox
        v-if="props.type === 'checkbox'"
        class="item"
        v-for="item in choiceList"
        :label="item.name"
        :bind="item.bind"
        :rel="props.rel"
        :default="item.default"
      ></choiceBox>
      <radioBox
        :content="props.content"
        :rel="props.rel"
        :type="props.type"
      ></radioBox>
      <switchBox
        :content="props.content"
        :rel="props.rel"
        :type="props.type"
      ></switchBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import radioBox from "./radioBox.vue";
import switchBox from "./switchBox.vue";
import choiceBox from "./choiceBox.vue";
interface Content {
  name?: string;
  bind?: string;
  default?: boolean;
}
const props = defineProps<{
  title: String,
  content: Array<Content>,
  rel: String,
  type: String,
}>()
//传过来的props的content中是单选列表需要的内容
const choiceList = props.content;
</script>
<style lang="less" scoped>
@import url("../assets/base.css");
#list-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  h3 {
    transition: all 0.5s;
    display: inline-block;
    //文字宽度自适应
    width: fit-content;
    position: relative;
    font-size: 2em;
    color: var(--dark);
    margin-top: 0.5em;
    margin-bottom: 0.7em;
  }
  h3::after {
    content: "";
    transition: all 0.5s;
    left: 0;
    width: 72vw;
    position: absolute;
    bottom: -0.2em;
    height: 4px;
    border-radius: 2px;
    background-color: var(--dim);
  }
  h3:hover::after {
    width: 100%;
    background-color: var(--checkBox);
  }
  .choiceList {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-right: 0.9em;
    }
  }
}
</style>

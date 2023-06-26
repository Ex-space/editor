<template>
  <div class="editor-container" style="visibility: hidden"></div>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import tinymce from "tinymce/tinymce";
import "../utils/fomat.js";
// import { ToolbarMode, ToolbarLocation } from "tinymce";
const props = defineProps({
  img_url: String,
  outerskin: {
    type: String,
    default: "myskin",
  },
  toolbar_mode: {
    type: String,
    default: "floating",
  },
  toolbar_location: {
    type: String,
    default: "auto",
  },
  innerskin: {
    type: String,
    default: "css/content.css",
  },
  language: {
    type: String,
    default: "zh-Hans",
  },
  skeletonScreen: {
    type: Boolean,
    default: true,
  },
  menubar: {
    type: String,
    default: "",
  },
  resize: {
    type: Boolean,
    default: false,
  },
  statusbar: {
    type: Boolean,
    default: false,
  },
  elementpath: {
    type: Boolean,
    default: false,
  },
  word: {
    type: Boolean,
    default: true,
  },
  toolbar: {
    type: String,
    default:
      "undo redo formatpainter|styles|bold italic|fontfamily fontsize forecolor|aligncenter alignjustify alignleft alignright alignnone|blockquote|cancel save|image link media codesample kityformula-editor table|fullscreen",
  },
  plugins: {
    type: String,
    default:
      "image link knowledge codesample code kityformula-editor table media preview save formatpainter wordcount fullscreen",
  },
});
watchEffect(() => {
  let word: boolean = props.word;
  tinymce.init({
    //图片上传地址
    images_upload_url: props.img_url,
    convert_urls: false,
    height: 550,
    //未加载时骨架屏
    skeletonScreen: props.skeletonScreen,
    selector: ".editor-container",
    content_style: "img {max-width:100%;}",
    //外层编辑器皮肤
    skin: props.outerskin,
    //内部编辑内容皮肤
    content_css: props.innerskin,
    //使用语言
    language: props.language,
    //菜单栏
    menubar: props.menubar,
    //工具栏
    toolbar: props.toolbar,
    //插件
    plugins: props.plugins,
    resize: props.resize,
    branding: false,
    statusbar: props.statusbar,
    elementpath: props.elementpath,
    toolbar_mode: props.toolbar_mode as any,
    toolbar_location: props.toolbar_location as any,
    //word文档黏贴格式配置
    paste_merge_formats: word,
    paste_word_valid_elements: word ? "*[*]" : "", // 从Word粘贴过来时，不会对此处配置的内容进行过滤（需要paste_enable_default_filters为true才生效）
    paste_retain_style_properties: word ? "all" : "", // 从Word粘贴过来时，将保留此处配置的样式
    paste_webkit_styles: word ? "all" : "", // 在WebKit中粘贴时，将保留此处配置的样式
    paste_preprocess: word
      ? function (plugin, args) {
          // 从Word粘贴过来时，被插入到编辑器之前的文本
          args.content = args.content.replace(
            /([+-]?[0-9]*\.?[0-9]+)pt/g,
            function (match, group0) {
              //将pt统一转为px，包括负数值（-10px这种）
              return (
                Math.abs(Math.round((parseInt(group0, 10) * 96) / 72)) + "px"
              );
            }
          );
        }
      : undefined,
  });
});
</script>
<style lang="less">
.tox-tinymce {
  box-shadow: 1px 1px 8px 1px #a2a2a2 !important;
  width: 95%;
  margin: 0 auto;
}
</style>

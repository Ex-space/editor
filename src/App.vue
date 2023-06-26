<template>
  <div class="app-container">
    <navBar></navBar>
    <MyEditor
      :img_url="MyEditorItem.img_url"
      :innerskin="MyEditorItem.innerskin"
      :outerskin="MyEditorItem.outerskin"
      :toolbar="MyEditorItem.toolbar"
      :plugins="MyEditorItem.plugins"
      :menubar="MyEditorItem.menubar"
      :language="MyEditorItem.language"
      :resize="MyEditorItem.resize"
      :toolbar_mode="MyEditorItem.toolbar_mode"
      :skeletonScreen="MyEditorItem.skeletonScreen"
      :toolbar_location="MyEditorItem.toolbar_location"
      :elementpath="MyEditorItem.elementpath"
      :statusbar="MyEditorItem.statusbar"
      :word="MyEditorItem.word"
    ></MyEditor>
    <div class="btn-div">
      <button id="btn" v-if="!dialogVisible" @click="changeVisible">
        <span class="text">自定义编辑器</span>
      </button>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="设计属于你的编辑器!"
      width="80%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="2%"
      center
      destroy-on-close
    >
      <choiceList
        v-for="item in optionalItem"
        :title="item.title"
        :rel="item.rel"
        :content="item.content"
        :type="item.type"
      ></choiceList>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="handle" @click="handleClose"
            >使用默认编辑器</el-button
          >
          <el-button class="handle" type="primary" @click="setEditor">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import choiceList from "./components/choiceList.vue";
import {  onMounted, reactive, ref } from "vue";
import MyEditor from "./components/MyEditor.vue";
import navBar from "./components/navBar.vue";
import { ElMessageBox } from "element-plus";
import { useEditorStore } from "@/store/index";
const store = useEditorStore();
//用户自定义设计
let dialogVisible = ref<boolean>(true);
onMounted(async () => {
  const button = document.querySelector("button");

  await button?.addEventListener("click", () => {
    dialogVisible.value = !dialogVisible.value;
  });
});
const setEditor = () => {
  ElMessageBox.confirm("确定要保留这次的自定义编辑吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      dialogVisible.value = false;
      MyEditorItem.img_url = store.img_url;
      MyEditorItem.toolbar = store.toolbar;
      MyEditorItem.menubar = store.menubar;
      MyEditorItem.innerskin = store.innerskin;
      MyEditorItem.outerskin = store.outerskin;
      MyEditorItem.language = store.language;
      MyEditorItem.plugins = store.plugins;
      MyEditorItem.resize = store.resize;
      MyEditorItem.elementpath = store.elementpath;
      MyEditorItem.statusbar = store.statusbar;
      MyEditorItem.toolbar_mode = store.toolbar_mode;
      MyEditorItem.toolbar_location = store.toolbar_location;
      MyEditorItem.skeletonScreen = store.skeletonScreen;
      MyEditorItem.textpattern_patterns = store.textpattern_patterns;
      MyEditorItem.word = store.word;
      
    })
    .catch(() => {
      // catch error
    });
};
const optionalItem = [
  {
    type: "radio",
    title: "输入板皮肤设置",
    //关联哪个pinia中存储的属性
    rel: "innerskin",
    content: [
      {
        name: "默认",
        default: true,
        bind: "css/content.css",
      },
    ],
  },
  {
    type: "radio",
    title: "编辑器皮肤",
    //关联哪个pinia中存储的属性
    rel: "outerskin",
    content: [
      {
        name: "亮色",
        default: true,
        bind: "oxide",
      },
      {
        name: "暗色",
        default: false,
        bind: "oxide-dark",
      },
      {
        name: "质朴白",
        default: false,
        bind: "tinymce-5",
      },
      {
        name: "质朴黑",
        default: false,
        bind: "tinymce-5-dark",
      },
    ],
  },
  {
    type: "switch",
    title: "编辑器优化",
    //关联哪个pinia中存储的属性
    rel: "resize",
    content: [
      {
        name: "resize",
        title: "编辑器大小调整",
        default: false,
      },
      {
        name: "skeletonScreen",
        title: "开启骨架屏(延迟高时推荐)",
        default: true,
      },
      {
        name: "elementpath",
        title: "底部元素路径显示",
        default: true,
      },
      {
        name: "statusbar",
        title: "状态栏显示",
        default: true,
      },
      {
        name: "word",
        title: "word文档黏贴格式优化",
        default: true,
      },
    ],
  },
  {
    type: "radio",
    title: "语言",
    //关联哪个pinia中存储的属性
    rel: "language",
    content: [
      {
        name: "英文",
        default: true,
        bind: "en",
      },
      {
        name: "简体中文",
        default: false,
        bind: "zh-Hans",
      },
      {
        name: "繁体中文",
        default: false,
        bind: "zh-Hant",
      },
      {
        name: "日语",
        default: false,
        bind: "ja",
      },
      {
        name: "俄语",
        default: false,
        bind: "ru",
      },
      {
        name: "法语",
        default: false,
        bind: "fr_FR",
      },
      {
        name: "德语",
        default: false,
        bind: "de",
      },
    ],
  },
  {
    type: "checkbox",
    title: "插件功能选择",
    //关联哪个pinia中存储的属性
    rel: "plugins",
    content: [
      {
        name: "自动解析超链接",
        default: true,
        bind: "autolink",
      },
      {
        name: "编辑器大小自适应",
        default: false,
        bind: "autoresize",
      },
      {
        name: "便捷编辑模式",
        default: true,
        bind: "quickbars",
      },
      {
        name: "简易MarkDown解析",
        default: false,
        bind: "textpattern",
      },
    ],
  },
  {
    type: "checkbox",
    title: "自定义菜单栏",
    //关联哪个pinia中存储的属性
    rel: "menubar",
    content: [
      {
        name: "文件",
        default: true,
        bind: "file",
      },
      {
        name: "编辑",
        default: true,
        bind: "edit",
      },
      {
        name: "插入",
        default: false,
        bind: "insert",
      },
      {
        name: "视图",
        default: false,
        bind: "view",
      },
      {
        name: "格式化",
        default: false,
        bind: "format",
      },
      {
        name: " 表格操作",
        default: false,
        bind: "table",
      },
      {
        name: "工具栏",
        default: true,
        bind: "tools",
      },
      {
        name: "帮助",
        default: true,
        bind: "help",
      },
    ],
  },
  {
    type: "checkbox",
    title: "自定义工具栏",
    //关联哪个pinia中存储的属性
    rel: "toolbar",
    content: [
      {
        name: "撤销",
        default: true,
        bind: "undo",
      },
      {
        name: "重做",
        default: true,
        bind: "redo",
      },
      {
        name: "快速生成目录",
        default: true,
        bind: "toc",
      },
      {
        name: "格式刷",
        default: false,
        bind: "formatpainter",
      },
      {
        name: "查找替换",
        default: false,
        bind: "searchreplace",
      },
      {
        name: "样式",
        default: false,
        bind: "styles",
      },
      {
        name: "粗体",
        default: true,
        bind: "bold",
      },
      {
        name: "斜体",
        default: true,
        bind: "italic",
      },
      {
        name: "下划线",
        default: false,
        bind: "underline",
      },
      {
        name: "字体类型",
        default: true,
        bind: "fontfamily",
      },
      {
        name: "字体大小",
        default: true,
        bind: "fontsize",
      },
      {
        name: "字体颜色",
        default: true,
        bind: "forecolor",
      },
      {
        name: "字体对齐效果",
        default: false,
        bind: "aligncenter alignjustify alignleft alignright alignnone",
      },
      {
        name: "引用",
        default: false,
        bind: "blockquote",
      },
      {
        name: "首行缩进",
        default: false,
        bind: "indent2em",
      },
      {
        name: "设置行高",
        default: false,
        bind: "lineheight",
      },
      {
        name: "水平分割线",
        default: false,
        bind: "hr",
      },
      {
        name: "显示文本元素范围",
        default: false,
        bind: "visualblocks",
      },
      {
        name: "取消保存/保存",
        default: true,
        bind: "cancel save",
      },
      {
        name: "自动保存",
        default: false,
        bind: "restoredraft",
      },
      {
        name: "字体个数统计",
        default: false,
        bind: "wordcount",
      },
      {
        name: "高级无序列表",
        default: false,
        bind: "bullist",
      },
      {
        name: "高级有序列表",
        default: false,
        bind: "numlist",
      },
      {
        name: "插入时间",
        default: false,
        bind: "insertdatetime",
      },
      {
        name: "插入空格",
        default: false,
        bind: "nonbreaking",
      },
      {
        name: "插入分页符",
        default: false,
        bind: "pagebreak",
      },
      {
        name: "多图批量上传",
        default: false,
        bind: "axupimgs",
      },
      // {
      //   name: "引入word文档",
      //   default: false,
      //   bind: "importword",
      // },
      {
        name: "图片上传",
        default: false,
        bind: "image",
      },
      {
        name: "超链接插入",
        default: false,
        bind: "link",
      },
      {
        name: "视频上传",
        default: false,
        bind: "media",
      },
      {
        name: "代码样例",
        default: false,
        bind: "codesample",
      },
      {
        name: "特殊字符",
        default: false,
        bind: "charmap",
      },
      {
        name: "数学公式插入",
        default: false,
        bind: "kityformula-editor",
      },
      {
        name: "emoji表情插入",
        default: false,
        bind: "emoticons",
      },
      {
        name: "列表插入",
        default: false,
        bind: "table",
      },
      {
        name: "文字方向排列",
        default: false,
        bind: "ltr rtl",
      },
      {
        name: "预览",
        default: false,
        bind: "preview",
      },

      {
        name: "打印",
        default: false,
        bind: "print",
      },
      {
        name: "全屏",
        default: false,
        bind: "fullscreen",
      },
      {
        name: "帮助",
        default: false,
        bind: "help",
      },
    ],
  },
  {
    type: "radio",
    title: "工具栏超出部分显示模式",
    //关联哪个pinia中存储的属性
    rel: "toolbar_mode",
    content: [
      {
        name: "换行显示",
        default: false,
        bind: "wrap",
      },
      {
        name: "悬浮显示",
        default: false,
        bind: "floating",
      },
      {
        name: "侧栏显示",
        default: true,
        bind: "sliding",
      },
      {
        name: "滚动显示",
        default: false,
        bind: "scrolling",
      },
    ],
  },
  {
    type: "radio",
    title: "工具栏位置",
    //关联哪个pinia中存储的属性
    rel: "toolbar_location",
    content: [
      {
        name: "顶部",
        default: true,
        bind: "auto",
      },
      {
        name: "底部",
        default: false,
        bind: "bottom",
      },
    ],
  },
];
const changeVisible = () => {
  dialogVisible.value = true;
};
//通过给引入组件传入参数自定义需要使用的功能
const MyEditorItem = reactive({
  img_url: "",
  innerskin: "",
  outerskin: "",
  language: "",
  menubar: "",
  toolbar: "",
  plugins: "",
  toolbar_mode: "",
  toolbar_location: "",
  word: true,
  statusbar: true,
  elementpath: true,
  resize: false,
  skeletonScreen: true,
  textpattern_patterns: [],
});
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定要放弃这次的自定义编辑吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      dialogVisible.value = false;
      MyEditorItem.img_url = "http://localhost:8000/image";
      MyEditorItem.innerskin = "css/content.css";
      MyEditorItem.outerskin = "oxide";
      MyEditorItem.language = "en";
      MyEditorItem.menubar = "file edit tools help";
      MyEditorItem.toolbar_mode = "floating";
      MyEditorItem.toolbar_location = "auto";
      MyEditorItem.statusbar = true;
      MyEditorItem.elementpath = true;
      MyEditorItem.word = true;
      MyEditorItem.toolbar =
        "undo redo|bold italic|fontfamily fontsize forecolor|cancel save";
      MyEditorItem.plugins =
        "image link knowledge codesample code kityformula-editor table media preview save formatpainter wordcount fullscreen indent2em autolink quickbars";
    })
    .catch(() => {
      // catch error
    });
};
</script>
<style lang="less">
.tox-statusbar__branding,
.tox-promotion {
  display: none !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.el-dialog__title {
  display: block;
  font-size: 2.5em !important;
  font-weight: 600 !important;
  transform: translateY(10px) !important;
}
.el-dialog {
  transition: all 0.3s !important;
  border-radius: 0.3em !important;
}
.el-dialog:hover {
  box-shadow: 0 0 3px 3px #333 !important;
}
.handle {
  margin: 2em;
  width: 10em;
  padding-top: 1.3em !important;
  padding-bottom: 1.3em !important;
}
.btn-div {
  width: 95%;
  margin: 0 auto;
  padding: 0;
  height: 4.5rem;
  display: flex;
  justify-content: end;
  align-items: center;
}
#btn {
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 14px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 100px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
}

#btn:active,
#btn:hover {
  outline: 0;
}

#btn span {
  background-color: rgb(5, 6, 45);
  padding: 12px 20px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

#btn:hover span {
  background: none;
}

#btn:active {
  transform: scale(0.9);
}
</style>

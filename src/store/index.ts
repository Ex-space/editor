import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatusStore = defineStore("status", {
  state: () => {
    return {
      checked: ref<boolean>(true),
    };
  },
  actions: {
    changeStatus() {
      this.checked = !this.checked;
    },
  },
});
export const useEditorStore = defineStore("editor", {
  state: () => {
    return {
      menubar: ref<string>(""),
      toolbar: ref<string>(""),
      innerskin: ref<string>(""),
      toolbar_mode: ref<string>(""),
      toolbar_location: ref<string>(""),
      outerskin: ref<string>(""),
      language: ref<string>(""),
      img_url: ref<string>(""),
      plugins: ref<string>(
        "image link knowledge codesample code kityformula-editor table media preview save formatpainter wordcount fullscreen indent2em lineheight axupimgs lists,advlist autolink autosave charmap directionality emoticons help hr insertdatetime nonbreaking pagebreak preview print searchreplace visualblocks toc "
      ),
      resize: ref<boolean>(false),
      skeletonScreen: ref<boolean>(true),
      word: ref<boolean>(true),
      statusbar: ref<boolean>(true),
      elementpath: ref<boolean>(true),
      textpattern_patterns: ref([]),
    };
  },
  actions: {
    addMenuBar(menuItem: string) {
      if (
        typeof menuItem === "string" &&
        this.menubar.indexOf(menuItem) === -1
      ) {
        this.menubar += menuItem + " ";
      }
    },
    addToolBar(toolItem: string) {
      if (
        typeof toolItem === "string" &&
        this.toolbar.indexOf(toolItem) === -1
      ) {
        this.toolbar += toolItem + " ";
      }
    },
    addPlugins(plugin: string) {
      if (typeof plugin === "string" && this.plugins.indexOf(plugin) === -1) {
        this.plugins += plugin + " ";
      }
    },
    switchResize(resize: boolean) {
      this.resize = resize;
    },
    switchSkeletonScreen(skeletonScreen: boolean) {
      this.skeletonScreen = skeletonScreen;
    },
    switchStatusBar(statusbar: boolean) {
      this.statusbar = statusbar;
    },
    switchElementPath(elementpath: boolean) {
      this.elementpath = elementpath;
    },
    switchWord(word: boolean) {
      this.word = word;
      
    },
    chooseLanguage(language: string) {
      this.language = language;
    },
    chooseInnerSkin(innerskin: string) {
      this.innerskin = innerskin;
    },
    chooseOuterSkin(outerskin: string) {
      this.outerskin = outerskin;
    },
    chooseToolBarMode(mode: string) {
      this.toolbar_mode = mode;
    },
    chooseToolBarLocation(location: string) {
      this.toolbar_location = location;
    },
    chooseTextParttern(patterns: any) {
      this.textpattern_patterns = patterns;
    },
  },
});

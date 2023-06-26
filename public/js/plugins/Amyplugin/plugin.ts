import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  //注册按钮
  editor.ui.registry.addButton('media-7-n', {
    text: 'media-7-n button',
    //初始的行为
    onAction: () => {
      editor.setContent('<p>content added from media-7-n</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('media-7-n', setup);
};
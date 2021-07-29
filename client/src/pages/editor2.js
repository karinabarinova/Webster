import React from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from '@toast-ui/react-image-editor';
import FileSaver from 'file-saver';

export default function Editor2() {
    const src = 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg';
    // const history = useHistory()

  return (
    <div>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: 'img/sampleImage.jpg',
            name: 'SampleImage',
          },
          menu: ['shape', 'filter', 'crop', 'flip', 'draw', 'icon', 'text', 'mask', 'rotate', 'resize'],
          initMenu: 'filter',
          uiSize: {
            width: '100%',
            height: '90vh',
          },
          menuBarPosition: 'right',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    </div>
  )
}
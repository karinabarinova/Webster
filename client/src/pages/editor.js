import React from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';
import { useHistory } from 'react-router-dom';

export default function Editor() {
    const src = 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg';
    const history = useHistory()

  return (
    <div>
      <FilerobotImageEditor
        show={true}
        src={src}
        onClose={() => history.push('/account')}
      />
    </div>
  )
}
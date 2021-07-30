import React, { useState } from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';
import SelectImage from '../components/SelectImage';
import ImageGrid from '../components/ImageGrid';
import SaveImage from '../components/SaveImage';

export default function Editor() {
	const [src, setSrc] = useState('');
	const [newImgData, setNewImgData] = useState('');

  return (
    <div>
		<SelectImage setSrc={setSrc} newImgData={newImgData} />
		<ImageGrid newImgData={newImgData} setSrc={setSrc} />
    	<FilerobotImageEditor
			config={{ translations: { en: { 'header.image_editor_title': 'Webster Editor', } }, language: "en"}}
    		show={!!src}
    		src={src}
    		onClose={() => setSrc('')}
			onBeforeComplete={(props) => {return false}}
			onComplete={props => {
				setNewImgData(props.canvas)
			}}
    	/>
		<SaveImage newImgData={newImgData} setNewImgData={setNewImgData}/>
    </div>
  )
}
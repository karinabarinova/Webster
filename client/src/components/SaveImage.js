import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import canvasToImage from 'canvas-to-image';
import { jsPDF } from "jspdf";
import { generateName } from '../helpers/generateName';
import SocialModal from './SocialModal';
import { useDispatch } from "react-redux"
import { saveProject } from '../store/project/projectSlice';
import FileSaver from 'file-saver';

const useStyles = makeStyles((theme) => ({
	divFlex: {
		padding: '2rem',
		width: "700px",
    	height: "500px",
    	margin: "1rem auto",
    	border: "1px solid #ccc",
		borderRadius: "5px",
    	display: "flex",
    	alignItems: "center",
    	justifyContent: "space-evenly",
		flexWrap: 'wrap'
	},
	hidden: {
		display: 'none'
	},
	button: {
		backgroundColor: "#6C63FF", 
		color: 'white', 
		fontWeight: 700
	}
}));

export default function SaveImage({ newImgData, setNewImgData }) {
    const classes = useStyles();
	const [social, showSocial] = useState(false);
	const dispatch = useDispatch();

	function saveOnServer(canva, name, format) {
		canva.toBlob((blob) => {
			const formData = new FormData();
			formData.append('image', blob, `${name}.${format}`);
		  	dispatch(saveProject(formData))
			showSocial(!social)
		});
	}

	function downlaodImage(img, name) {
		FileSaver(img, name)
	}

    function saveAsJPG(canva) {
		const name = generateName();

		canvasToImage(canva, {
			name,
			type: 'jpg',
			quality: 1
		});

		saveOnServer(canva, name, 'jpg')
	}

	function saveAsJPEG(canva) {
		const name = generateName();

		const img = canva.toDataURL('image/jpeg')
		downlaodImage(img, name);
		saveOnServer(canva, name, 'jpg')
	}

	function saveAsWEBP(canva) {
		const name = generateName();

		const img = canva.toDataURL('image/webp')
		downlaodImage(img, name);
		saveOnServer(canva, name, 'webp')
	}

	function saveAsPNG(canva) {
		const name = generateName();

		canvasToImage(canva, {
			name,
			type: 'png',
			quality: 1
		});
		saveOnServer(canva, name, 'png')
	}

	function saveAsPDF(canva) {
		const name = generateName();

		const divImage = canva.toDataURL("image/png");
		const pdf = new jsPDF();
		pdf.addImage(divImage, 'PNG', 0, 0);
		pdf.save(`${name}.pdf`);
		saveOnServer(canva, name, 'pdf')
	}

    return (
        <div className={newImgData ? classes.divFlex : classes.hidden }>
			<Button
				variant="contained"
				component="label"
				className={classes.button}
				onClick={() => saveAsJPG(newImgData)}
			>
				Save  as  JPG
			</Button>
			<Button
				variant="contained"
				component="label"
				className={classes.button}
				onClick={() => saveAsPNG(newImgData)}
			>
				Save  as  PNG
			</Button>
			<Button
				variant="contained"
				component="label"
				className={classes.button}
				onClick={() => saveAsPDF(newImgData)}
			>
				Save  as  PDF
			</Button>
			<Button
				variant="contained"
				component="label"
				className={classes.button}
				onClick={() => saveAsJPEG(newImgData)}
			>
				Save  as  JPEG
			</Button>
			<SocialModal show={social} close={showSocial} setNewImgData={setNewImgData}/>
			<Button
				variant="contained"
				component="label"
				className={classes.button}
				onClick={() => saveAsWEBP(newImgData)}
			>
				Save  as  WEBP
			</Button>
			<SocialModal show={social} close={showSocial} setNewImgData={setNewImgData}/>
		</div>
    )
}
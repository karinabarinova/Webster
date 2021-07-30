import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import canvasToImage from 'canvas-to-image';
import { jsPDF } from "jspdf";
import { generateName } from '../helpers/generateName';

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
    	justifyContent: "space-evenly"
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

    function saveAsJPG(canva) {
		canvasToImage(canva, {
			name: generateName(),
			type: 'jpg',
			quality: 1
		});
		setNewImgData('')
	}

	function saveAsPNG(canva) {
		canvasToImage(canva, {
			name: generateName(),
			type: 'png',
			quality: 1
		});
		setNewImgData('')
	}

	function saveAsPDF(canva) {
		const divImage = canva.toDataURL("image/png");
		const pdf = new jsPDF();
		pdf.addImage(divImage, 'PNG', 0, 0);
		pdf.save(`${generateName()}.pdf`);
		setNewImgData('')
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
		</div>
    )
}
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	upload: {
		display: "flex",
		flexDirection: 'column',
		flexWrap: "wrap",
		alignContent: "space-around",
		alignItems: "center",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
		padding: '0 3rem'
	},
	div: {
		padding: '2rem'
	},
	container: {
		display: "flex",
		alignItems: "center"
	},
	border: {
		borderBottom: "2px solid lightgray",
		width: "3rem"
	},
	content: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		fontWeight: 500,
		fontSize: 22,
		color: "lightgray"
	},
	content1: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		fontWeight: 600,
		fontSize: 26,
		color: "#6C63FF"
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

export default function SelectImage({setSrc, newImgData}) {
	const { t } = useTranslation('common');
    const classes = useStyles();

    return (
        <div className={newImgData ? classes.hidden : classes.upload}>
			<div className={classes.div}>
				<Button
				  variant="contained"
				  component="label"
				  className={classes.button}
				>
			  		{t("UPLOAD_IMAGE")}
			  		<input
			    		type="file"
			    		hidden
						onChange={(e) => {
							e.preventDefault();
        					setSrc(e.target.files[0]);
						}}
			  		/>
				</Button>
			</div>
			<div className={classes.div, classes.container}>
				<div className={classes.border}/>
				<span className={classes.content}>{t("OR")}</span>
				<div className={classes.border}/>
			</div>
			<div className={classes.div}>
				<span className={classes.content1}>{t("SELECT_IMAGE")}</span>
			</div>
		</div>
    )
}

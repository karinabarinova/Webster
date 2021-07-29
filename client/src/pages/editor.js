import React, { useState } from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from '@material-ui/core/Button';

import itemData from './BackgroundData';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
		padding: '3rem'
	},
	gridList: {
		height: "auto"
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)"
	},
	image: {
		width: '500px',
		"&:hover": {
		  opacity: 0.25
		}
	},
	header: {
		fontSize: 25,
	},
	upload: {
		display: "flex",
		flexDirection: 'column',
		flexWrap: "wrap",
		alignContent: "space-around",
		alignItems: "center",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
		padding: '3rem 3rem 0 3rem'
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
	}
}));

export default function Editor() {
    const classes = useStyles();
	const [src, setSrc] = useState('');

  return (
    <div>
		<div className={classes.upload}>
			<div className={classes.div}>
				<Button
				  variant="contained"
				  component="label"
				>
			  		Upload File
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
				<span className={classes.content}>OR</span>
				<div className={classes.border}/>
			</div>
			<div className={classes.div}>
				<span className={classes.content1}>Select an image</span>
			</div>
		</div>
		<div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: "auto"}}>
            <ListSubheader className={classes.header} component="h3">Default Backgrounds</ListSubheader>
          </GridListTile>
          {itemData.map((tile, idx) => (
            <GridListTile key={idx} onClick={() => setSrc(tile.img)}>
              <img className={classes.image} src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    	<FilerobotImageEditor
    		show={!!src}
    		src={src}
    		onClose={() => setSrc('')}
    	/>
    </div>
  )
}
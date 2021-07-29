import React, { useState } from 'react';
import FilerobotImageEditor from 'filerobot-image-editor';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

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
	  }
}));

export default function Editor() {
    const classes = useStyles();
	const [src, setSrc] = useState('');

  return (
    <div>
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
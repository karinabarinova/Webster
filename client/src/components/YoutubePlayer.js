import ReactPlayer from 'react-player'
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
	gridList: {
		height: "auto"
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
	hidden: {
		display: 'none'
	},
}));

export default function YoutubePlayer() {
    const classes = useStyles();

    return (
        <GridList cellHeight={500} className={classes.gridList} cols={1}>
            <GridListTile key="Subheader" cols={1} style={{ height: "auto"}}>
                <ListSubheader className={classes.header} component="h3">Some Lo-Fi vibes🎹 for better work flow💻</ListSubheader>
            </GridListTile>
            <GridListTile>
                <ReactPlayer 
                    url='https://www.youtube.com/watch?v=0Iee8Jpg5Q8'
                    controls={true}
                    light={true}
                    style={{margin: '0 auto'}}
                />
            </GridListTile>
        </GridList>
    )
}

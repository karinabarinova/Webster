import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import itemData from '../helpers/BackgroundData';

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
	image: {
		width: '500px',
		"&:hover": {
		  opacity: 0.25
		}
	},
	header: {
		fontSize: 25,
	},
}));

export default function Inspire() {
    const classes = useStyles();
	const [images, setImages] = useState([])

	useEffect(() => {
		axios.get(`https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 25) + 1}&limit=20`)
		.then(({data}) => {
			setImages(data)
		})
		.catch(e => {
			console.log(e)
		})
	}, [])

    return (
        <div className={classes.root}>
            <GridList cellHeight={300} className={classes.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: "auto"}}>
                    <ListSubheader className={classes.header} component="h3">#GetInspired</ListSubheader>
                </GridListTile>
                {images.map((tile, idx) => (
                    <GridListTile key={idx}>
                        <img className={classes.image} src={tile.download_url} alt={tile.author} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
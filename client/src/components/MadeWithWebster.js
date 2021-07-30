import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../store/project/projectSlice';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
	hidden: {
		display: 'none'
	},
}));

export default function ImageGrid({newImgData, setSrc}) {
    const classes = useStyles();
    const projects = useSelector(({project}) => project.projects);
    const dispatch = useDispatch();
	const [index, setIndex] = useState(0);
	const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllProjects())
    }, [])

    if (!projects.length) return <h1>No projects found</h1>;
    return (
        <div className={newImgData ? classes.hidden : classes.root}>
            <GridList cellHeight={300} className={classes.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: "auto"}}>
                    <ListSubheader className={classes.header} component="h3">Designs made on our platform</ListSubheader>
                </GridListTile>
                {projects.map((tile, idx) => (
                    <GridListTile key={idx} onClick={() => {setIndex(idx); setOpen(true)}}>
                        <img className={classes.image} src={`http://localhost:3006/uploads/${tile.path.replace('resources\\uploads', '/')}`} alt={tile.path} />
                    </GridListTile>
                ))}
            </GridList>
			{open && (
				<Lightbox
				mainSrc={`http://localhost:3006/uploads/${projects[index].path.replace('resources\\uploads', '/')}`}
				nextSrc={`http://localhost:3006/uploads/${projects[(index + 1) % projects.length].path.replace('resources\\uploads', '/')}`}
				prevSrc={`http://localhost:3006/uploads/${projects[(index - 1) % projects.length].path.replace('resources\\uploads', '/')}`}
				onCloseRequest={() => setOpen(false)}
				onMovePrevRequest={() =>
				  setIndex((index - 1) >= 1 ? index - 1 : projects.length - 1)
				}
				onMoveNextRequest={() =>
					setIndex((index + 1) < projects.length - 1 ? index + 1 : 1)
				}
			  />
			)}
        </div>
    )
}
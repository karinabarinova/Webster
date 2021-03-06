import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import itemData from '../helpers/EmojiData';
import { useTranslation } from 'react-i18next';

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
		width: '300px',
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

export default function EmojiGrid({newImgData, setSrc}) {
	const { t } = useTranslation('common');
    const classes = useStyles();

    return (
        <div className={newImgData ? classes.hidden : classes.root}>
            <GridList cellHeight={300} className={classes.gridList} cols={4}>
                <GridListTile key="Subheader" cols={4} style={{ height: "auto"}}>
                    <ListSubheader className={classes.header} component="h3">{t("DEFAULT_EMOJI")}</ListSubheader>
                </GridListTile>
                {itemData.map((tile, idx) => (
                    <GridListTile key={idx} onClick={() => setSrc(tile.img)}>
                        <img className={classes.image} src={tile.img} alt={tile.title} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
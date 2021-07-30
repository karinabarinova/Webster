import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import HelmetMetaData from './HelmetMetaData';
import {
    FacebookShareButton, FacebookIcon, 
    TwitterShareButton, TwitterIcon, 
    WhatsappShareButton, WhatsappIcon, 
    LinkedinShareButton, LinkedinIcon,
    PinterestShareButton, PinterestIcon
} from "react-share";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
	socialMediaPopper: {
        top: "300px  !important",
        left: "unset !important",
        right: "0px !important",
        display: "flex",
        justifyContent: 'space-around',
        padding: '2rem',
    },
    socialMediaButton: {
        height: '40px',
        width: '40px',
        "&:hover > svg": {
          height: "50px !important",
          width: "50px !important",
        },
      }
}));


export default function SocialModal({show, close, setNewImgData}) {
    const classes = useStyles();

    function closeModal() {
        close(false)
        setNewImgData('')
    }
    return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={show}>
        <DialogTitle id="customized-dialog-title" onClose={closeModal}>
          Share on social media
        </DialogTitle>
        <DialogContent dividers className={classes.socialMediaPopper}>
            <HelmetMetaData></HelmetMetaData>
            <FacebookShareButton
                url={"http://webster.com"}
                quote={"Webster Image Editor"}
                hashtag="#webster"
                className={classes.socialMediaButton}
            >
                <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
                url={"http://webster.com"}
                title={"Webster Image Editor"}
                hashtag="#webster"
                className={classes.socialMediaButton}
            >
                <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={"http://webster.com"}
                title={"Webster Image Editor"}
                separator=":: "
                className={classes.socialMediaButton}
            >
                <WhatsappIcon size={36} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
                url={"http://webster.com"}
                title={"Webster Image Editor"}
                summary={"Checkout the design I created with the amazing service - Webster Image Editor"}
                className={classes.socialMediaButton}
            >
                <LinkedinIcon size={36} round={true} />
            </LinkedinShareButton>
            <PinterestShareButton
                url={"http://webster.com"}
                media={"https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"}
                description ={"Checkout the design I created with the amazing service - Webster Image Editor"}
                className={classes.socialMediaButton}
            >
                <PinterestIcon size={36} round={true} />
            </PinterestShareButton>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
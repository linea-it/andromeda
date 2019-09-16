import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
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
}));

function CustomDialog({
  visible,
  setVisible,
  title,
  content,
  maxWidth,
  headerStyle,
  bodyStyle,
}) {
  const classes = useStyles();

  return (
    <Dialog onClose={setVisible} maxWidth={maxWidth} aria-labelledby="customized-dialog-title" open={visible}>
      <MuiDialogTitle className={clsx(classes.root, headerStyle)}>
        <Typography variant="h6">{ title }</Typography>
        {visible ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={setVisible}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
      <DialogContent dividers className={bodyStyle}>
        <Typography gutterBottom>
          {content && content.props.data && content.props.data.length ? content : (
            'Unable to generate log due to a lack of data!'
          )}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  visible: false,
  title: '',
  maxWidth: '100%',
  headerStyle: null,
  bodyStyle: null,
};

CustomDialog.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.symbol,
  ]).isRequired,
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  headerStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  bodyStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default CustomDialog;

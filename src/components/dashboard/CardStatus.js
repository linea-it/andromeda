import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const useStyles = makeStyles(({
  card: {
    display: 'flex',
    boxShadow: 'none',
    borderLeft: '4px solid blue',
    position: 'relative',
  },
  content: {
    flex: '1 0 auto',
  },
  iconCard: {
    position: 'absolute',
    right: 5,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 26,
    opacity: 0.12,
  },
}));

function CardStatus(props) {
  const classes = useStyles();
  const { title, services } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {services}
        </Typography>
        <Icon className={clsx(classes.iconCard, 'fas', 'fa-server')} />
      </CardContent>
    </Card>
  );
}

CardStatus.defaultProps = {
  title: '',
  services: 0,
};

CardStatus.propTypes = {
  title: PropTypes.string,
  services: PropTypes.number,
};


export default CardStatus;

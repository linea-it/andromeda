import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

function CardStatus(props) {
  const {
    title, services, color, icon,
  } = props;

  const useStyles = makeStyles(({
    card: {
      display: 'flex',
      borderLeft: `4px solid ${color}`,
      position: 'relative',
    },
    content: {
      flex: '1 0 auto',
    },
    iconCard: {
      position: 'absolute',
      right: 15,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 26,
      opacity: 0.12,
      width: 'auto',
    },
    title: {
      color,
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: 'bold',
    },
    services: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }));

  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, classes.cardColor)}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.services}>
          {services}
        </Typography>
        <Icon className={clsx(classes.iconCard, 'fas', icon)} />
      </CardContent>
    </Card>
  );
}

CardStatus.defaultProps = {
  title: '',
  services: 0,
  color: '',
  icon: '',
};

CardStatus.propTypes = {
  title: PropTypes.string,
  services: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.string,
};


export default CardStatus;

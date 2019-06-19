import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  card: {
    display: 'flex',
    boxShadow: 'none',
    borderLeft: '4px solid blue',
  },
  content: {
    flex: '1 0 auto',
  },
}));

function CardStatus() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          Servers
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          20
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardStatus;

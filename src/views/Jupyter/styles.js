import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  cardsContainer: {
    paddingTop: 20,
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '400',
    color: '#5a5c69',
    marginBottom: 0,
  },
  imgResponsive: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
  autoMargin: {
    margin: '-2px auto!important',
  },
}));

export default styles;

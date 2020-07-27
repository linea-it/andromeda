import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  card: {
    minHeight: 530,
    overflow: 'auto',
  },
  cardHeader: {
    backgroundColor: 'rgb(248, 249, 252)',
    borderBottom: '1px solid rgb(227, 230, 240)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerTitle: {
    color: '#34465d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  closeIcon: {
    width: '.5em',
    height: '.5em',
  },
  plotTitle: {
    fontSize: 16,
    width: '100%',
    float: 'left',
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
  },
  cardsContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  imgResponsive: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

export default styles;

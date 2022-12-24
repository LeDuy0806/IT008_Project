import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    commentsOuterContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    commentsInnerContainer: {
        // height: '140px',
        // overflowY: 'auto',
        marginRight: '30px',
    },
    commentWrapper: {
        marginTop: '10px',
    },
}));

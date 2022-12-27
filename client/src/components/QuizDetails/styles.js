import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '80%',
        maxHeight: '400px',
        // marginTop: '10px',
        // marginRight: '20px',
    },
    card: {
        display: 'flex',
        flex: '1',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column',
        },
    },
    imageSection: {
        // display: 'flex',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        paddingLeft: '30px',
        paddingTop: '34px',
    },
    info: {
        marginTop: '12px',
    },
    questions: {
        flex: 2,
        background: '#f2f2f2',
        paddingLeft: '24px',
        paddingTop: '34px',
    },
    recommendedQuizes: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '100vh',
    },
}));

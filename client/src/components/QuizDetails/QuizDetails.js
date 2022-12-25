import React, { useEffect } from 'react';
import {
    // Paper,
    Typography,
    // CircularProgress,
    Divider,
    // Backdrop,
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
// import Quiz from '../Quizes/Quiz/Quiz';
import Question from './Question/Question';
import CommentSection from './CommentSection/CommentSection';
import { getQuiz, getQuizesBySearch } from '../../actions/quiz';
import useStyles from './styles';
import defaultQuizBackground from '../../assets/defaultQuizBackground.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Post = () => {
    const { quiz, isLoading } = useSelector((state) => state.quiz);
    const isLanguageEnglish = useSelector((state) => state.language.isEnglish);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getQuiz(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (quiz) {
            dispatch(
                getQuizesBySearch({
                    search: 'none',
                    tags: quiz?.tags.join(','),
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (!quiz) return null;

    if (isLoading || quiz === null) {
        return (
            // <Paper elevation={6} className={classes.loadingPaper}>
            //     <Backdrop
            //         sx={{ color: '#333', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            //     >
            //         <CircularProgress color="inherit" />
            //     </Backdrop>
            //     <CircularProgress size="3em" />
            // </Paper>


            <div className={classes.card}>
                {/* Background Image */}
                <div className={classes.imageSection}>
                    <div >
                        <Skeleton style={{ height: "200px", width: "100%" }} />
                    </div>

                    <div className={classes.info}>
                        <Typography variant="h3" component="h2">
                            <Skeleton />
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            color="textSecondary"
                            component="h2"
                        >
                            <Skeleton />
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p">
                            <Skeleton />
                        </Typography>
                        <Typography variant="h6">
                            <Skeleton />
                        </Typography>
                        <Typography variant="body1">
                            <Skeleton />
                        </Typography>

                        <CommentSection quiz={null} />
                    </div>
                </div>

                <div className={classes.questions} style={{ marginLeft: "40px" }}>
                    <div>
                        <Typography gutterBottom variant="h5">
                            <Skeleton />
                        </Typography>
                        {/* <Divider /> */}

                        <Question quiz={null} />
                        <Question quiz={null} />
                        <Question quiz={null} />
                        <Divider style={{ marginBottom: '20px' }} />
                    </div>
                </div>
            </div>
        );
    }

    // const recommendedQuizes = quizes.filter(({ _id }) => _id !== quiz._id);

    return (
        // <Paper style={{ height: '100%', padding: '40px 50px' }} elevation={6}>
        <div className={classes.card}>
            {/* Background Image */}
            <div className={classes.imageSection}>
                {quiz.backgroundImage ? (
                    <img
                        className={classes.media}
                        src={quiz.backgroundImage}
                        alt=""
                    />
                ) : (
                    <img
                        className={classes.media}
                        src={defaultQuizBackground}
                        alt=""
                    />
                )}

                <div className={classes.info}>
                    <Typography variant="h3" component="h2">
                        {quiz.name}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {quiz.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {quiz.description}
                    </Typography>
                    <Typography variant="h6">
                        {isLanguageEnglish ? 'Created by: ' : 'Tạo bởi: '}
                        {quiz.creatorName}
                    </Typography>
                    <Typography variant="body1">
                        {moment(quiz.dateCreated).fromNow()}
                    </Typography>

                    <CommentSection quiz={quiz} />
                </div>
            </div>

            <div className={classes.questions}>
                {/* Render Question List */}
                {quiz.questionList.length > 0 && (
                    <div>
                        <Typography gutterBottom variant="h5">
                            {isLanguageEnglish
                                ? 'Question list:'
                                : 'Danh sách câu hỏi:'}
                        </Typography>
                        {/* <Divider /> */}
                        {quiz.questionList.map((question) => (
                            <Question key={question._id} question={question} />
                        ))}
                        <Divider style={{ marginBottom: '20px' }} />
                    </div>
                )}

                {/* {recommendedQuizes.length > 0 && (
                    <div>
                        <Typography gutterBottom variant="h5">
                            {isLanguageEnglish
                                ? 'You might also like:'
                                : 'Bạn cũng có thể thích nó:'}
                        </Typography>
                        <Divider />
                        {recommendedQuizes.map((quiz) => (
                            <Quiz key={quiz._id} quiz={quiz} />
                        ))}
                    </div>
                )} */}
            </div>
        </div>
        //</Paper>
    );
};

export default Post;

import React, { useState, useEffect } from 'react';
import styles from './quizCreator.module.css';
import QuestionListItem from './QuestionListItem/QuestionListItem';
import AnswerInput from './AnswerInput/AnswerInput';
import triangle from '../../assets/triangle.svg';
import diamond from '../../assets/diamond.svg';
import circle from '../../assets/circle.svg';
import square from '../../assets/square.svg';
import questionType from '../../assets/questionType.svg';
import timer from '../../assets/timer.svg';
import gamePoints from '../../assets/gamePoints.svg';
import answerOptions from '../../assets/answerOptions.svg';
import backgroundIcon from '../../assets/background_icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuiz, getQuiz } from '../../actions/quiz';
import FileBase from 'react-file-base64';
import { useParams, useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function QuizCreator() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const isLanguageEnglish = useSelector((state) => state.language.isEnglish);

    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [quizData, setQuizData] = useState({
        name: '',
        creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
        backgroundImage: '',
        description: '',
        pointsPerQuestion: 1,
        numberOfQuestions: 0,
        isPublic: true,
        tags: [],
        questionList: [],
    });

    const [questionData, setQuestionData] = useState({
        questionType: 'Quiz',
        pointType: 'Standard',
        answerTime: 5,
        backgroundImage: '',
        question: '',
        answerList: [
            { name: 'a', body: '', isCorrect: false },
            { name: 'b', body: '', isCorrect: false },
            { name: 'c', body: '', isCorrect: false },
            { name: 'd', body: '', isCorrect: false },
        ],
        questionIndex: 1,
    });

    useEffect(() => {
        dispatch(getQuiz(id));
    }, [id]);

    const { quiz } = useSelector((state) => state.quiz);

    useEffect(() => {
        if (quiz) {
            setQuizData(quiz);
        }
    }, [quiz]);

    const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false);
    const [isQuizPublic, setIsQuizPublic] = useState(true);
    const [isQuestionDataSave, setIsQuestionDataSave] = useState(false);
    const [questionImage, setQuestionImage] = useState('');
    const [quizImage, setQuizImage] = useState('');

    const showQuizOptions = () => {
        setIsQuizOptionsVisible(
            (prevIsQuizOptionsVisible) => !prevIsQuizOptionsVisible,
        );
    };

    const setCorrectAnswer = (index) => {
        setQuestionData((prevState) => ({
            ...prevState,
            answerList: [
                ...prevState.answerList.slice(0, index),
                {
                    name: prevState.answerList[index].name,
                    body: prevState.answerList[index].body,
                    isCorrect: !prevState.answerList[index].isCorrect,
                },
                ...prevState.answerList.slice(
                    index + 1,
                    prevState.answerList.length,
                ),
            ],
        }));

        questionData.answerList[index].isCorrect
            ? setCorrectAnswerCount((prevState) => prevState - 1)
            : setCorrectAnswerCount((prevState) => prevState + 1);
    };

    const handleQuizSubmit = (e) => {
        dispatch(updateQuiz(quiz._id, quizData));
        history.push(`/myquizes`);
    };

    const handleQuizChange = (e) => {
        setQuizData({ ...quizData, [e.target.name]: e.target.value });
    };

    const updateAnswer = (name, body, index) => {
        setQuestionData((prevState) => ({
            ...prevState,
            answerList: [
                ...prevState.answerList.slice(0, index),
                {
                    name: name,
                    body: body,
                    isCorrect: prevState.answerList[index].isCorrect,
                },
                ...prevState.answerList.slice(
                    index + 1,
                    prevState.answerList.length,
                ),
            ],
        }));
    };

    const validateAnswerFields = () => {
        return questionData.answerList.every((answer) => answer.body !== '');
    };

    const validateCorrectAnswer = () => {
        return questionData.answerList.some(
            (answer) => answer.isCorrect === true,
        );
    };

    // ===== Code start =====
    const NotifyEnterQues = {
        Eng: 'Enter your question',
        Vie: 'Nhập nội dung của câu hỏi',
    };

    const NotifyEnterAnswer = {
        Eng: 'Enter your answer',
        Vie: 'Nhập nội dung của câu trả lời',
    };

    const NotifyChooseAnswer = {
        Eng: 'Choose correct answer',
        Vie: 'Chọn câu trả lời đúng',
    };

    const handleNotify = () => {
        let text = '';
        if (questionData.question === '') {
            text = isLanguageEnglish
                ? NotifyEnterQues.Eng
                : NotifyEnterQues.Vie;
        } else if (!validateCorrectAnswer()) {
            text = isLanguageEnglish
                ? NotifyEnterAnswer.Eng
                : NotifyEnterAnswer.Vie;
        } else if (!validateCorrectAnswer()) {
            text = isLanguageEnglish
                ? NotifyChooseAnswer.Eng
                : NotifyChooseAnswer.Vie;
        }

        toast.warning(text, {
            style: {
                color: '#fff',
            },
            position: 'top-center',
            autoClose: 3000,
            theme: 'dark',
        });
    };

    const handleQuestionSubmit = () => {
        if (questionData.question === '') {
            handleNotify();
        } else if (!validateAnswerFields()) {
            handleNotify();
        } else if (!validateCorrectAnswer()) {
            handleNotify();
        } else {
            setIsQuestionDataSave(true);
            // if true it means question already exist and is only updated
            if (
                quizData.questionList.filter(
                    (question) =>
                        question.questionIndex === questionData.questionIndex,
                )
            ) {
                //update list of questions in quizData
                setQuizData((prevState) => ({
                    ...prevState,
                    questionList: [
                        ...prevState.questionList.slice(
                            0,
                            questionData.questionIndex - 1,
                        ),
                        questionData,
                        ...prevState.questionList.slice(
                            questionData.questionIndex,
                            prevState.questionList.length,
                        ),
                    ],
                }));
            } else {
                //question don't exist - add new one
                setQuizData({
                    ...quizData,
                    questionList: [...quizData.questionList, questionData],
                });
            }
        }
    };
    // ===== Code end =====

    const handleQuestionRemove = () => {
        let index = questionData.questionIndex;
        setQuizData((prevState) => ({
            ...prevState,
            questionList: [
                ...prevState.questionList.slice(0, index - 1),
                ...prevState.questionList.slice(
                    index,
                    prevState.questionList.length,
                ),
            ],
        }));
        //update indexes
        quizData.questionList.forEach((question) => {
            if (question.questionIndex > index) {
                question.questionIndex -= 1;
            }
        });
        //display previous question or new first one if first was deleted
        if (quizData.questionList.length > 1 && index > 1) {
            showQuestion(index - 1);
        } else if (quizData.questionList.length > 1 && index === 1) {
            showQuestion(1);
        } else {
            clear();
        }
        setCorrectAnswerCount(0);
    };

    const clear = () => {
        setQuestionData({
            questionType: 'Quiz',
            pointType: 'Standard',
            answerTime: 5,
            backgroundImage: '',
            question: '',
            answerList: [
                { name: 'a', body: '', isCorrect: false },
                { name: 'b', body: '', isCorrect: false },
                { name: 'c', body: '', isCorrect: false },
                { name: 'd', body: '', isCorrect: false },
            ],
            questionIndex: quizData.questionList.length + 1,
        });
        setQuestionImage('');
    };

    const addNewQuestion = () => {
        setIsQuestionDataSave(false);
        clear();
        setIsQuestionTrueFalse(false);
        setCorrectAnswerCount(0);
    };

    const handleQuestionChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const showQuestion = (index) => {
        var question = quizData.questionList.find(
            (question) => question.questionIndex === index,
        );
        setQuestionData(question);
        setQuestionImage(question.backgroundImage);
        question.questionType === 'True/False'
            ? setIsQuestionTrueFalse(true)
            : setIsQuestionTrueFalse(false);
    };

    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
    const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1);

    const changeMaxCorrectAnswerCount = (e) => {
        setMaxCorrectAnswerCount(e.target.value);
        questionData.answerList.forEach((answer) => (answer.isCorrect = false));
        setCorrectAnswerCount(0);
    };

    const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false);
    const changeQuestionType = () => {
        setIsQuestionTrueFalse((prevState) => !prevState);
        if (!isQuestionTrueFalse) {
            questionData.answerList.splice(2, 2);
        } else {
            questionData.answerList.push({
                name: 'c',
                body: '',
                isCorrect: false,
            });
            questionData.answerList.push({
                name: 'd',
                body: '',
                isCorrect: false,
            });
        }
        questionData.answerList[0].body = 'True';
        questionData.answerList[1].body = 'False';
        setMaxCorrectAnswerCount(1);
        questionData.answerList.forEach((answer) => (answer.isCorrect = false));
        setCorrectAnswerCount(0);
    };

    if (user === null) {
        return (
            <h1>
                {isLanguageEnglish
                    ? 'Log in to your teacher account to create quizzes'
                    : 'Đăng nhập vào tài khoản giáo viên của bạn để tạo bài kiểm tra'}
            </h1>
        );
    } else if (user.result.userType !== 'Teacher') {
        return (
            <h1>
                {isLanguageEnglish
                    ? 'Only teacher accounts are allowed to create quizzes'
                    : 'Chỉ tài khoản giao viên mới được tạo bài kiểm tra'}
            </h1>
        );
    }

    return (
        <section className={styles.section}>
            <div className={styles['question-list']}>
                <div className={styles['quiz-info']}>
                    <h1>
                        {quizData.name.length > 0
                            ? quizData.name.length > 8
                                ? quizData.name.substring(0, 20) + '...'
                                : quizData.name
                            : isLanguageEnglish
                            ? 'Set quiz name'
                            : 'Nhập tên bài kiểm tra'}
                    </h1>
                </div>
                <div className={styles['quiz-info-container']}>
                    <button
                        className={styles['quiz-info-button']}
                        onClick={showQuizOptions}
                    >
                        {isLanguageEnglish ? 'Settings' : 'Cài đặt'}
                    </button>
                    <button
                        className={styles['quiz-info-button']}
                        onClick={handleQuizSubmit}
                    >
                        {isLanguageEnglish ? 'Exit' : 'Thoát'}
                    </button>
                </div>
                <div className={styles['question-list-container']}>
                    {quizData.questionList.length > 0 &&
                        quizData.questionList.map((question) => (
                            <QuestionListItem
                                onClick={() =>
                                    showQuestion(question.questionIndex)
                                }
                                key={question.questionIndex}
                                number={question.questionIndex}
                                type={question.questionType}
                                name={question.question}
                                time={question.answerTime}
                                image={question.backgroundImage}
                            />
                        ))}

                    <div className={styles['add-question-container']}>
                        <button
                            onClick={() => {
                                isQuestionDataSave
                                    ? addNewQuestion()
                                    : alert(
                                          isLanguageEnglish
                                              ? 'Save changes in question data first'
                                              : 'Lưu các thay đổi trong câu hỏi trước tiên',
                                      );
                            }}
                            className={styles['add-question-button']}
                        >
                            {isLanguageEnglish
                                ? 'Add question'
                                : 'Thêm câu hỏi'}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles['question-creator']}>
                <input
                    type="text"
                    name="question"
                    value={questionData.question}
                    onChange={handleQuestionChange}
                    placeholder={
                        isLanguageEnglish
                            ? 'Start typing your question'
                            : 'Bắt đầu nhập câu hỏi của bạn'
                    }
                    className={styles['question-name']}
                />
                <div className={styles['image-container']}>
                    {questionImage ? (
                        <img
                            src={questionImage}
                            alt=""
                            className={styles['question-image']}
                        />
                    ) : (
                        <div>
                            <h3>
                                {isLanguageEnglish
                                    ? 'Find and insert media'
                                    : 'Tìm và chèn ảnh'}
                            </h3>
                        </div>
                    )}
                </div>
                <div className={styles['answers-container']}>
                    <div className={styles['answer-field']}>
                        <AnswerInput
                            value={questionData.answerList[0].body}
                            name={'a'}
                            onChange={(e) => {
                                isQuestionTrueFalse
                                    ? updateAnswer(e.target.name, 'True', 0)
                                    : updateAnswer(
                                          e.target.name,
                                          e.target.value,
                                          0,
                                      );
                            }}
                            onClick={() => {
                                correctAnswerCount < maxCorrectAnswerCount ||
                                questionData.answerList[0].isCorrect
                                    ? setCorrectAnswer(0)
                                    : alert(
                                          isLanguageEnglish
                                              ? 'You already choose the correct answer'
                                              : 'Bạn đã chọn câu trả lời đúng',
                                      );
                            }}
                            isAnswerCorrect={
                                questionData.answerList[0].isCorrect
                            }
                            svg={triangle}
                        />
                    </div>
                    <div className={styles['answer-field']}>
                        <AnswerInput
                            value={questionData.answerList[1].body}
                            name={'b'}
                            onChange={(e) => {
                                isQuestionTrueFalse
                                    ? updateAnswer(e.target.name, 'False', 1)
                                    : updateAnswer(
                                          e.target.name,
                                          e.target.value,
                                          1,
                                      );
                            }}
                            onClick={() => {
                                correctAnswerCount < maxCorrectAnswerCount ||
                                questionData.answerList[1].isCorrect
                                    ? setCorrectAnswer(1)
                                    : alert(
                                          isLanguageEnglish
                                              ? 'You already choose the correct answer'
                                              : 'Bạn đã chọn câu trả lời đúng',
                                      );
                            }}
                            isAnswerCorrect={
                                questionData.answerList[1].isCorrect
                            }
                            svg={diamond}
                        />
                    </div>
                    {!isQuestionTrueFalse && (
                        <>
                            <div className={styles['answer-field']}>
                                <AnswerInput
                                    value={questionData.answerList[2].body}
                                    name={'c'}
                                    onChange={(e) =>
                                        updateAnswer(
                                            e.target.name,
                                            e.target.value,
                                            2,
                                        )
                                    }
                                    onClick={() => {
                                        correctAnswerCount <
                                            maxCorrectAnswerCount ||
                                        questionData.answerList[2].isCorrect
                                            ? setCorrectAnswer(2)
                                            : alert(
                                                  isLanguageEnglish
                                                      ? 'You already choose the correct answer'
                                                      : 'Bạn đã chọn câu trả lời đúng',
                                              );
                                    }}
                                    isAnswerCorrect={
                                        questionData.answerList[2].isCorrect
                                    }
                                    svg={circle}
                                />
                            </div>
                            <div className={styles['answer-field']}>
                                <AnswerInput
                                    value={questionData.answerList[3].body}
                                    name={'d'}
                                    onChange={(e) =>
                                        updateAnswer(
                                            e.target.name,
                                            e.target.value,
                                            3,
                                        )
                                    }
                                    onClick={() => {
                                        correctAnswerCount <
                                            maxCorrectAnswerCount ||
                                        questionData.answerList[3].isCorrect
                                            ? setCorrectAnswer(3)
                                            : alert(
                                                  isLanguageEnglish
                                                      ? 'You already choose the correct answer'
                                                      : 'Bạn đã chọn câu trả lời đúng',
                                              );
                                    }}
                                    isAnswerCorrect={
                                        questionData.answerList[3].isCorrect
                                    }
                                    svg={square}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.options}>
                <div
                    style={{ display: isQuizOptionsVisible ? 'flex' : 'none' }}
                    className={styles['question-options']}
                >
                    <div>
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish ? 'Title' : 'Tiêu đề'}
                            </label>
                        </div>
                        <textarea
                            value={quizData.name}
                            type="text"
                            name="name"
                            onChange={handleQuizChange}
                            className={styles['option-input']}
                            rows={1}
                        />
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish ? 'Description' : 'Mô tả'}
                            </label>
                        </div>
                        <textarea
                            value={quizData.description}
                            type="text"
                            name="description"
                            onChange={handleQuizChange}
                            className={styles['option-input']}
                            rows={4}
                        />
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish
                                    ? 'Points per question'
                                    : 'Điểm cho câu hỏi'}
                            </label>
                        </div>
                        <input
                            type="number"
                            min={1}
                            value={quizData.pointsPerQuestion}
                            name="pointsPerQuestion"
                            onChange={handleQuizChange}
                            className={styles['option-input']}
                        />
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish ? 'Access' : 'Chế độ'}
                            </label>
                        </div>
                        <div className={styles['access-container']}>
                            <button
                                onClick={() => {
                                    setIsQuizPublic(true);
                                    setQuizData({
                                        ...quizData,
                                        isPublic: true,
                                    });
                                }}
                                className={styles['option-button']}
                                style={{
                                    backgroundColor: isQuizPublic
                                        ? 'rgb(19, 104, 206)'
                                        : 'inherit',
                                    color: isQuizPublic
                                        ? 'white'
                                        : 'rgb(110, 110, 110)',
                                }}
                            >
                                {isLanguageEnglish ? 'Public' : 'Công cộng'}
                            </button>
                            <button
                                onClick={() => {
                                    setIsQuizPublic(false);
                                    setQuizData({
                                        ...quizData,
                                        isPublic: false,
                                    });
                                }}
                                className={styles['option-button']}
                                style={{
                                    backgroundColor: isQuizPublic
                                        ? 'inherit'
                                        : 'rgb(19, 104, 206)',
                                    color: isQuizPublic
                                        ? 'rgb(110, 110, 110)'
                                        : 'white',
                                }}
                            >
                                {isLanguageEnglish ? 'Private' : 'Riêng tư'}
                            </button>
                        </div>
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish
                                    ? 'Background Image'
                                    : 'Hình nền'}
                            </label>
                        </div>
                        <div className={styles['option-input-file']}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => {
                                    setQuizData({
                                        ...quizData,
                                        backgroundImage: base64,
                                    });
                                    setQuizImage(base64);
                                }}
                            />
                        </div>
                        {quizImage && (
                            <img
                                className={styles['quiz-image']}
                                src={quizImage}
                                alt=""
                            />
                        )}
                        <div className={styles['option-label']}>
                            <label>
                                {isLanguageEnglish
                                    ? 'Tags (comma separated)'
                                    : 'Tags (riêng biệt bởi dấu phẩy)'}
                            </label>
                        </div>
                        <input
                            type="text"
                            value={quizData.tags}
                            name="tags"
                            onChange={(e) =>
                                setQuizData({
                                    ...quizData,
                                    tags: e.target.value.split(','),
                                })
                            }
                            className={styles['option-input']}
                        />
                    </div>
                    <div className={styles['option-button-container']}>
                        <button
                            className={styles['option-button']}
                            onClick={handleQuizSubmit}
                        >
                            {isLanguageEnglish ? 'Submit' : 'Hoàn thành'}
                        </button>
                    </div>
                </div>

                <div
                    style={{ display: isQuizOptionsVisible ? 'none' : 'flex' }}
                    className={styles['question-options']}
                >
                    <div>
                        <div className={styles.option}>
                            <div className={styles['option-label']}>
                                <img src={questionType} alt="" />
                                <label>
                                    {isLanguageEnglish
                                        ? 'Question type'
                                        : 'Loại câu hỏi'}
                                </label>
                            </div>
                            <select
                                onChange={(e) => {
                                    handleQuestionChange(e);
                                    changeQuestionType();
                                }}
                                name="questionType"
                                value={questionData.questionType}
                            >
                                <option defaultValue disabled>
                                    {isLanguageEnglish
                                        ? 'Select question type'
                                        : 'Chọn loại câu hỏi'}
                                </option>
                                <option value="Quiz">
                                    {isLanguageEnglish ? 'Quiz' : 'Câu hỏi'}
                                </option>
                                <option value="True/False">
                                    {isLanguageEnglish
                                        ? 'True/False'
                                        : 'Đúng/Sai'}
                                </option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <div className={styles['option-label']}>
                                <img src={timer} alt="" />
                                <label>
                                    {isLanguageEnglish
                                        ? 'Time limit'
                                        : 'Thời gian giới hạn'}
                                </label>
                            </div>
                            <select
                                onChange={handleQuestionChange}
                                name="answerTime"
                                value={questionData.answerTime}
                            >
                                <option defaultValue disabled>
                                    {isLanguageEnglish
                                        ? 'Set time limit'
                                        : 'Đặt thời gian giới hạn'}
                                </option>
                                <option value={5}>
                                    5 {isLanguageEnglish ? 'seconds' : 'giây'}
                                </option>
                                <option value={10}>
                                    10 {isLanguageEnglish ? 'seconds' : 'giây'}
                                </option>
                                <option value={20}>
                                    20 {isLanguageEnglish ? 'seconds' : 'giây'}
                                </option>
                                <option value={30}>
                                    30 {isLanguageEnglish ? 'seconds' : 'giây'}
                                </option>
                                <option value={60}>
                                    1 {isLanguageEnglish ? 'minute' : 'phút'}
                                </option>
                                <option value={90}>
                                    1,5 {isLanguageEnglish ? 'minute' : 'phút'}
                                </option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <div className={styles['option-label']}>
                                <img src={gamePoints} alt="" />
                                <label>
                                    {isLanguageEnglish ? 'Points' : 'Điểm'}
                                </label>
                            </div>
                            <select
                                onChange={handleQuestionChange}
                                name="pointType"
                                value={questionData.pointType}
                            >
                                <option defaultValue disabled>
                                    {isLanguageEnglish
                                        ? 'Set points type'
                                        : 'Chọn loại điểm thưởng'}
                                </option>
                                <option value="Standard">
                                    {isLanguageEnglish
                                        ? 'Standard'
                                        : 'Tiêu chuẩn'}
                                </option>
                                <option value="Double">
                                    {isLanguageEnglish ? 'Double' : 'gấp đôi'}
                                </option>
                                <option value="BasedOnTime">
                                    {isLanguageEnglish
                                        ? 'Based on Time'
                                        : 'Dựa trên thời gian phản hồi'}
                                </option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <div className={styles['option-label']}>
                                <img src={answerOptions} alt="" />
                                <label>
                                    {isLanguageEnglish
                                        ? 'Answer options'
                                        : 'Tùy chọn câu trả lời'}
                                </label>
                            </div>
                            <select onChange={changeMaxCorrectAnswerCount}>
                                <option defaultValue disabled value="1">
                                    {isLanguageEnglish
                                        ? 'Set answer options'
                                        : 'Chọn tùy chọn trả lời'}
                                </option>
                                <option value="1">
                                    {isLanguageEnglish
                                        ? 'Single choice'
                                        : 'Đơn lựa chọn'}
                                </option>
                                <option value="4">
                                    {isLanguageEnglish
                                        ? 'Multiple choice'
                                        : 'Đa lựa chọn'}
                                </option>
                            </select>
                        </div>

                        <div className={styles.option}>
                            <div className={styles['option-label']}>
                                <img src={backgroundIcon} alt="" />
                                <label>
                                    {isLanguageEnglish
                                        ? 'Background Question'
                                        : 'Hình nền câu hỏi'}
                                </label>
                            </div>
                            <div className={styles['file-option']}>
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setQuestionData({
                                            ...questionData,
                                            backgroundImage: base64,
                                        });
                                        setQuestionImage(base64);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles['option-button-container']}>
                        <button
                            onClick={handleQuestionSubmit}
                            className={styles['option-button']}
                        >
                            {isLanguageEnglish ? 'Save' : 'lưu'}
                        </button>
                        <button
                            onClick={handleQuestionRemove}
                            className={styles['option-button']}
                        >
                            {isLanguageEnglish ? 'Delete' : 'Xóa'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuizCreator;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./myQuiz.module.css";
import { deleteQuiz } from "../../../actions/quiz";
import { createGame } from "../../../actions/game";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useHistory } from "react-router-dom";
import { createLeaderboard } from "../../../actions/leaderboard";

function MyQuiz({ quiz }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLanguageEnglish = useSelector((state) => state.language.isEnglish);
    const socket = useSelector((state) => state.socket.socket);
    const openQuizPage = (e) => {
        history.push(`/myquizes/${quiz._id}`);
    };

    const addGame = async () => {
        let gameData = {
            quizId: quiz._id,
            isLive: true,
            pin: String(Math.floor(Math.random() * 9000) + 1000),
        };
        const newGame = await dispatch(createGame(gameData, history));
        let leaderboardData = { gameId: newGame._id, playerResultList: [] };

        const newLeaderboard = await dispatch(
            createLeaderboard(leaderboardData)
        );
        socket.emit("init-game", newGame, newLeaderboard);
    };

    return (
        <div className={styles["quiz-card"]}>
            <div className={styles["image-container"]}>
                <h3 className={styles["quiz-creator"]}>{quiz.creatorName}</h3>
                <h3 className={styles["quiz-date"]}>
                    Updated: {moment(quiz.dateCreated).fromNow()}
                </h3>
                <div
                    className={styles["quiz-image"]}
                    style={{
                        backgroundImage: "url('" + quiz.backgroundImage + "')",
                    }}
                ></div>
                <h3 className={styles["quiz-question-number"]}>
                    {isLanguageEnglish ? "Questions:" : "Câu hỏi:"}{" "}
                    {quiz.numberOfQuestions}
                </h3>
            </div>
            <div className={styles["card-body"]}>
                <div className={styles["card-body-heading"]}>
                    <h4 className={styles["quiz-tags"]}>
                        {quiz.tags.map((tag) => `#${tag} `)}
                    </h4>
                    <div className={styles["card-buttons"]}>
                        <button
                            className={`${styles["btn"]} ${styles["btn-start"]}`}
                            onClick={addGame}
                        >
                            <PlayArrowIcon fontSize="small" />
                            <span>
                                {isLanguageEnglish
                                    ? "Start a game"
                                    : "Bắt đầu trò chơi"}
                            </span>
                        </button>
                        <button
                            className={`${styles["btn"]} ${styles["btn-edit"]}`}
                            onClick={openQuizPage}
                        >
                            <EditIcon fontSize="small" />
                            <span>{isLanguageEnglish ? "Edit" : "Sửa"}</span>
                        </button>
                        <button
                            className={`${styles["btn"]} ${styles["btn-delete"]}`}
                            onClick={() => dispatch(deleteQuiz(quiz._id))}
                        >
                            <DeleteIcon fontSize="small" />
                            <span>{isLanguageEnglish ? "Delete" : "Xóa"}</span>
                        </button>
                    </div>
                </div>
                <div className={styles["card-body-info"]}>
                    <h2 className={styles["quiz-title"]}>{quiz.name}</h2>
                    <p className={styles["quiz-description"]}>
                        {quiz.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MyQuiz;

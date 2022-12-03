import React, { useEffect, useState } from "react"
import MyQuiz from "./MyQuiz/MyQuiz"
import { useDispatch, useSelector } from "react-redux"
import { getTeacherQuizes, createQuiz } from "../../actions/quiz"
import styles from "./myQuizes.module.css"
import { useHistory } from "react-router-dom"

function MyQuizes() {
  const user = JSON.parse(localStorage.getItem("profile"))
  const dispatch = useDispatch()
  const history = useHistory()
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const [quizData, setQuizData] = useState({
    name: "",
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    isPublic: true,
    tags: [],
    questionList: [],
  })

  const [isQuizPublic, setIsQuizPublic] = useState(true)

  useEffect(() => {
    dispatch(getTeacherQuizes(user.result._id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const { quizes } = useSelector((state) => state.quiz)

  const handleQuizSubmit = () => {
    dispatch(createQuiz(quizData, history))
  }

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles["quizes-list"]}>
      <div className={styles["quiz-settings"]}>
        <h2>{isLanguageEnglish ? "Create new quiz" : "Tạo một bài kiểm tra mới"}</h2>
        <div className={styles["quiz-form"]}>
          <div className={styles["option-label"]}>
            <label>{isLanguageEnglish ? "Title" : "Tên"}</label>
          </div>
          <input
            value={quizData.name}
            type="text"
            name="name"
            onChange={handleQuizChange}
          />
          <div className={styles["option-label"]}>
            <label>{isLanguageEnglish ? "Description" : "Mô tả"}</label>
          </div>
          <input
            value={quizData.description}
            type="text"
            name="description"
            onChange={handleQuizChange}
          />
          <div className={styles["option-buttons"]}>
            <button
              onClick={() => {
                setIsQuizPublic(true)
                setQuizData({ ...quizData, isPublic: true })
              }}
              className={styles["option-button"]}
              style={{
                backgroundColor: isQuizPublic ? "rgb(19, 104, 206)" : "inherit",
                color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
              }}
            >
              {isLanguageEnglish ? "Public" : "Công khai"}
            </button>
            <button
              onClick={() => {
                setIsQuizPublic(false)
                setQuizData({ ...quizData, isPublic: false })
              }}
              className={styles["option-button"]}
              style={{
                backgroundColor: isQuizPublic ? "inherit" : "rgb(19, 104, 206)",
                color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
              }}
            >
              {isLanguageEnglish ? "Private" : "Riêng tư"}
            </button>
          </div>
          <button
            onClick={handleQuizSubmit}
            className={styles["submit-button"]}
          >
            {isLanguageEnglish ? "Create new quiz" : "Tạo một bài kiểm tra mới"}
          </button>
        </div>
      </div>
      {quizes.map((quiz) => (
        <MyQuiz key={quiz._id} quiz={quiz} />
      ))}
    </div>
  )
}

export default MyQuizes

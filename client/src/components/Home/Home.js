import React from "react"
import styles from "./home.module.css"
import img1 from "../../assets/img1.jpeg"
import img2 from "../../assets/img2.jpeg"
import img3 from "../../assets/img3.svg"
import img4 from "../../assets/img4.svg"
import img5 from "../../assets/img5.svg"
import { useSelector } from "react-redux"

function Home() {
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

  return (
    <main className={styles.page}>
      <section className={styles["page-section"]}>
        <section className={styles["first-section"]}>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>
                {isLanguageEnglish
                  ? "Make learning awesome"
                  : "Học tập một cách hiệu quả"}
              </h2>
              <p className={styles["banner-description"]}>
                {isLanguageEnglish
                  ? "Quizzly delivers engaging learning to billions"
                  : "Quizzly cung cấp hàng triệu người dùng có liên quan"}
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">
                  {isLanguageEnglish
                    ? "Sign up for free"
                    : "Đăng kí miễn phí"}
                </a>
              </button>
            </div>
            <img src={img1} alt="" className={styles["banner-image"]} />
          </div>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>
                {isLanguageEnglish ? "Explore content" : "Duyệt nội dung"}
              </h2>
              <p className={styles["banner-description"]}>
                {isLanguageEnglish
                  ? "Explore content and join one of the world’s largest educator communities."
                  : "Duyệt nội dung và tham gia một trong những cộng đồng lớn nhất thế giới trên thế giới"}
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">
                  {isLanguageEnglish
                    ? "Check public quizes"
                    : "Kiểm tra các câu đố công khai"}
                </a>
              </button>
            </div>
            <img src={img2} alt="" className={styles["banner-image"]} />
          </div>
        </section>
        <section className={styles["second-section"]}>
          <div className={styles["section-background"]}></div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at school" : "Câu hỏi ở trường"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Engaging group and distance learning for teachers and students."
                  : "Thu hút nhóm và khoảng cách cho giáo viên và học sinh."}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "Tìm hiểu thêm"} &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at work" : "Câu hỏi tại nơi làm việc"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Deliver training, presentations, meetings and events in-person or on any video conferencing platform."
                  : "Thực hiện đào tạo, thuyết trình, các cuộc họp và sự kiện trực tiếp hoặc trên bất kỳ nền tảng hội nghị video nào."}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "Tìm hiểu thêm"} &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at home" : "Câu hỏi ở nhà"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Learning Apps and games for family fun or home study."
                  : "Trò chơi giáo dục cho gia đình vui vẻ hoặc học tập tại nhà."}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "Tìm hiểu thêm"} &gt;
              </a>
            </div>
          </div>
        </section>
        <section className={styles["third-section"]}>
          <h1>
            {isLanguageEnglish
              ? "How does Quizzly work?"
              : "Ứng dụng hoạt động như thế nào?"}
          </h1>
          <div className={styles["card-container"]}>
            <div className={styles.card}>
              <img src={img3} alt="" />
              <div className={styles["card-body"]}>
                <h1>{isLanguageEnglish ? "Create" : "Twórz"}</h1>
                <p>
                  {isLanguageEnglish
                    ? "It only takes minutes to create a learning game or trivia quiz on any topic, in any language."
                    : "Tạo một bài kiểm tra về bất kỳ chủ đề nào, trong bất kỳ ngôn ngữ nào chỉ mất vài phút."}
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img4} alt="" />
              <div className={styles["card-body"]}>
                <h1>
                  {isLanguageEnglish
                    ? "Host or share"
                    : "Chủ nhà hoặc chia sẻ"}
                </h1>
                <p>
                  {isLanguageEnglish
                    ? "Host a live game with questions on a big screen or share a game with remote players."
                    : "Lấy trò chơi trực tiếp với các câu hỏi trên màn hình lớn hoặc chia sẻ trò chơi với những người chơi từ xa."}
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img5} alt="" />
              <div className={styles["card-body"]}>
                <h1>{isLanguageEnglish ? "Play" : "Graj"}</h1>
                <p>
                  {isLanguageEnglish
                    ? "Game on! Join a kahoot with a PIN provided by the host and answer questions on your device."
                    : "Tiếp tục chơi!Tham gia Kahoot bằng mã PIN do máy chủ cung cấp và trả lời các câu hỏi trên thiết bị của bạn."}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["card-button"]}>
            {isLanguageEnglish
              ? "Play Quizzly to see how it works."
              : "Chơi câu hỏi để xem nó hoạt động như thế nào."}{" "}
            &nbsp;
            <a href="/">
              {isLanguageEnglish
                ? "Explore our public quizes"
                : "Duyệt các câu đố công khai"}
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home

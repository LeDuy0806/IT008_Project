import React, { useState, useEffect } from "react"
import styles from "./navbar.module.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import decode from "jwt-decode"
import * as actionType from "../../constants/actionTypes"
import globe from "../../assets/globe.svg"
import contact from "../../assets/contact.svg"
import  login  from "../../assets/login.svg"
import lgout from "../../assets/lgout.svg"
import home from "../../assets/home.svg"
import education from "../../assets/education.svg"
// import logo from "../../assets/logo.png"
import telehome from "../../assets/telehome.png"
import telelogo from "../../assets/telelogo.png"
import { changeLanguage } from "../../actions/language"
import noava from "../../assets/noava.jpg"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  const socket = useSelector((state) => state.socket.socket)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    history.push("/auth")
    setUser(null)
    socket.disconnect()
  }

  useEffect(() => {
    const token = user?.accessToken
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles["menu-right"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-logo"]}>
              <Link to="/" className={styles["tele-link"]}>
                <span className={styles["lghome"]}>
                  <img style={{height:"40px",borderRadius:"50%",marginBottom:"3px"}}src={telehome} alt="logoname" className={styles["tele-img"]}></img>
                </span>
              </Link>
              <Link to="/" className={styles["logo-link"]}>
                <img style={{height:"50px",width:"140px"}}src={telelogo} alt="logo" className={styles["logo-img"]} />
              </Link>
            </li>

            <li className={styles["nav__list-item"]}>
              <HomeOutlinedIcon fontSize='large' style={{marginRight:"15px"}}/>
              {/* <img style={{height:"25px",paddingRight:"15px"}}src={home} alt="" /> */}
              {isLanguageEnglish ? "About" : "About"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>{isLanguageEnglish ? "How it works" : "Nó hoạt động như thế nào"} </li>
                <li>{isLanguageEnglish ? "Ways to play" : "Cách chơi"}</li>
              </ul>
            </li>
            <li className={styles["nav__list-item"]}>
              <img style={{height:"30px",paddingRight:"15px"}}src={education} alt="" />
              {isLanguageEnglish ? "Study" : "Học"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>
                  <Link to="/quizes">
                    {isLanguageEnglish ? "Public quizes" : "Câu đố công khai"}
                  </Link>
                </li>
                <li>{isLanguageEnglish ? "Test game" : "Kiểm tra trò chơi"}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles["menu-left"]}>
          <div className={styles.nav__list}>
            <div className={styles["nav__list-item"]}>
              <img style={{height:"30px",marginRight:"8px"}}src={contact} alt="" />
              {isLanguageEnglish ? "Contact" : "Liên Hệ"}
            </div>
          

            {user ? (
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginRight:"10px"}}>
                <div style={{width:"200px",display:"flex",justifyContent:"space-around"}}>
                  <div className={styles["nav__list-item_hight"]}>
                    <div className={styles["divplay"]}>
                      <Link to="/games/joingame" style={{color:"white"}}>
                        {isLanguageEnglish ? "Play" : "Chơi"}
                      </Link>
                    </div>
                  </div>

                  {user.result.userType === "Teacher" && (
                    <div className={styles["nav__list-item_hight"]}>
                      <div className={styles["divmyquiz"]}>
                        <Link to="/myquizes" style={{color:"white"}}>
                            {isLanguageEnglish ? "My Quizes" : "Tạo Quizes"}
                        </Link> 
                      </div>
                    </div>
                  )}
                </div>
                  
                  <div className={styles["nav__list-item_user"]}>
                    <div style={{width:"90px",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <img style={{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}} src={noava}></img>
                      {user.result.firstName}
                    </div>
                  </div>
                  <div style={{backroundcolor:"red",width:"120px",marginRight:"-30px"}}>
                    <div onClick={logout} className={styles["nav__login"]}>
                      <img style={{height:"30px",marginRight:"8px"}}src={lgout} alt="" />
                      {isLanguageEnglish ? "Log out" : "Đăng xuất"}
                    </div>
                  </div>
              </div>
            ) : (
                <div style={{display:"flex",height:"40px",width:"100px",alignItems:"center",justifyContent:"center"}}>
                  <Link to="/auth">
                      <div className={styles["nav__login"]}>
                        <img style={{height:"30px"}} src={login} alt="" />
                        {isLanguageEnglish ? "Log in" : "Đăng nhập"}
                      </div>
                  </Link>
                </div>
            )}
            <div className={styles["nav__list-item"]}>
              <img src={globe} alt="" />
              {isLanguageEnglish ? "EN" : "VI"}
              <ul className={styles["nav__list-item-drop"]}>
                <li
                  onClick={() => {
                    dispatch(changeLanguage(!isLanguageEnglish))
                  }}
                >
                  {isLanguageEnglish ? "Tiếng Việt" : "English"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

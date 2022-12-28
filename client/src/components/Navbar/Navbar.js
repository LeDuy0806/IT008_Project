import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import globe from '../../assets/globe.svg';
import contact from '../../assets/contact.svg';
import login from '../../assets/login.svg';
import lgout from '../../assets/lgout.svg';
// import home from "../../assets/home.svg"
import education from '../../assets/education.svg';
// import logo from "../../assets/logo.png"
import telehome from '../../assets/telehome.png';
// import telelogo from "../../assets/telelogo.png"
import { changeLanguage } from '../../actions/language';
import noava from '../../assets/noava.jpg';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

function Navbar() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile')),
    );
    // const profile = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const isLanguageEnglish = useSelector((state) => state.language.isEnglish);
    const socket = useSelector((state) => state.socket.socket);
    let username;
    if (user !== null) username = user.result.userName;

    // console.log(user);
    // useEffect(() => {
    //     setUser(profile)
    // }, [profile])
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
        if (user === null) socket.disconnect();
    };

    useEffect(() => {
        const token = user?.accessToken;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    if (location.pathname === '/dashboard') {
        document.body.classList.add('hide_navbar');
        return null;
    } else {
        document.body.classList.remove('hide_navbar');
    }

    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles['menu-right']}>
                    <div className={styles.nav__list}>
                        <Link to="/" className={styles['tele-link']}>
                            <div className={styles['nav__list-logo']}>
                                <span
                                    className={styles['lghome']}
                                    style={{ marginTop: '3px' }}
                                >
                                    <img
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            borderRadius: '50%',
                                        }}
                                        src={telehome}
                                        alt="logoname"
                                        className={styles['tele-img']}
                                    ></img>
                                </span>
                                <span className={styles['text-logo']}>
                                    <h2 className={styles['text-muted']}>
                                        TEL
                                        <span className={styles['danger']}>
                                            EXERCISE
                                        </span>
                                    </h2>
                                </span>
                            </div>
                        </Link>

                        <li className={styles['nav__list-item']}>
                            <HomeOutlinedIcon
                                fontSize="large"
                                style={{ marginRight: '15px' }}
                            />
                            {/* <img style={{height:"25px",paddingRight:"15px"}}src={home} alt="" /> */}
                            {isLanguageEnglish ? 'About' : 'About'}
                            <ul className={styles['nav__list-item-drop']}>
                                <li>
                                    {isLanguageEnglish
                                        ? 'How it works'
                                        : 'Nó hoạt động như thế nào'}{' '}
                                </li>
                                <li>
                                    {isLanguageEnglish
                                        ? 'Ways to play'
                                        : 'Cách chơi'}
                                </li>
                            </ul>
                        </li>
                        <li className={styles['nav__list-item']}>
                            <img
                                style={{
                                    height: '30px',
                                    width: '30px',
                                    marginRight: '10px',
                                }}
                                src={education}
                                alt=""
                            />
                            {isLanguageEnglish ? 'Study' : 'Học tập'}
                            <ul className={styles['nav__list-item-drop']}>
                                <li>
                                    <Link to="/quizes">
                                        {isLanguageEnglish
                                            ? 'Public quizes'
                                            : 'Câu đố công khai'}
                                    </Link>
                                </li>
                                <li>
                                    {isLanguageEnglish
                                        ? 'Test game'
                                        : 'Kiểm tra trò chơi'}
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>

                <div className={styles['menu-left']}>
                    <div
                        sytles={{ display: 'flex' }}
                        className={styles.nav__list}
                    >
                        <div className={styles['nav__list-item']}>
                            <img
                                style={{
                                    height: '30px',
                                    width: '30px',
                                    marginRight: '10px',
                                }}
                                src={contact}
                                alt=""
                            />
                            {isLanguageEnglish ? 'Contact' : 'Liên Hệ'}
                        </div>

                        {user ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <Link
                                        to="/games/joingame"
                                        style={{ color: 'white' }}
                                    >
                                        <div
                                            className={`${styles['divplay']} ${styles['nav__list-item_hight']}`}
                                        >
                                            {isLanguageEnglish
                                                ? 'Play'
                                                : 'Chơi'}
                                        </div>
                                    </Link>

                                    {user.result.userType === 'Teacher' && (
                                        <div
                                            className={
                                                styles['nav__list-item_hight']
                                            }
                                        >
                                            <Link
                                                to="/myquizes"
                                                style={{ color: 'white' }}
                                            >
                                                <div
                                                    className={
                                                        styles['divmyquiz']
                                                    }
                                                >
                                                    {isLanguageEnglish
                                                        ? 'My Quizes'
                                                        : 'Tạo Quizes'}
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <Link to={`/profile/${username}`}>
                                    <div
                                        className={
                                            styles['nav__list-item_user']
                                        }
                                    >
                                        <div
                                            style={{
                                                width: 'fit-content',
                                                height: '50px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                }}
                                                src={user.result.avatar || noava}
                                                alt=""
                                            />
                                            <span
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    marginLeft: '4px',
                                                }}
                                            >
                                                {user.result.firstName +
                                                    ' ' +
                                                    user.result.lastName}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <div
                                    onClick={logout}
                                    className={styles['nav__logout']}
                                >
                                    <img
                                        style={{
                                            height: '30px',
                                            width: '30px',
                                        }}
                                        src={lgout}
                                        alt=""
                                    />
                                    <span>
                                        {isLanguageEnglish
                                            ? 'Log out'
                                            : 'Đăng Xuất'}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    height: '40px',
                                    width: '150px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link to="/auth">
                                    <div className={styles['nav__login']}>
                                        <img
                                            style={{
                                                height: '30px',
                                                width: '30px',
                                            }}
                                            src={login}
                                            alt=""
                                        />
                                        {isLanguageEnglish ? (
                                            <span
                                                style={{
                                                    width: '50px',
                                                    marginRight: '10px',
                                                }}
                                            >
                                                Log in
                                            </span>
                                        ) : (
                                            <span style={{ width: '95px' }}>
                                                Đăng nhập
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        )}
                        <div className={styles['nav__list-item']}>
                            <div className={styles['nav__list-item_border']}>
                                <img
                                    style={{ height: '30px', width: '40px' }}
                                    src={globe}
                                    alt=""
                                />
                                {isLanguageEnglish ? 'EN' : 'VI'}
                                <ul className={styles['nav__list-item-drop']}>
                                    <li
                                        onClick={() => {
                                            dispatch(
                                                changeLanguage(
                                                    !isLanguageEnglish,
                                                ),
                                            );
                                        }}
                                    >
                                        {isLanguageEnglish ? (
                                            <span>Tiếng Việt</span>
                                        ) : (
                                            <span>Tiếng Anh</span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;

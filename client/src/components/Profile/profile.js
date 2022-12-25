import styles from './profile.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

let checkUserName = true;
let checkName = true;
let checkBio = true;

export default function Profile() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const info = JSON.parse(localStorage.getItem('profilechange'));
    const isLanguageEnglish = useSelector((state) => state.language.isEnglish);
    const [profile, setProfile] = useState(
        info === null
            ? {
                  Username: user.result.userName,
                  Name: user.result.userName,
                  Bio: 'Bio',
              }
            : {
                  Username: info.Username,
                  Name: info.Name,
                  Bio: info.Bio,
              },
    );

    const lc = {};
    if (info === null) {
        lc.Username = user.result.userName;
        lc.Name = user.result.userName;
        lc.Bio = 'Bio';
    } else {
        lc.Username = info.Username;
        lc.Name = info.Name;
        lc.Bio = info.Bio;
    }

    console.log(lc);
    console.log(profile);

    const [save, setSave] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        let name = e.target.name;
        console.log(name);

        // eslint-disable-next-line default-case
        switch (name) {
            case 'userName':
                setProfile((preState) => {
                    var newState = {
                        ...preState,
                        Username: e.target.value,
                    };
                    return newState;
                });
                if (e.target.value === lc.Username) {
                    checkUserName = true;
                } else {
                    // eslint-disable-next-line no-unused-vars
                    checkUserName = false;
                }

                break;
            case 'Name':
                setProfile((preState) => {
                    var newState = {
                        ...preState,
                        Name: e.target.value,
                    };
                    return newState;
                });

                if (e.target.value === lc.Name) {
                    checkName = true;
                } else {
                    // eslint-disable-next-line no-unused-vars
                    checkName = false;
                }

                break;

            case 'Bio':
                setProfile((preState) => {
                    var newState = {
                        ...preState,
                        Bio: e.target.value,
                    };
                    return newState;
                });
                if (e.target.value === lc.Bio) {
                    checkBio = true;
                } else {
                    // eslint-disable-next-line no-unused-vars
                    checkBio = false;
                }

                break;
        }

        console.log(checkUserName, checkName, checkBio);

        if (checkUserName && checkName && checkBio) {
            setSave(false);
        } else {
            setSave(true);
        }
    };

    const handleSave = () => {
        localStorage.setItem('profilechange', JSON.stringify(profile));
        if (save) {
            toast.success(
                isLanguageEnglish ? 'save successfully !' : 'Lưu thành công !',
                {
                    style: { color: '#fff' },
                    position: 'top-center',
                    autoClose: 3000,
                    theme: 'dark',
                },
            );
        }
        // localStorage.setItem('profile', user);
    };

    const handleCancel = () => {
        history.push('/');
    };

    return (
        <div className={styles['main']}>
            <div className={styles['profile_item-header']}>
                Edit profile
                <div
                    className={styles['profile_item-header-close']}
                    onClick={handleCancel}
                >
                    <svg
                        width="24"
                        data-e2e=""
                        height="24"
                        viewBox="0 0 48 48"
                        fill="rgba(22, 24, 35, .75)"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.1718 23.9999L10.2931 13.1212C9.90261 12.7307 9.90261 12.0975 10.2931 11.707L11.7074 10.2928C12.0979 9.90228 12.731 9.90228 13.1216 10.2928L24.0002 21.1715L34.8789 10.2928C35.2694 9.90228 35.9026 9.90228 36.2931 10.2928L37.7073 11.707C38.0979 12.0975 38.0979 12.7307 37.7073 13.1212L26.8287 23.9999L37.7073 34.8786C38.0979 35.2691 38.0979 35.9023 37.7073 36.2928L36.2931 37.707C35.9026 38.0975 35.2694 38.0975 34.8789 37.707L24.0002 26.8283L13.1216 37.707C12.731 38.0975 12.0979 38.0975 11.7074 37.707L10.2931 36.2928C9.90261 35.9023 9.90261 35.2691 10.2931 34.8786L21.1718 23.9999Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className={styles['profile_item-contain']}>
                <div className={styles['contain_item']}>
                    <div className={styles['contain_editprofile']}>
                        Profile photo
                    </div>
                    <div className={styles['contain_editava']}>
                        <div className={styles['contain_editavachil']}>
                            <span className={styles['contain_editavachilspan']}>
                                <img
                                    className={styles['contain_editavachilimg']}
                                    src="https://image.nhandan.vn/w800/Uploaded/2022/yqjwcqjlq/2022_11_24/ronaldo-portugal-copy-1844.jpg"
                                    alt=""
                                />
                            </span>
                        </div>
                        <div className={styles['contain_editicon']}>
                            <svg
                                width="16"
                                data-e2e=""
                                height="16"
                                viewBox="0 0 48 48"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M26.5858 5.08579C27.3479 4.32371 28.5767 4.30253 29.3646 5.03789L36.8646 12.0379C37.2612 12.408 37.4904 12.9232 37.4997 13.4655C37.5091 14.0078 37.2977 14.5307 36.9142 14.9142L16.9142 34.9142C16.5391 35.2893 16.0304 35.5 15.5 35.5H8.5C7.39543 35.5 6.5 34.6046 6.5 33.5V26C6.5 25.4696 6.71071 24.9609 7.08579 24.5858L26.5858 5.08579ZM28.0479 9.2805L10.5 26.8284V31.5H14.6716L32.622 13.5496L28.0479 9.2805Z"
                                ></path>
                                <path d="M7 41C7 40.4477 7.44772 40 8 40H41C41.5523 40 42 40.4477 42 41V43C42 43.5523 41.5523 44 41 44H8C7.44772 44 7 43.5523 7 43V41Z"></path>
                            </svg>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                className={styles['contain_editiconinput']}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles['contain_item']}>
                    <div className={styles['edit-profile-username-name']}>
                        Username
                    </div>
                    <div className={styles['edit-profile-username-input']}>
                        <input
                            value={profile.Username}
                            name="userName"
                            onChange={handleChange}
                            className={
                                styles['edit-profile-username-input-chil']
                            }
                        />
                        <p className={styles['edit-profile-username-input-p1']}>
                            www.telexercise.com/@anhquoc
                        </p>
                        <p className={styles['edit-profile-username-input-p2']}>
                            Usernames can only contain letters, numbers,
                            underscores, and periods. Changing your username
                            will also change your profile link
                        </p>
                    </div>
                </div>
                <div className={styles['contain_item']}>
                    <div className={styles['edit-profile-username-name']}>
                        Name
                    </div>
                    <div className={styles['edit-profile-username-input']}>
                        <input
                            name="Name"
                            type="text"
                            onChange={handleChange}
                            className={
                                styles['edit-profile-username-input-chil']
                            }
                            value={profile.Name}
                        />
                        <p className={styles['edit-profile-username-input-p1']}>
                            Your nickname can only be changed once every 7 days
                        </p>
                    </div>
                </div>

                <div className={styles['contain_item']}>
                    <div className={styles['edit-profile-username-name']}>
                        Bio
                    </div>
                    <div className={styles['edit-profile-username-input']}>
                        <input
                            name="Bio"
                            onChange={handleChange}
                            className={
                                styles['edit-profile-username-input-chil']
                            }
                            value={profile.Bio}
                        />
                        <p className={styles['edit-profile-username-input-p1']}>
                            0/80
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles['profile_item-footer']}>
                <button
                    className={styles['profile_item-footer-btnC']}
                    onClick={handleCancel}
                >
                    Cancle
                </button>
                <button
                    className={
                        styles[
                            save
                                ? 'profile_item-footer-btnS-active'
                                : 'profile_item-footer-btnS'
                        ]
                    }
                    onClick={handleSave}
                    style={{
                        backgroundColor: save ? 'red' : 'rgb(187, 187, 187)',
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

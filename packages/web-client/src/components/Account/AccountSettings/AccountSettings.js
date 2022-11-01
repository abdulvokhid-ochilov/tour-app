import styles from "./AccountSettings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserPassword,
  updateUserInformation,
} from "../../../store/auth-actions";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const token = useSelector((state) => state.auth.token);
  const [photo, setPhoto] = useState({
    src: useSelector((state) => state.auth.user.photo),
    file: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const name = useRef();
  const email = useRef();

  const updateUserPasswordHandler = (e) => {
    e.preventDefault();

    if (
      confirmNewPassword.current.value.localeCompare(
        newPassword.current.value
      ) !== 0
    )
      return toast.error("Please confirm your password⚠️");

    dispatch(
      updateUserPassword(
        {
          oldPassword: password.current.value,
          newPassword: newPassword.current.value,
        },
        token,
        navigate
      )
    );
  };

  const updateUserInfoHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", photo.file ? photo.file : photo.src);
    formData.append("email", email.current.value);
    formData.append("name", name.current.value);

    dispatch(updateUserInformation(formData, token, navigate));
  };

  return (
    <div className={styles["user-view__content"]}>
      <div className={styles["user-view__form-container"]}>
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form onSubmit={updateUserInfoHandler}>
          <div className={styles["form__group"]}>
            <label className={styles["form__label"]} htmlFor="name">
              New Name
            </label>
            <input
              ref={name}
              className={styles["form__input"]}
              id="name"
              type="text"
              required
              name="name"
            />
          </div>
          <div className={`${styles["form__group"]} ma-bt-md"`}>
            <label className={styles["form__label"]} htmlFor="email">
              New Email address
            </label>
            <input
              ref={email}
              className={styles["form__input"]}
              id="email"
              type="email"
              required
              name="email"
            />
          </div>
          <div
            className={`${styles["form__group"]} ${styles["form__photo-upload"]}`}
          >
            <img
              className={styles["form__user-photo"]}
              src={photo.src}
              alt=""
            />
            <input
              className={styles["form__upload"]}
              type="file"
              accept="image/*"
              id="user-photo"
              name="user-photo"
              onChange={(e) => {
                setPhoto({
                  src: URL.createObjectURL(e.target.files[0]),
                  file: e.target.files[0],
                });
              }}
            />
            <label htmlFor="user-photo">Choose new photo</label>
          </div>
          <div className={`${styles["form__group"]} right`}>
            <button className="btn btn--small btn--green">Save settings</button>
          </div>
        </form>
      </div>
      <div className={styles["line"]}>&nbsp;</div>
      <div className={styles["user-view__form-container"]}>
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form onSubmit={updateUserPasswordHandler}>
          <div className={styles["form__group"]}>
            <label className={styles["form__label"]} htmlFor="password-current">
              Current password
            </label>
            <input
              ref={password}
              className={styles["form__input"]}
              id="password-current"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
            />
          </div>
          <div className={styles["form__group"]}>
            <label className={styles["form__label"]} htmlFor="password">
              New password
            </label>
            <input
              ref={newPassword}
              className={styles["form__input"]}
              id="password"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
            />
          </div>
          <div className={`${styles["form__group"]} ma-bt-lg`}>
            <label className={styles["form__label"]} htmlFor="password-confirm">
              Confirm password
            </label>
            <input
              ref={confirmNewPassword}
              className={styles["form__input"]}
              id="password-confirm"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
            />
          </div>
          <div className={`${styles["form__group"]} right`}>
            <button
              className={`btn btn--small btn--green ${styles["btn--save-password"]}`}
            >
              Save password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;

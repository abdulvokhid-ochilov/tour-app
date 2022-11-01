import styles from "./Login.module.css";
import { useRef } from "react";
import { fetchUserData } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(
      fetchUserData(
        {
          email: email.current.value,
          password: password.current.value,
        },
        navigate
      )
    );
  };
  return (
    <main className={`main`}>
      <div className={styles["login-form"]}>
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className={`${styles["form__group"]}`} onSubmit={loginHandler}>
          <label htmlFor="email" className={`${styles["form__label"]}`}>
            Email address
          </label>
          <input
            ref={email}
            type="email"
            className={`${styles["form__input"]}`}
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password" className={`${styles["form__label"]}`}>
            Password
          </label>
          <input
            ref={password}
            className={`${styles["form__input"]}`}
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
          />
          <button type="submit" className="btn btn--green">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;

import styles from "./SignUp.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import { signUpUser } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const name = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      confirmPassword.current.value.localeCompare(password.current.value) !== 0
    )
      return toast.error("Please confirm your password⚠️");

    dispatch(
      signUpUser(
        {
          name: name.current.value,
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
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className={`${styles["form__group"]}`} onSubmit={submitHandler}>
          <label htmlFor="name" className={`${styles["form__label"]}`}>
            Your name
          </label>
          <input
            ref={name}
            type="text"
            className={`${styles["form__input"]}`}
            required
          />
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
          <label htmlFor="password" className={`${styles["form__label"]}`}>
            Confirm Password
          </label>
          <input
            ref={confirmPassword}
            className={`${styles["form__input"]}`}
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
          />
          <button type="submit" className="btn btn--green">
            sign up
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;

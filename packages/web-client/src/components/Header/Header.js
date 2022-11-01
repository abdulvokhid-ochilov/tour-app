import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toursActions } from "../../store/tours-slice";
import { useRef } from "react";

const Header = () => {
  const status = useSelector((state) => state.auth.loginStatus);
  const name = useSelector((state) => state.auth.user?.name);
  const photo = useSelector((state) => state.auth.user.photo);
  const search = useRef();
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(toursActions.addSearchWord({ searchWord: search.current.value }));
  };

  return (
    <header className={styles["header"]}>
      <nav className={`${styles["nav"]} ${styles["nav--tours"]}`}>
        <Link to="/" className={styles["nav__el"]}>
          All tours
        </Link>
        <form className={styles.nav__search}>
          <div className={styles["nav__search-btn"]}>
            <svg>
              <use href="img/icons.svg#icon-search"></use>
            </svg>
          </div>
          <input
            ref={search}
            onChange={searchHandler}
            type="text"
            placeholder="Search tours"
            className={styles["nav__search-input"]}
          />
        </form>
      </nav>
      <div className={styles["header__logo"]}>
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className={`${styles["nav"]} ${styles["nav--user"]}`}>
        {status ? (
          <Link to="/account" className={styles["nav__el"]}>
            <img src={photo} className={styles["nav__user-img"]} alt="" />
            <span>{name}</span>
          </Link>
        ) : (
          <>
            <Link to="/login" className={styles["nav__el"]}>
              Log in
            </Link>
            <Link
              to="/signup"
              className={`${styles["nav__el"]} ${styles["nav__el--cta"]}`}
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

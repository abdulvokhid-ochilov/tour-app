import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__logo"]}>
        <img src="img/logo-green.png" alt="Natours logo" />
      </div>
      <ul className={styles["footer__nav"]}>
        <li>
          <a href="/">About us</a>
        </li>
        <li>
          <a href="/">Download apps</a>
        </li>
        <li>
          <a href="/">Become a guide</a>
        </li>
        <li>
          <a href="/">Careers</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
      <p className={styles["footer__copyright"]}>
        &copy; by Abdulvokhid. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

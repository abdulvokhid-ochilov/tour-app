import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({
  id,
  name,
  duration,
  difficulty,
  ratingsAverage,
  ratingsQuantity,
  price,
  summary,
  imageCover,
  maxGroupSize,
  location,
  startDates,
  stops,
}) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles.card}
    >
      <div className={styles.card__header}>
        <div className={styles.card__picture}>
          <div className={styles["card__picture-overlay"]}>&nbsp;</div>
          <img
            src={imageCover}
            alt=""
            className={styles["card__picture-img"]}
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>

      <div className={styles["card__details"]}>
        <h4 className={styles["card__sub-heading"]}>
          {difficulty} {duration}-day tour
        </h4>
        <p className={styles["card__text"]}>{summary}</p>
        <div className={styles["card__data"]}>
          <svg className={styles["card__icon"]}>
            <use href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{location.place}</span>
        </div>
        <div className={styles["card__data"]}>
          <svg className={styles["card__icon"]}>
            <use href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>{new Date(startDates).toDateString()}</span>
        </div>
        <div className={styles["card__data"]}>
          <svg className={styles["card__icon"]}>
            <use href="img/icons.svg#icon-flag"></use>
          </svg>
          <span>{stops.length} stops</span>
        </div>
        <div className={styles["card__data"]}>
          <svg className={styles["card__icon"]}>
            <use href="img/icons.svg#icon-user"></use>
          </svg>
          <span>{maxGroupSize} people</span>
        </div>
      </div>

      <div className={styles["card__footer"]}>
        <p>
          <span className={styles["card__footer-value"]}>${price} </span>
          <span className={styles["card__footer-text"]}> per person</span>
        </p>
        <p className={styles["card__ratings"]}>
          <span className={styles["card__footer-value"]}>
            {ratingsAverage}{" "}
          </span>
          <span className={styles["card__footer-text"]}>
            rating ({ratingsQuantity})
          </span>
        </p>
        <Link
          to={`/tour/${id}`}
          className={`btn btn--green btn--small ${styles.details}`}
        >
          Details
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;

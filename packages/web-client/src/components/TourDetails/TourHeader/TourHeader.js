import styles from "./TourHeader.module.css";

const TourHeader = ({ name, duration, location: { place }, cover }) => {
  return (
    <section
      className={styles["section-header"]}
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className={styles["card__picture-overlay"]}>&nbsp;</div>
      <div className={styles["heading-box"]}>
        <h1 className="heading-primary">
          <span>{name}</span>
        </h1>
        <div className={styles["heading-box__group"]}>
          <div className={styles["heading-box__detail"]}>
            <svg className={styles["heading-box__icon"]}>
              <use href="img/icons.svg#icon-clock"></use>
            </svg>
            <span className={styles["heading-box__text"]}>{duration} days</span>
          </div>
          <div className={styles["heading-box__detail"]}>
            <svg className={styles["heading-box__icon"]}>
              <use href="img/icons.svg#icon-map-pin"></use>
            </svg>
            <span className={styles["heading-box__text"]}>{place}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourHeader;

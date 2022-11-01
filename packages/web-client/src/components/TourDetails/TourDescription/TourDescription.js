import styles from "./TourDescription.module.css";

const TourDescription = ({
  startDates,
  difficulty,
  maxGroupSize,
  ratingsAverage = 0,
  name,
  description,
}) => {
  return (
    <section className={styles["section-description"]}>
      <div className={styles["overview-box"]}>
        <div>
          <div className={styles["overview-box__group"]}>
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <div className={styles["overview-box__detail"]}>
              <svg className={styles["overview-box__icon"]}>
                <use href="img/icons.svg#icon-calendar"></use>
              </svg>
              <span className={styles["overview-box__label"]}>Next date</span>
              <span className={styles["overview-box__text"]}>
                {new Date(startDates).toDateString()}
              </span>
            </div>
            <div className={styles["overview-box__detail"]}>
              <svg className={styles["overview-box__icon"]}>
                <use href="img/icons.svg#icon-trending-up"></use>
              </svg>
              <span className={styles["overview-box__label"]}>Difficulty</span>
              <span className={styles["overview-box__text"]}>{difficulty}</span>
            </div>
            <div className={styles["overview-box__detail"]}>
              <svg className={styles["overview-box__icon"]}>
                <use href="img/icons.svg#icon-user"></use>
              </svg>
              <span className={styles["overview-box__label"]}>
                Participants
              </span>
              <span className={styles["overview-box__text"]}>
                {maxGroupSize} people
              </span>
            </div>
            <div className={styles["overview-box__detail"]}>
              <svg className={styles["overview-box__icon"]}>
                <use href="img/icons.svg#icon-star"></use>
              </svg>
              <span className={styles["overview-box__label"]}>Rating</span>
              <span className={styles["overview-box__text"]}>
                {ratingsAverage} / 5
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["description-box"]}>
        <h2 className="heading-secondary ma-bt-lg">About {name}</h2>
        <p className={styles["description__text"]}>{description}</p>
      </div>
    </section>
  );
};

export default TourDescription;

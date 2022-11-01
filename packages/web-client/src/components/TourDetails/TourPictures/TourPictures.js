import styles from "./TourPictures.module.css";

const TourPictures = ({ images }) => {
  return (
    <section className={styles["section-pictures"]}>
      <div className={styles["picture-box"]}>
        <img
          className={`${styles["picture-box__img"]} ${styles["picture-box__img--1"]}`}
          src={images[0]}
          alt="The Park Camper Tour 1"
        />
      </div>
      <div className={styles["picture-box"]}>
        <img
          className={`${styles["picture-box__img"]} ${styles["picture-box__img--2"]}`}
          src={images[1]}
          alt="The Park Camper Tour 1"
        />
      </div>
      <div className={styles["picture-box"]}>
        <img
          className={`${styles["picture-box__img"]} ${styles["picture-box__img--3"]}`}
          src={images[2]}
          alt="The Park Camper Tour 1"
        />
      </div>
    </section>
  );
};

export default TourPictures;

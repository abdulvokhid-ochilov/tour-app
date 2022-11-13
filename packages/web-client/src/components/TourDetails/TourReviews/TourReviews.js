import styles from "./TourReviews.module.css";

const TourReviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <section className={styles["section-reviews"]}>
      <div className={styles["reviews"]}>
        {reviews.length > 0 ? (
          reviews.map(({ _id, user: { name, photo }, review, rating }) => (
            <div key={_id} className={styles["reviews__card"]}>
              <div className={styles["reviews__avatar"]}>
                <img
                  src={photo}
                  alt=""
                  className={styles["reviews__avatar-img"]}
                />
                <h6 className={styles["reviews__user"]}>{name}</h6>
              </div>
              <p className={styles["reviews__text"]}>{review}</p>
              <div className={styles["reviews__rating"]}>
                {Array(5).map((_, i) =>
                  i + 1 <= rating ? (
                    <svg
                      className={`${styles["reviews__star"]} ${styles["reviews__star--active"]}`}
                    >
                      <use href="img/icons.svg#icon-star"></use>
                    </svg>
                  ) : (
                    <svg
                      className={`${styles["reviews__star"]} ${styles["reviews__star--inactive"]}`}
                    >
                      <use href="img/icons.svg#icon-star"></use>
                    </svg>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="heading-primary">No reviews yet</h1>
        )}
      </div>
    </section>
  );
};

export default TourReviews;

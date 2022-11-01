import styles from "./AccountReview.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AccountReview = () => {
  const tour = useRef(null);
  const feedback = useRef(null);
  const [rate, setRate] = useState(0);
  const { bookings } = useSelector((state) => state.bookings);
  const { token } = useSelector((state) => state.auth);

  const clickHandler = (e) => {
    setRate(e.target.id);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");

    const response = await fetch(
      `http://localhost:5000/api/v1/tours/${tour.current.value}/reviews`,
      {
        method: "POST",
        body: JSON.stringify({
          review: feedback.current.value,
          rating: rate,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    response.status === "success"
      ? toast.update(toastId, {
          render: "Feedback submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
      : toast.update(toastId, {
          render: response.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
    setRate(0);
    feedback.current.value = "";
  };
  return (
    <div className={styles["user-view__content"]}>
      <div className={styles["user-view__form-container"]}>
        <h2 className="heading-secondary ma-bt-md">Leave your feedback</h2>
        <form onSubmit={submitHandler}>
          <div className={styles["form__group"]}>
            <label className={styles["form__label"]} htmlFor="tours">
              Your Tours
            </label>
            <select
              ref={tour}
              name="tours"
              className={`${styles["form__input"]} ${styles["form__select"]}`}
              id="tours-select"
              required
            >
              {bookings.map(({ tour: { _id, name } }, i) => (
                <option key={i} value={_id} className="options">
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles["form__group"]} ma-bt-md"`}>
            <label className={styles["form__label"]} htmlFor="rate">
              Rate
            </label>
            <div className={styles["reviews__rating"]}>
              <svg
                className={`${styles["reviews__star"]} ${
                  rate >= 1
                    ? styles["reviews__star--active"]
                    : styles["reviews__star--inactive"]
                }`}
                onClick={clickHandler}
                id={1}
              >
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
              <svg
                className={`${styles["reviews__star"]} ${
                  rate >= 2
                    ? styles["reviews__star--active"]
                    : styles["reviews__star--inactive"]
                }`}
                onClick={clickHandler}
                id={2}
              >
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
              <svg
                className={`${styles["reviews__star"]} ${
                  rate >= 3
                    ? styles["reviews__star--active"]
                    : styles["reviews__star--inactive"]
                }`}
                onClick={clickHandler}
                id={3}
              >
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
              <svg
                className={`${styles["reviews__star"]} ${
                  rate >= 4
                    ? styles["reviews__star--active"]
                    : styles["reviews__star--inactive"]
                }`}
                onClick={clickHandler}
                id={4}
              >
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
              <svg
                className={`${styles["reviews__star"]} ${
                  rate >= 5
                    ? styles["reviews__star--active"]
                    : styles["reviews__star--inactive"]
                }`}
                onClick={clickHandler}
                id={5}
              >
                <use href="/img/icons.svg#icon-star"></use>
              </svg>
            </div>
          </div>
          <div className={`${styles["form__group"]} ma-bt-md"`}>
            <label className={styles["form__label"]} htmlFor="feedback">
              Feedback
            </label>

            <textarea
              ref={feedback}
              className={styles["form__input"]}
              id={styles["feedback"]}
              type="text"
              required
              name="feedback"
              rows="5"
              cols="33"
              defaultValue="Leave your feedback on the selected tour..."
            ></textarea>
          </div>

          <div className={`${styles["form__group"]} right`}>
            <button className="btn btn--small btn--green">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountReview;

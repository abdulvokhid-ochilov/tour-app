import styles from "./TourCTA.module.css";
import { useState } from "react";
import CheckoutForm from "../../Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

let stripePromise;
(async () => {
  stripePromise = loadStripe(
    "pk_test_51Ki95wHT9547BI1MlRGVfGO314owpUT4b9IpYWKvyTkSbpMxSSJ6X45xjZMJufAFlTJwBghcfx6vbHVG2c9QYWkY00KaiUT8Ie"
  );
})();

const TourCTA = ({ images, tour, duration }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Elements stripe={stripePromise} className={styles.elements}>
      <section className={styles["section-cta"]}>
        <div className={styles["cta"]}>
          <div className={`${styles["cta__img"]} ${styles["cta__img--logo"]}`}>
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            src={images[0]}
            alt=""
            className={`${styles["cta__img"]} ${styles["cta__img--1"]}`}
          />
          <img
            src={images[1]}
            alt=""
            className={`${styles["cta__img"]} ${styles["cta__img--2"]}`}
          />

          <div className={styles["cta__content"]}>
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className={styles["cta__text"]}>
              {duration} days. 1 adventure. Infinite memories. Make it yours
              today!
            </p>
            <button
              onClick={setIsOpen.bind(null, !isOpen)}
              className="btn btn--green span-all-rows"
            >
              Book tour now!
            </button>
          </div>
        </div>
        {isOpen && <CheckoutForm tour={tour} />}
      </section>
    </Elements>
  );
};

export default TourCTA;

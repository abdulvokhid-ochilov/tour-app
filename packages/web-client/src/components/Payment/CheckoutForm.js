import styles from "./CheckoutForm.module.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { bookingsActions } from "../../store/bookings-slice";

const cardElementOptions = {
  style: {
    base: {
      iconColor: "#55c57a",
      color: "#777",
      fontWeight: "400",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "19px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#55c57a",
      },
      "::placeholder": {
        color: "#777",
      },
    },
    invalid: {
      iconColor: "#eb4d4b",
      color: "#eb4d4b",
    },
  },
};

const CheckoutForm = ({ tour }) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !complete) {
      return toast.info("Please fill the card form!");
    }

    const toastId = toast.loading("Please wait...");

    const { err, paymentToken, clientSecret } = await fetch(
      `http://localhost:5000/api/v1/bookings/create-payment-intent/${tour._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (err) {
      console.log(err);
      return toast.update(toastId, {
        render: "Could not complete payment!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

    if (stripeError) {
      // console.log(stripeError);
      return toast.update(toastId, {
        render: "Could not complete payment!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }

    await fetch(`http://localhost:5000/api/v1/bookings/create-booking`, {
      method: "POST",
      body: JSON.stringify({ paymentToken }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    dispatch(bookingsActions.addBooking({ tour, price: tour.price }));

    toast.update(toastId, {
      render: "Payment successfully completed!",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const onChangeHandler = (event) => {
    setComplete(event.complete);
  };
  return (
    <section className={styles["section-payment"]}>
      <div className={styles.payment}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="card" className={styles.card_label}>
            Card
          </label>
          <CardElement
            id="card"
            className={styles.card}
            options={cardElementOptions}
            onChange={onChangeHandler}
          />
          <button
            disabled={!stripe}
            className="btn btn--small btn--green right"
          >
            Pay
          </button>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;

import { bookingsActions } from "./bookings-slice";

export const getAllBookings = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/get-my-bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Getting bookings failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const {
        data: { bookings },
      } = await sendRequest();

      dispatch(
        bookingsActions.setBookings({
          bookings,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

import { toursActions } from "./tours-slice";
import { toast } from "react-toastify";

export const createNewTour = (tour, token, navigate) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/v1/tours", {
        method: "POST",
        body: tour,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Creating tour failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const newTour = await toast.promise(sendRequest(), {
        pending: "Creating ⚙️",
        success: "Created a new tour successfully🔑",
        error: "Please check your inputs and try again⚠️",
      });

      dispatch(
        toursActions.addTour({
          newTour: newTour.data.newTour,
        })
      );

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateTour = (tour, id, token, navigate) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tours/${id}`, {
        method: "PATCH",
        body: tour,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Updating tour failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const updatedTour = await toast.promise(sendRequest(), {
        pending: "Updating ⚙️",
        success: "Updated the tour successfully🔑",
        error: "Please check your inputs and try again⚠️",
      });

      dispatch(
        toursActions.replaceTour({
          newTour: updatedTour.data.updatedTour,
        })
      );

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteTour = (id, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/tours/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Deleting tour failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      await toast.promise(sendRequest(), {
        pending: "Deleting ⚙️",
        success: "Deleted a tour successfully🔑",
        error: "Failed, Try again⚠️",
      });

      dispatch(
        toursActions.removeTour({
          id: id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllTours = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/v1/tours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Getting tours failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const toursData = await sendRequest();

      dispatch(
        toursActions.setTours({
          tours: toursData.data.tours,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

import { usersActions } from "./users-slice";
import { toast } from "react-toastify";

export const deleteUser = (id, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Deleting user failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      await toast.promise(sendRequest(), {
        pending: "Deleting ⚙️",
        success: "Deleted a user successfully🔑",
        error: "Failed, Try again⚠️",
      });

      dispatch(
        usersActions.removeUsers({
          id: id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/api/v1/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Getting toura failed.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const usersData = await sendRequest();

      dispatch(
        usersActions.setUsers({
          users: usersData.data.users,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

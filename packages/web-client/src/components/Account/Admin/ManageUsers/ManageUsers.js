import styles from "./ManageUsers.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../../../store/users-actions";
import { useEffect } from "react";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    role === "admin" && dispatch(getAllUsers(token));
  }, [role, token, dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id, token));
  };
  return (
    <div className={styles["admin-view__content"]}>
      <div className={styles["users"]}>
        {users.map(({ _id, name, email }) => (
          <div key={_id} className={styles["user__card"]}>
            <div className={styles["user__avatar"]}>
              <div className={styles["user__name"]}>
                <img
                  src="/img/users/user-7.jpg"
                  alt="Jim Brown"
                  className={styles["user__avatar-img"]}
                />
                <h6 className={styles["user"]}>{name}</h6>
              </div>
              <div className={styles["user__data"]}>
                <svg className={styles["user__icon"]}>
                  <use href="img/icons.svg#icon-mail"></use>
                </svg>
                <span>{email}</span>
              </div>
            </div>
            <div className={styles["user__button"]}>
              <Link
                onClick={deleteHandler.bind(null, _id)}
                to="/account/users"
                className="btn btn--delete btn--small"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;

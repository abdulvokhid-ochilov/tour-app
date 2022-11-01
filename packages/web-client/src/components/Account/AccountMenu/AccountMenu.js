import styles from "./AccountMenu.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { authActions } from "../../../store/auth-slice";

const AccountMenu = () => {
  const role = useSelector((state) => state.auth.user.role);
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);

  const clickHandler = (prop) => {
    setActive(prop);
  };

  const logOutHandler = () => {
    dispatch(authActions.logoutUser());
  };
  return (
    <nav className={styles["user-view__menu"]}>
      <ul className={styles["side-nav"]}>
        <li key="settings">
          <NavLink
            to="/account"
            className={active && styles["side-nav--active"]}
            onClick={clickHandler.bind(null, true)}
          >
            <svg>
              <use href="/img/icons.svg#icon-settings"></use>
            </svg>
            Settings
          </NavLink>
        </li>
        {role !== "admin" && (
          <>
            <li key="bookings">
              <NavLink
                to="/bookings"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-briefcase"></use>
                </svg>
                My bookings
              </NavLink>
            </li>
            <li key="reviews">
              <NavLink
                to="/account/reviews"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
                My reviews
              </NavLink>
            </li>
            <li key="review">
              <NavLink
                to="/account/review"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-edit-3"></use>
                </svg>
                Leave a review
              </NavLink>
            </li>
            <li key="billing">
              <NavLink
                to="/account/billing"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-credit-card"></use>
                </svg>
                Billing
              </NavLink>
            </li>
          </>
        )}
        {role === "admin" && (
          <>
            <li key="tours">
              <NavLink
                to="/account/tours"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-map"></use>
                </svg>
                Manage tours
              </NavLink>
            </li>
            <li key="create-tour">
              <NavLink
                to="/account/create-tour"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-map-pin"></use>
                </svg>
                Create a tour
              </NavLink>
            </li>
            <li key="users">
              <NavLink
                to="/account/users"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-users"></use>
                </svg>
                Manage users
              </NavLink>
            </li>
            <li key="admin-reviews">
              <NavLink
                to="/account/reviews"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-star"></use>
                </svg>
                Manage reviews
              </NavLink>
            </li>
            <li key="manage-bookings">
              <NavLink
                to="/account/bookings"
                className={(navData) =>
                  navData.isActive ? styles["side-nav--active"] : null
                }
                onClick={clickHandler.bind(null, false)}
              >
                <svg>
                  <use href="/img/icons.svg#icon-briefcase"></use>
                </svg>
                Manage bookings
              </NavLink>
            </li>
          </>
        )}
        <li key="log-out">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? styles["side-nav--active"] : null
            }
            onClick={logOutHandler}
          >
            <svg>
              <use href="/img/icons.svg#icon-log-out"></use>
            </svg>
            Log out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AccountMenu;

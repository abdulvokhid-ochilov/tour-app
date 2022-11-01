import styles from "./CreateTour.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewTour } from "../../../../store/tours-actions";
import Autocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const CreateTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [coverImg, setCoverImg] = useState({ src: null, file: null });
  const [tourImg1, setTourImg1] = useState({ src: null, file: null });
  const [tourImg2, setTourImg2] = useState({ src: null, file: null });
  const [tourImg3, setTourImg3] = useState({ src: null, file: null });
  const [lat, setLat] = useState(37.4563);
  const [lng, setLng] = useState(126.7052);
  const [stops, setStops] = useState([]);

  const name = useRef();
  const duration = useRef();
  const groupSize = useRef();
  const difficulty = useRef();
  const price = useRef();
  const date = useRef();
  const place = useRef();
  const summary = useRef();
  const description = useRef();

  const clearHandler = (e) => {
    e.preventDefault();
    setStops([]);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name.current.value);
    formData.append("duration", duration.current.value);
    formData.append("maxGroupSize", groupSize.current.value);
    formData.append("difficulty", difficulty.current.value);
    formData.append("price", price.current.value);
    formData.append("summary", summary.current.value);
    formData.append("description", description.current.value);
    formData.append("imageCover", coverImg.file);
    formData.append("images", tourImg1.file);
    formData.append("images", tourImg2.file);
    formData.append("images", tourImg3.file);
    formData.append("startDates", date.current.value);

    stops.forEach((stop) => {
      formData.append("stops", JSON.stringify(stop));
    });

    formData.append("location[place]", place.current.value);
    formData.append("location[lat]", lat);
    formData.append("location[lng]", lng);

    dispatch(createNewTour(formData, token, navigate));
  };

  return (
    <div className={styles["admin-view__content"]}>
      <div className={styles["admin-view__form-container"]}>
        <h2 className="heading-secondary ma-bt-md">Create a tour</h2>
        <form onSubmit={formSubmitHandler}>
          <div className={styles["form__group"]}>
            <label className={styles["form__label"]} htmlFor="name">
              Name
            </label>
            <input
              ref={name}
              type="text"
              className={styles["form__input"]}
              required
            />
            <label className={styles["form__label"]} htmlFor="duration">
              Duration
            </label>
            <input
              ref={duration}
              type="number"
              className={styles["form__input"]}
              min="1"
              max="30"
              required
            />
            <label className={styles["form__label"]} htmlFor="group_size">
              Group Size
            </label>
            <input
              ref={groupSize}
              type="number"
              className={styles["form__input"]}
              min="1"
              max="30"
              required
            />
            <label className={styles["form__label"]} htmlFor="difficulty">
              Difficulty
            </label>
            <select
              ref={difficulty}
              name="difficulty"
              className={`${styles["form__input"]} ${styles["form__select"]}`}
              id="tours-select"
              required
            >
              <option value="easy" className="options">
                easy
              </option>
              <option value="medium" className="options">
                medium
              </option>
              <option value="difficult" className="options">
                difficult
              </option>
            </select>
            <label className={styles["form__label"]} htmlFor="price">
              Price($)
            </label>
            <input
              ref={price}
              type="number"
              className={styles["form__input"]}
              min="1"
              max="100000"
              required
            />
            <label className={styles["form__label"]} htmlFor="date">
              Date
            </label>
            <input
              ref={date}
              type="date"
              className={styles["form__input"]}
              required
            />
            <label className={styles["form__label"]} htmlFor="place">
              Place
            </label>
            <Autocomplete
              ref={place}
              className={styles["form__input"]}
              apiKey={key}
              onPlaceSelected={(place) => {
                setLat(place.geometry.location.lat());
                setLng(place.geometry.location.lng());
              }}
            />
            <label className={styles["form__label"]} htmlFor="map">
              Click on the map to set the stops of the tour
            </label>
            <div className={styles.map}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: key,
                  libraries: ["places"],
                }}
                center={[lat, lng]}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                onClick={({ lat, lng }) => {
                  setStops([...stops, { lat, lng }]);
                }}
              >
                {stops.map(({ lat, lng }, i) => (
                  <div className={styles.marker} key={i} lat={lat} lng={lng}>
                    🚩
                  </div>
                ))}
              </GoogleMapReact>
            </div>
          </div>
          <div className={`${styles["form__group"]} right`}>
            <button
              onClick={clearHandler}
              className="btn btn--small btn--green"
            >
              Clear
            </button>
          </div>

          <div className={`${styles["form__group"]} ma-bt-md"`}>
            <label className={styles["form__label"]} htmlFor="summary">
              Summary
            </label>

            <textarea
              ref={summary}
              className={styles["form__input"]}
              id={styles["textarea"]}
              type="text"
              required
              name="summary"
              rows="3"
              defaultValue=" Leave summary for the tour..."
            ></textarea>
            <label className={styles["form__label"]} htmlFor="description">
              Description
            </label>

            <textarea
              ref={description}
              className={styles["form__input"]}
              id={styles["textarea"]}
              type="text"
              required
              name="description"
              rows="5"
              cols="33"
              defaultValue=" Leave description for the tour..."
            ></textarea>
          </div>
          <div
            className={`${styles["form__group"]} ${styles["form__photo-upload"]}`}
          >
            <div className={styles["photo__group"]}>
              <img
                className={styles["form__tour-photo"]}
                src={coverImg.src}
                alt=""
              />
              <input
                required
                className={styles["form__upload"]}
                type="file"
                accept="image/*"
                id="cover"
                name="cover"
                onChange={(e) => {
                  setCoverImg({
                    src: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  });
                }}
              />
              <label htmlFor="cover">Choose a cover image</label>
            </div>
            <div className={styles["photo__group"]}>
              <img
                className={styles["form__tour-photo"]}
                src={tourImg1.src}
                alt=""
              />
              <input
                required
                className={styles["form__upload"]}
                type="file"
                accept="image/*"
                id="photo1"
                name="photo1"
                onChange={(e) => {
                  setTourImg1({
                    src: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  });
                }}
              />
              <label htmlFor="photo1">Choose a tour image</label>
            </div>
            <div className={styles["photo__group"]}>
              <img
                className={styles["form__tour-photo"]}
                src={tourImg2.src}
                alt=""
              />
              <input
                required
                className={styles["form__upload"]}
                type="file"
                accept="image/*"
                id="photo2"
                name="photo2"
                onChange={(e) => {
                  setTourImg2({
                    src: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  });
                }}
              />
              <label htmlFor="photo2">Choose a tour image</label>
            </div>
            <div className={styles["photo__group"]}>
              <img
                className={styles["form__tour-photo"]}
                src={tourImg3.src}
                alt=""
              />
              <input
                required
                className={styles["form__upload"]}
                type="file"
                accept="image/*"
                id="photo3"
                name="photo3"
                onChange={(e) => {
                  setTourImg3({
                    src: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0],
                  });
                }}
              />
              <label htmlFor="photo3">Choose a tour image</label>
            </div>
          </div>

          <div className={`${styles["form__group"]} right`}>
            <button className="btn btn--small btn--green">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTour;

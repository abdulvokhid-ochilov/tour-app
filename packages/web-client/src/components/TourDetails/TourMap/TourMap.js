import styles from "./TourMap.module.css";
import GoogleMapReact from "google-map-react";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const TourMap = ({ location: { lat, lng }, stops }) => {
  return (
    <section className={styles["section-map"]}>
      <div id={styles["map"]}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: key,
            libraries: ["places"],
          }}
          center={[+lat, +lng]}
          defaultZoom={15}
          margin={[50, 50, 50, 50]}
        >
          {stops.map((stop, i) => (
            <div
              className={styles.marker}
              key={i}
              lat={JSON.parse(stop).lat}
              lng={JSON.parse(stop).lng}
            >
              🚩
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </section>
  );
};

export default TourMap;

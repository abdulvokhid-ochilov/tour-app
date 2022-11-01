import { useEffect, useState } from "react";
import TourHeader from "../components/TourDetails/TourHeader/TourHeader";
import TourDescription from "../components/TourDetails/TourDescription/TourDescription";
import TourPictures from "../components/TourDetails/TourPictures/TourPictures";
import TourMap from "../components/TourDetails/TourMap/TourMap";
import TourReviews from "../components/TourDetails/TourReviews/TourReviews";
import TourCTA from "../components/TourDetails/TourCTA/TourCTA";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 25% auto;
`;

const TourPage = () => {
  const id = useParams().id;
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/tours/${id}`)
      .then((results) => results.json())
      .then((data) => {
        setTour(data.data.tour);
      });

    fetch(`http://localhost:5000/api/v1/tours/${id}/reviews`)
      .then((results) => results.json())
      .then((data) => {
        setReviews(data.data.reviews);
      });
  }, [id]);

  return tour ? (
    <>
      <TourHeader
        name={tour.name}
        duration={tour.duration}
        location={tour.location}
        cover={tour.imageCover}
      />
      <TourDescription
        startDates={tour.startDates}
        ratingsAverage={tour.ratingsAverage}
        maxGroupSize={tour.maxGroupSize}
        name={tour.name}
        description={tour.description}
        difficulty={tour.difficulty}
      />
      <TourPictures images={tour.images} />
      <TourMap location={tour.location} stops={tour.stops} />
      <TourReviews reviews={reviews} />
      <TourCTA images={tour.images} tour={tour} duration={tour.duration} />
    </>
  ) : (
    <div className="main">
      <PuffLoader color="#55c57a" css={override} />
    </div>
  );
};

export default TourPage;

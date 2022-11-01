import Card from "../Card/Card";
import styles from "./Tours.module.css";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Tours = () => {
  const tours = useSelector((state) => state.tours.tours);
  const [filteredTours, setFilteredTours] = useState(tours);
  const search = useSelector((state) => state.tours.search);

  useEffect(() => {
    let filtered = tours.filter(
      (tour) => tour.name.toLowerCase().includes(search.toLowerCase()) === true
    );

    setFilteredTours(filtered);
  }, [search, tours]);

  return (
    <main className="main">
      <motion.div className={styles["card-container"]}>
        <AnimatePresence>
          {filteredTours.length > 0 ? (
            filteredTours.map(
              ({
                _id,
                name,
                duration,
                difficulty,
                ratingsAverage = 0,
                ratingsQuantity = 0,
                price,
                summary,
                imageCover,
                maxGroupSize,
                location,
                startDates,
                stops,
              }) => (
                <Card
                  key={_id}
                  id={_id}
                  name={name}
                  duration={duration}
                  difficulty={difficulty}
                  ratingsAverage={ratingsAverage}
                  ratingsQuantity={ratingsQuantity}
                  price={price}
                  summary={summary}
                  imageCover={imageCover}
                  maxGroupSize={maxGroupSize}
                  location={location}
                  startDates={startDates}
                  stops={stops}
                />
              )
            )
          ) : (
            <motion.h3
              layout
              animate={{ opacity: 1, y: 200 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="heading-secondary heading-secondary--error"
            >
              It looks like there aren't many great matches for your search. 🚫
            </motion.h3>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default Tours;

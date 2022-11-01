import styles from "./Account.module.css";
import { motion } from "framer-motion";

const Account = (props) => {
  return (
    <main className="main">
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className={styles["user-view"]}
      >
        {props.children}
      </motion.div>
    </main>
  );
};

export default Account;

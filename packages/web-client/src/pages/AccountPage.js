import { Routes, Route } from "react-router-dom";
import Account from "../components/Account/Account";
import AccountMenu from "../components/Account/AccountMenu/AccountMenu";
import AccountReview from "../components/Account/AccountReview/AccountReview";
import AccountReviews from "../components/Account/AccountReviews/AccountReviews";
import AccountSettings from "../components/Account/AccountSettings/AccountSettings";
import CreateTour from "../components/Account/Admin/CreateTour/CreateTour";
import ManageTours from "../components/Account/Admin/ManageTours/ManageTours";
import ManageUsers from "../components/Account/Admin/ManageUsers/ManageUsers";
import EditTour from "../components/Account/Admin/EditTour/EditTour";
import NotFound from "./NotFound";

const AccountPage = (props) => {
  return (
    <Account>
      <AccountMenu />
      <Routes>
        <Route path="/" element={<AccountSettings />} />
        <Route path="/reviews" element={<AccountReviews />} />
        <Route path="/review" element={<AccountReview />} />
        <Route path="/tours" element={<ManageTours />} />
        <Route path="/tours/:id" element={<EditTour />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/create-tour" element={<CreateTour />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Account>
  );
};

export default AccountPage;

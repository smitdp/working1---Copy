import { Routes, Route } from "react-router-dom";
import Policies from "./components/Policies/Policies";
import PolicyDetails from "./components/policyDetails/PolicyDetails";
import Login from "./components/Login/Login";
import MyPolicies from "./components/MyPolicies/MyPolicies";
import LoginProvider from "./context/LoginContext";
import UserInformationProvider from "./context/UserInformationContext";
import RegisterPage from "./Pages/RegisterPage";
import ClaimForm from "./components/ClaimForm/ClaimForm";
import AppLayout from "./Pages/AppLayout";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import LoginPage from "./Pages/LoginPage";
import UserHome from "./components/UserHome/UserHome";
import UserProfile from "./components/UserProfile/UserProfile";
import UserList from "./components/UserList/UserList";
import ReviewClaims from "./components/ReviewClaims/ReviewClaims";
import DocumentList from "./components/DocumentList/DocumentList";
import AdminAnalytics from './components/AdminAnalytics/AdminAnalytics';
import ManagePolicies from './components/adminPolicies/ManagePolicies';
import AddPolicy from './components/adminPolicies/AddPolicy';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';


function App() {
  return (
    <div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<UserHome />} />
          <Route path="policies" element={<Policies />} />
          <Route path="policy" element={<PolicyDetails />} />
          <Route path="my-policies" element={<MyPolicies />} />
          <Route path="claim" element={<ClaimForm />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='admin-home' element={<AdminAnalytics />} />
          <Route path='manage-users' element={<UserList />} />
          <Route path='manage-claims' element={<ReviewClaims />} />
          <Route path='manage-documents' element={<DocumentList />} />
          <Route path='manage-policies' element={<ManagePolicies />} />
          <Route path="manage-policies/add-policy" element={<AddPolicy />} />
         

        </Route>
      </Routes>


    </div>
  );
}

export default App;

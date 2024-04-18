import React from "react";
import PolicyTypesWithIcon from "../PolicytypesWithIcon/PolicyTypesWithIcon";
import Testimonials from "../Testimonials/Testimonials";
import WhyCybsure from "../WhyCybsure/WhyCybsure";

const UserHome = () => {
  return (
    <div>
      <WhyCybsure />
      <PolicyTypesWithIcon />
      <Testimonials />
    </div>
  );
};

export default UserHome;

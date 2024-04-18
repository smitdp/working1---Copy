import { Grid, Typography } from "@mui/material";
import React from "react";
import familyImage from "../../assets/Images/family1.png";

const PoliciesHeroSection = () => {
  return (
   <div style={{padding:""}}>
     <Grid container  sx={{alignItems:"center", background:"white", borderRadius:"0.5rem", padding:"0 2rem", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 5px 0px"}}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" sx={{fontFamily:"Nunito",fontWeight:"900", fontSize:"3rem", color:"pink"}} >
          Let's find you the Best Insurance
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ overflow:"hidden", height:"300px"}}>
        <img
          src={familyImage}
          alt="Placeholder Image"
          style={{ width: "100%", height: "100%", objectFit:'contain', transform:"scaleX(-1)" }}
        />
      </Grid>
    </Grid>
   </div>
  );
};

export default PoliciesHeroSection;

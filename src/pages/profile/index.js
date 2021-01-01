import React from "react";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/AppBarHeader";

import UserInfo from "./UserInfo/UserInfo";
import HeatMap from "./HeatMap/HeatMap";
import StreakScore from "./StreakScore/StreakScore";

export default function Profile() {
  return (
    <div>
      <Header />
      <UserInfo />
      <HeatMap />
      <StreakScore />
      <Footer />
    </div>
  );
}

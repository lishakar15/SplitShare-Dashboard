import React from "react";
import BalanceBoard from "./Balance/BalanceBoard";
import BalanceAppBar from "./Balance/BalanceAppBar";
import BalanceCard from "./Balance/BalanceCard";

const Home = () => {

  return (
    <>
      <BalanceBoard />
      <BalanceAppBar />
      <BalanceCard />
    </>
  );
};

export default Home;
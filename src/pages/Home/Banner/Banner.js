import React from "react";
import chair from "../../../assets/images/chair.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import './Banner.css'
const Banner = () => {
  return (
    <div
      className="hero banner"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="md:w-1/2 rounded-lg shadow-2xl" alt="" />
        <div className="text-accent">
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>
          <PrimaryButton>Getting Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React from "react";

const Banner = () => {
  return (
    <div
      className="img-fluid d-flex  align-items-center justify-content-center"
      style={{
        height: "80vh",
        backgroundAttachment: " fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://en.pimg.jp/061/905/774/1/61905774.jpg")`,
      }}
    >
      <div>
        <h1
          className="text-light text-center text-capitalize my-4 px-2"
          style={{ fontSize: "3rem" }}
        >
          FIND YOUR DREAM CAR
        </h1>
        <h5
          className="  px-2  text-light  text-center"
          style={{ color: "gray" }}
        >
          WELCOME TO OCEAN OF CARS. FIND YOUR DESIRED CAR FROM OUR CARS OCEAN!
        </h5>
      </div>
    </div>
  );
};

export default Banner;

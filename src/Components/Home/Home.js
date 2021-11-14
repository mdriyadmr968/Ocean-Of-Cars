import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Reviews from "../Reviews/Reviews";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import Subscribe from "../Subscribe/Subscribe";
import ContuctUS from "./ContuctUS/ContuctUS";
import './Home.css'

const Home = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios
      .get("https://hidden-eyrie-12216.herokuapp.com/allCars")

      .then((res) => setCars(res.data.slice(0, 6)));
  }, []);
  return (
    <>
      <div style={{ marginBottom: "370px" }}>
        <Navbar />
        <Banner />
        <div className="container my-5">
          <h2 className="my-3 text-center">
            <span className="text-danger fw-bold">
              {" "}
              TOP CARS OF THE YEAR
            </span>
          </h2>
          <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {cars.map((car) => {
              return (
                <div className="col " key={car._id}>
                  <div className="card backgrounds h-100">
                    <div className="cardsimage">
                      <img
                        src={car.img}
                        className="card-img-top h-100"
                        alt="..."
                      />
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{car.name}</h4>
                      <h5 className="card-title my-4">Price : ${car.price}</h5>
                      <p className="card-text text-wrap">{car.desc}</p>
                      <Link to={`/purchase/${car._id}`}>
                        <button className="w-100 btn btn-dark">
                          Purchase now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Reviews />
        <Subscribe />
        <ContuctUS />

      </div>
      <Footer />
    </>
  );
};

export default Home;

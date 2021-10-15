import React, { useEffect, useState } from "react";
import "./HomeBrands.css";
import { axiosConfigured } from "../../../axiosInstance";
import { BeatLoader } from "react-spinners";

const HomeBrands = () => {
  const [brands, setbrands] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async () => {
      setloading(true);
      const response = await axiosConfigured.get("/getBRandForHome");
      setbrands(response.data);
      if (response.status === 200) {
        setloading(false);
      }
    })();
  }, []);
  return (
    <div className="brandContainer">
      {loading ? (
        <div className="">
          <BeatLoader />
        </div>
      ) : null}

      {brands.map((brand, index) => (
        <div className="imageBrand" key={index}>
          <img
            style={{ width: `100px`, height: `70px` }}
            src={`http://127.0.0.1:9005/${brand.brandImage}`}
          />
        </div>
      ))}
    </div>
  );
};

export default HomeBrands;

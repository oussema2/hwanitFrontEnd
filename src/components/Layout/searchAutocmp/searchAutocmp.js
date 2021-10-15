import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { axiosConfigured } from "../../../axiosInstance";
import "./searchAutocmp.css";
import { FaSearch } from "react-icons/fa";
const SearchAutocmp = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {}, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };
  const getSearch = async (target) => {
    setloading(true);

    if (target.length === 0) {
      setOptions([]);
      return;
    }
    setSearch(target);
    const response = await axiosConfigured.get(`/getSearchProduit/${search}`);
    setOptions(response.data);
    if (response) {
      setloading(false);
    }
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="btnInputSearchHome">
        <input
          className="inputSearchHome"
          id="auto"
          onClick={() => setDisplay(true)}
          placeholder="Type to search"
          onChange={(event) => getSearch(event.target.value)}
        />
        <Link to={`/produits/search/${search}/1`}>
          <button className="SearchBTnHome" onClick={() => setDisplay(false)}>
            <FaSearch />
          </button>
        </Link>
      </div>
      {display && (
        <div
          className={`autoContainer ${options.length > 0 ? "fullSearch" : ""}`}
        >
          {options.length > 0 ? (
            loading === false ? (
              options.map((value, i) => (
                <Link
                  key={i}
                  to={`/produit/${value._id}`}
                  style={{ textDecoration: `none`, color: `black` }}
                >
                  <div
                    onClick={() => updatePokeDex(value.nom)}
                    className="optionSearch"
                    key={i}
                    tabIndex="0"
                    value={search}
                    autoComplete="off"
                  >
                    {value.nom}
                    <img
                      src={`http://localhost:8000/images/produit/${value._id}/s/${value.thumbnail}`}
                      style={{ marginRight: "25px" }}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <div className="optionSearchNull">
                <BeatLoader />{" "}
              </div>
            )
          ) : (
            <div className="optionSearchNull">No Result</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAutocmp;

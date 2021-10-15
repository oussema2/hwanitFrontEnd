/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./NavSide.css";
import { IoIosArrowDown } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavSide = ({ action }) => {
  const [actionSelected, setactionSelected] = useState("");
  const [display, setdisplay] = useState(true);
  const [heightNav, setheight] = useState({ valueBeight: "100vh" });
  const displaySideNAv = () => {
    setdisplay(!display);
  };

  useEffect(() => {
    setheight(
      Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
    );
  }, []);

  const formatPath = (action) => {
    let noEspace = "/pannel/" + action.replace(/ /g, "");
    return noEspace;
  };

  const expandLIst = (name) => {
    if (actionSelected === name) {
      setactionSelected("");
    } else {
      setactionSelected(name);
    }
  };

  const resizeNav = () => {
    var body = document.body,
      html = document.documentElement;

    setheight(
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    );
  };
  return (
    <div style={{ height: `100%` }}>
      <div className="sideNavContainer">
        <div
          style={{ height: `${heightNav?.valueBeight}` }}
          className={`${!display ? "hide " : "show "}sideNavPannel`}
        >
          <div className="titleContainer">
            <Link to="/pannel">
              <h3 className="title">Hwanit Pannel</h3>
            </Link>
          </div>
          <div className="profileSide">
            <img
              src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC`}
              className="profileSideImage"
            />
            <div className="profileName">
              <p>oussema Dabboussi</p>
            </div>
          </div>

          <div className="navSideMenu">
            {action.map((item) => (
              <div
                key={item.name}
                className={`${
                  actionSelected === item.name ? "expand" : "close"
                } actionMEnu`}
              >
                <div
                  className="actionMEnuwrapper"
                  onClick={() => expandLIst(item.name)}
                >
                  <div className="titleAction">
                    <FontAwesomeIcon
                      className="iconTitle"
                      icon={item.icon}
                    ></FontAwesomeIcon>
                    <h4>{item.name}</h4>
                  </div>
                  <div className="arrowIcon">
                    <IoIosArrowDown />
                  </div>
                </div>
                <div className="list">
                  {item.actions.map((action) => (
                    <ul className="listeActions" key={action}>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={() => formatPath(action)}
                      >
                        <li onClick={resizeNav} className="listeActionsitem">
                          {action}
                        </li>
                      </Link>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${!display ? "hideheader " : "showheader "} headerPannel`}
      >
        <div className="headerIconContainer" onClick={displaySideNAv}>
          <FiAlignJustify className="headerIcon" />
        </div>

        <div className="headerside"></div>
      </div>
    </div>
  );
};

export default NavSide;

import "../assest/home.css";
import React, { useState, useRef,useEffect } from "react";
import data from "../data/alldata.json";
import user from "../data/user.json";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav, Button, Form, Container } from "react-bootstrap";
import Navigation from "./Navbar";

const Home = () => {
  const [categorys, setCategorys] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [usersList, setUsersList] = useState(user);

  const users = window.localStorage.getItem("users");
  const dt = window.localStorage.getItem("data");
  useEffect(() => {
    if (users) {
      window.localStorage.setItem("users", users);
      window.localStorage.setItem("data", dt);
    } else {
      window.localStorage.setItem("users", JSON.stringify(usersList));
      window.localStorage.setItem("data", JSON.stringify(categorys));
    }
  }, [usersList]);

  const handleOnClick = (id) => {
    navigate(`../filmdetail/id/${id}/`);
  };
  const handleOnClickC = (category) => {
    setSelectedCategory(category);
  };

  const GetScore = (film) => {
    var sc = 0;
    var total = 0;
    film.comment != undefined &&
      film.comment != null &&
      film.comment.forEach((f) => {
        if (f.score != null) {
          sc += f.score;
          total += 1;
        }
      });
    if (total != 0) sc = (sc / total).toFixed(1);
    return sc;
  };
  const handleSearch = () => {
    const filtered = categorys.reduce(
      (acc, category) =>
        acc.concat(
          category.film.filter((film) =>
            film.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        ),
      []
    );
  };

  return (
    <div className="container-fluid">
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="row">
        <div className="col-2">
          <h2>Thể loại</h2>
          <ul>
            {categorys != null &&
              categorys.map((category) => {
                return (
                  <li key={category.id}>
                    <a
                      href="#"
                      onClick={() => {
                        handleOnClickC(category);
                      }}
                    >
                      {category.title}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="col-8">
          <div className="row" style={{ marginTop: "30px," }}>
            {categorys != null &&
              categorys.map((category) => {
                return (
                  (selectedCategory == null ||
                    selectedCategory.id === category.id) &&
                  category != null &&
                  category.film
                    .filter((film) =>
                      film.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((film) => {
                      return (
                        <div key={film.id} className="col-3">
                          <img
                            src={film.img}
                            alt={film.name}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "12vw",
                              height: "16vw",
                              margin: "auto",
                              marginTop: "1vw",
                              cursor: "pointer",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            onClick={() => {
                              handleOnClick(film.id);
                            }}
                          ></img>
                          <h5
                            onClick={() => {
                              handleOnClick(film.id);
                            }}
                            style={{ color: "aqua", cursor: "pointer" }}
                          >
                            {film.name}
                          </h5>
                          <p>Năm: {film.year}</p>
                          <p>Loại: {category.title}</p>
                          <p>Điểm: {GetScore(film)}</p>
                          <Button
                            className="review-btn"
                            onClick={() => {
                              handleOnClick(film.id);
                            }}
                          >
                            Đánh giá
                          </Button>
                        </div>
                      );
                    })
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

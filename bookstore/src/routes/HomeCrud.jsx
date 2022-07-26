import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosClient from "../utils/http.client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const readBooks = async (id) => {
  let url = "/books";
  if (!!id && id > 0) url += `/${id}`;

  const res = await axiosClient.get(url);

  return res.data;
};


const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const searcher = (e) => {
    setSearch(e.target.value);    
  };

  let results = [];
  if (!search) {
    console.log(books);
    results = books;
  } else {
    results = books.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  console.log(results);

  useEffect(() => {
    readBooks().then((res) => {
      setBooks(res);
    });
  }, []);

  const onDelete = (id) => {
    const res = axiosClient.delete(`/books/${id}`);

    setBooks(books.filter((book) => book.id !== id));
  };
  const onUpdate = (id) => {
    navigate(`/cruds/${id}`);
  };
          

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="App">
      <input  className="searchbar"
              value={search}
              onChange={searcher}
              type="text"
              placeholder="Search..."
              
            />
      <Slider {...settings}>
        {results.length>0 && results.map((item) => (
          <div key={item.id} className="card">
            <div className="card-top">
            <img src='../img/libroamarillo.png'/>     
            </div>
            <div className="card-bottom">
              <h1>{item.name}</h1>
              <h2>{item.author}</h2>
              <h3>${item.price}</h3>
              <button
                onClick={() => onDelete(item.id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => onUpdate(item.id)}
                className="modify-button"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";    
import { useEffect, useState } from "react";
import axiosClient from '../utils/http.client';

const readBooks = async (id) => {
  let url = "https://utn-books.herokuapp.com/books";
  if(!!id && id>0) url+=`/${id}`;
  
  const res = await axiosClient.get(url);

  return res.data;
};


const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    readBooks().then((res) => {
      setBooks(res);
    });
  }, []);
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
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        
      <div className='App'>
      <Slider {...settings}>
      {books.map((item)=> (
      <div className="card">
          <div className="card-top">
              <img src={item.image}/>
              
          </div>
          <div className="card-bottom">
          <h1>{item.name}</h1>
              <h2>{item.author}</h2>
              <h3>${item.price}</h3>  
          </div>    
          </div>                 
  ))}
      </Slider>
      </div>
      
    );
  }
  

export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Catalogo.css';

function Catalogo() {
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/catalog.php')
      .then(response => {
        setCatalogData(response.data);
      })
      .catch(error => {
        console.error('Error fetching catalog data:', error);
      });

    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      coverflowEffect: {
        depth: 500,
        modifier: 1,
        slideShadows: true,
        rotate: 0,
        stretch: 0
      }
    });
  }, []);

  return (
    <div className="catalog-container"> 
      <h1>CATÁLOGO</h1>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {catalogData.map(product => (
            <div className="swiper-slide" key={product.id}>
              <div className="icons">
                <i className="fa-solid fa-circle-arrow-left"></i>
                <img src="src/img/logo2.png" alt="logo" />
                <i className="fa-regular fa-heart"></i>
              </div>

              <div className="product-content">
                <div className="product-txt">
                  <span>${product.precio}</span>
                  <h3>{product.nombre}</h3>
                  <ul>
                    {product.ingredientes.split(',').map((ingrediente, index) => (
                      <li key={index}>{ingrediente}</li>
                    ))}
                  </ul>
                </div>
                <div className="product-img">
                  <img src={product.image_url} alt={product.nombre} />
                </div>
              </div>

              <a href="pago.html" className="btn-1">Comprar</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;

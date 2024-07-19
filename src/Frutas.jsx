import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Frutas.css';

function Frutas() {
  const [totalSelectedGrams, setTotalSelectedGrams] = useState(0);
  const [fruits, setFruits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost/frutas_read.php');
        setFruits(response.data);
      } catch (error) {
        console.error('Error fetching fruits:', error);
      }
    };

    fetchFruits();
  }, []);

  useEffect(() => {
    if (fruits.length > 0) {
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

      var totalGrams = 50;
      var gramCounts = {};

      const handlePlusClick = (fruitName, gramCounter, statusMsg) => {
        if (gramCounts[fruitName] < 50 && sumGramCounts() < totalGrams) {
          gramCounts[fruitName] += 10;
          gramCounter.textContent = gramCounts[fruitName] + ' gramos';
          updateStatusMsg(fruitName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes seleccionar más de 50 gramos en total.';
        }
      };

      const handleMinusClick = (fruitName, gramCounter, statusMsg) => {
        if (gramCounts[fruitName] > 0) {
          gramCounts[fruitName] -= 10;
          gramCounter.textContent = gramCounts[fruitName] + ' gramos';
          updateStatusMsg(fruitName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes tener menos de 0 gramos.';
        }
      };

      const updateStatusMsg = (fruitName, statusMsg) => {
        var totalGramsSelected = sumGramCounts();
        var gramCount = gramCounts[fruitName];
        if (gramCount < 50) {
          statusMsg.textContent = 'Ya elegiste ' + gramCount + ' gramos. Te faltan ' + (50 - totalGramsSelected) + ' gramos.';
        } else {
          statusMsg.textContent = 'Ya has alcanzado el límite de 50 gramos para ' + fruitName + '.';
        }
      };

      const sumGramCounts = () => {
        var sum = 0;
        Object.values(gramCounts).forEach(function (count) {
          sum += count;
        });
        return sum;
      };

      const initializeSlides = () => {
        var slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(function (slide) {
          var plusBtn = slide.querySelector('.plus-btn');
          var minusBtn = slide.querySelector('.minus-btn');
          var gramCounter = slide.querySelector('.gram-counter');
          var statusMsg = slide.querySelector('.status-msg');
          var fruitName = slide.querySelector('h3').textContent.trim();

          gramCounts[fruitName] = 0;

          plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handlePlusClick(fruitName, gramCounter, statusMsg);
          });

          minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleMinusClick(fruitName, gramCounter, statusMsg);
          });
        });
      };

      initializeSlides();
    }
  }, [fruits]);

  const handleSiguienteClick = (e) => {
    e.preventDefault();
    navigate('/Extras');
  };

  return (
    <div className="catalog-container">
      <h1>Personaliza tú fruta</h1>
      <h2>Elige mínimo 50 gramos.</h2>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {fruits.map((fruit) => (
            <div className="swiper-slide" key={fruit.id}>
              <div className="icons">
                <i className="fa-solid fa-circle-arrow-left"></i>
                <img src="src/img/logo2.png" alt="logo" />
              </div>
              <div className="product-content">
                <div className="product-txt">
                  <span>${fruit.precio}</span>
                  <h3>{fruit.nombre}</h3>
                </div>
                <div className="product-img">
                  <img src={fruit.image_url} alt={fruit.nombre} />
                </div>
              </div>
              <div className="control-panel">
                <a href="#" className="btn-1 minus-btn">-</a>
                <span className="gram-counter">0 gramos</span>
                <a href="#" className="btn-1 plus-btn">+</a>
              </div>
              <p className="status-msg"></p>
            </div>
          ))}
        </div>
      </div>
      {totalSelectedGrams === 50 && (
        <div className="btn-container">
          <a href="#" className="btn-1 siguiente-btn" onClick={handleSiguienteClick}>Siguiente</a>
        </div>
      )}
    </div>
  );
}

export default Frutas;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Extras.css';

function Extras() {
  const [totalSelectedGrams, setTotalSelectedGrams] = useState(0);
  const [extras, setExtras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get('http://localhost/extras_read.php');
        setExtras(response.data);
      } catch (error) {
        console.error('Error fetching extras:', error);
      }
    };

    fetchExtras();
  }, []);

  useEffect(() => {
    if (extras.length > 0) {
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

      const handlePlusClick = (extraName, gramCounter, statusMsg) => {
        if (gramCounts[extraName] < 50 && sumGramCounts() < totalGrams) {
          gramCounts[extraName] += 10;
          gramCounter.textContent = gramCounts[extraName] + ' gramos';
          updateStatusMsg(extraName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes seleccionar más de 50 gramos en total.';
        }
      };

      const handleMinusClick = (extraName, gramCounter, statusMsg) => {
        if (gramCounts[extraName] > 0) {
          gramCounts[extraName] -= 10;
          gramCounter.textContent = gramCounts[extraName] + ' gramos';
          updateStatusMsg(extraName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes tener menos de 0 gramos.';
        }
      };

      const updateStatusMsg = (extraName, statusMsg) => {
        var totalGramsSelected = sumGramCounts();
        var gramCount = gramCounts[extraName];
        if (gramCount < 50) {
          statusMsg.textContent = 'Ya elegiste ' + gramCount + ' gramos. Te faltan ' + (50 - totalGramsSelected) + ' gramos.';
        } else {
          statusMsg.textContent = 'Ya has alcanzado el límite de 50 gramos para ' + extraName + '.';
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
          var extraName = slide.querySelector('h3').textContent.trim();

          gramCounts[extraName] = 0;

          plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handlePlusClick(extraName, gramCounter, statusMsg);
          });

          minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleMinusClick(extraName, gramCounter, statusMsg);
          });
        });
      };

      initializeSlides();
    }
  }, [extras]);

  const handleSiguienteClick = (e) => {
    e.preventDefault();
    navigate('/Pago');
  };

  return (
    <div className="catalog-container">
      <h1>Personaliza tus extras</h1>
      <h2>Elige mínimo 50 gramos.</h2>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {extras.map((extra) => (
            <div className="swiper-slide" key={extra.id}>
              <div className="icons">
                <i className="fa-solid fa-circle-arrow-left"></i>
                <img src="src/img/logo2.png" alt="logo" />
              </div>
              <div className="product-content">
                <div className="product-txt">
                  <span>${extra.precio}</span>
                  <h3>{extra.nombre}</h3>
                </div>
                <div className="product-img">
                  <img src={extra.image_url} alt={extra.nombre} />
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
          <a href="#" className="btn-1 siguiente-btn" onClick={handleSiguienteClick}>Pagar</a>
        </div>
      )}
    </div>
  );
}

export default Extras;

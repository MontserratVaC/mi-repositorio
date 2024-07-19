import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Refresco.css';

function Refresco() {
  const [totalSelectedGrams, setTotalSelectedGrams] = useState(0);
  const [refreshments, setRefreshments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefreshments = async () => {
      try {
        const response = await axios.get('http://localhost/refresco_read.php');
        setRefreshments(response.data);
      } catch (error) {
        console.error('Error fetching refreshments:', error);
      }
    };

    fetchRefreshments();
  }, []);

  useEffect(() => {
    if (refreshments.length > 0) {
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

      var totalGrams = 700; // Ajuste para 700 gramos en total
      var gramCounts = {};

      const handlePlusClick = (refreshmentName, gramCounter, statusMsg) => {
        if (gramCounts[refreshmentName] < totalGrams && sumGramCounts() < totalGrams) {
          gramCounts[refreshmentName] += 100;
          gramCounter.textContent = gramCounts[refreshmentName] + ' gramos';
          updateStatusMsg(refreshmentName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes seleccionar más de 700 gramos en total.';
        }
      };

      const handleMinusClick = (refreshmentName, gramCounter, statusMsg) => {
        if (gramCounts[refreshmentName] > 0) {
          gramCounts[refreshmentName] -= 100;
          gramCounter.textContent = gramCounts[refreshmentName] + ' gramos';
          updateStatusMsg(refreshmentName, statusMsg);
          setTotalSelectedGrams(sumGramCounts());
        } else {
          statusMsg.textContent = 'No puedes tener menos de 0 gramos.';
        }
      };

      const updateStatusMsg = (refreshmentName, statusMsg) => {
        var totalGramsSelected = sumGramCounts();
        var gramCount = gramCounts[refreshmentName];
        if (gramCount < totalGrams) {
          statusMsg.textContent = 'Ya elegiste ' + gramCount + ' gramos. Te faltan ' + (totalGrams - totalGramsSelected) + ' gramos.';
        } else {
          statusMsg.textContent = 'Ya has alcanzado el límite de 700 gramos para ' + refreshmentName + '.';
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
          var gramCounter = slide.querySelector('.oz-counter');
          var statusMsg = slide.querySelector('.status-msg');
          var refreshmentName = slide.querySelector('h3').textContent.trim();

          gramCounts[refreshmentName] = 0;

          plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handlePlusClick(refreshmentName, gramCounter, statusMsg);
          });

          minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleMinusClick(refreshmentName, gramCounter, statusMsg);
          });
        });
      };

      initializeSlides();
    }
  }, [refreshments]);

  const handlePagarClick = (e) => {
    e.preventDefault();
    navigate('/Frutas');
  };

  return (
    <div className="catalog-container">
      <h1>Personaliza tú refresco</h1>
      <h2>Elige mínimo 700 gramos.</h2>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {refreshments.map((refreshment) => (
            <div className="swiper-slide" key={refreshment.id}>
              <div className="icons">
                <i className="fa-solid fa-circle-arrow-left"></i>
                <img src="src/img/logo2.png" alt="logo" />
              </div>
              <div className="product-content">
                <div className="product-txt">
                  <span>${refreshment.precio}</span>
                  <h3>{refreshment.nombre}</h3>
                </div>
                <div className="product-img">
                  <img src={refreshment.image_url} alt={refreshment.nombre} />
                </div>
              </div>
              <div className="control-panel">
                <a href="#" className="btn-1 minus-btn">-</a>
                <span className="oz-counter">0 gramos</span>
                <a href="#" className="btn-1 plus-btn">+</a>
              </div>
              <p className="status-msg"></p>
            </div>
          ))}
        </div>
      </div>
      {totalSelectedGrams === 700 && (
        <div className="btn-container">
          <a href="#" className="btn-1 siguiente-btn" onClick={handlePagarClick}>Siguiente</a>
        </div>
      )}
    </div>
  );
}

export default Refresco;

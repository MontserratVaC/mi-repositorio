import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Alcohol.css';

function Alcohol() {
  const [totalSelectedOz, setTotalSelectedOz] = useState(0);
  const [liquors, setLiquors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiquors = async () => {
      try {
        const response = await axios.get('http://localhost/alcohol_read.php');
        setLiquors(response.data);
      } catch (error) {
        console.error('Error fetching liquors:', error);
      }
    };

    fetchLiquors();
  }, []);

  useEffect(() => {
    if (liquors.length > 0) {
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

      var totalOz = 6; 
      var ozCounts = {};

      const handlePlusClick = (liquorName, ozCounter, statusMsg) => {
        if (ozCounts[liquorName] < totalOz && sumOzCounts() < totalOz) {
          ozCounts[liquorName]++;
          ozCounter.textContent = ozCounts[liquorName] + ' oz';
          updateStatusMsg(liquorName, statusMsg);
          setTotalSelectedOz(sumOzCounts());
        } else {
          statusMsg.textContent = 'No puedes seleccionar más de 6 oz en total.';
        }
      };

      const handleMinusClick = (liquorName, ozCounter, statusMsg) => {
        if (ozCounts[liquorName] > 0) {
          ozCounts[liquorName]--;
          ozCounter.textContent = ozCounts[liquorName] + ' oz';
          updateStatusMsg(liquorName, statusMsg);
          setTotalSelectedOz(sumOzCounts());
        } else {
          statusMsg.textContent = 'No puedes tener menos de 0 oz.';
        }
      };

      const updateStatusMsg = (liquorName, statusMsg) => {
        var totalOzSelected = sumOzCounts();
        var ozCount = ozCounts[liquorName];
        if (ozCount < totalOz) {
          statusMsg.textContent = 'Ya elegiste ' + ozCount + ' oz. Te faltan ' + (totalOz - totalOzSelected) + ' oz.';
        } else {
          statusMsg.textContent = 'Ya has alcanzado el límite de 6 oz para ' + liquorName + '.';
        }
      };

      const sumOzCounts = () => {
        var sum = 0;
        Object.values(ozCounts).forEach(function (count) {
          sum += count;
        });
        return sum;
      };

      const initializeSlides = () => {
        var slides = document.querySelectorAll('.swiper-slide');
        slides.forEach(function (slide) {
          var plusBtn = slide.querySelector('.plus-btn');
          var minusBtn = slide.querySelector('.minus-btn');
          var ozCounter = slide.querySelector('.oz-counter');
          var statusMsg = slide.querySelector('.status-msg');
          var liquorName = slide.querySelector('h3').textContent.trim();

          ozCounts[liquorName] = 0;

          plusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handlePlusClick(liquorName, ozCounter, statusMsg);
          });

          minusBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleMinusClick(liquorName, ozCounter, statusMsg);
          });
        });
      };

      initializeSlides();
    }
  }, [liquors]);

  const handleSiguienteClick = (e) => {
    e.preventDefault();
    navigate('/Refresco');
  };

  return (
    <div className="catalog-container">
      <h1>Personaliza a tú gusto</h1>
      <h2>Elige mínimo 6 onzas.</h2>
      <div className="swiper mySwiper">
        <div className="swiper-wrapper">
          {liquors.map((liquor) => (
            <div className="swiper-slide" key={liquor.id}>
              <div className="icons">
                <i className="fa-solid fa-circle-arrow-left"></i>
                <img src="src/img/logo2.png" alt="logo" />
              </div>
              <div className="product-content">
                <div className="product-txt">
                  <span>${liquor.precio}</span>
                  <h3>{liquor.nombre}</h3>
                </div>
                <div className="product-img">
                  <img src={liquor.image_url} alt={liquor.nombre} />
                </div>
              </div>
              <div className="control-panel">
                <a href="#" className="btn-1 minus-btn">-</a>
                <span className="oz-counter">0 oz</span>
                <a href="#" className="btn-1 plus-btn">+</a>
              </div>
              <p className="status-msg"></p>
            </div>
          ))}
        </div>
      </div>
      {totalSelectedOz === 6 && (
        <div className="btn-container">
          <a href="#" className="btn-1 siguiente-btn" onClick={handleSiguienteClick}>Siguiente</a>
        </div>
      )}
    </div>
  );
}

export default Alcohol;

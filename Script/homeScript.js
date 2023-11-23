
var sliderIndex = 0;
    var sliderImages = document.querySelectorAll('.slider img');
    var dotsContainer = document.querySelector('.dots');
    var dots = [];

    function showSlide(index) {
      sliderImages.forEach(function (image) {
        image.style.display = 'none';
      });

      sliderImages[index].style.display = 'block';
      setActiveDot(index);
    }

    function setActiveDot(index) {
      dots.forEach(function (dot) {
        dot.classList.remove('active');
      });

      dots[index].classList.add('active');
    }

    function createDots() {
      for (var i = 0; i < sliderImages.length; i++) {
        var dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
        dots.push(dot);
        dot.addEventListener('click', function () {
          var dotIndex = dots.indexOf(this);
          showSlide(dotIndex);
          sliderIndex = dotIndex;
        });
      }
    }

    function nextSlide() {
      sliderIndex++;
      if (sliderIndex >= sliderImages.length) {
        sliderIndex = 0;
      }
      showSlide(sliderIndex);
    }

    function startSlider() {
      createDots();
      showSlide(sliderIndex);
      setInterval(nextSlide, 4000); // Transition every 4 seconds (4000 milliseconds)
    }

    startSlider();

const words = ['Desing', 'Detection', 'Prevention', 'Investigation'];
const wordContainer = document.getElementById('word-container');

function showWord(index) {
  setTimeout(() => {
    wordContainer.innerHTML = words.slice(0, index + 1).join(' &#8226; ');

    if (index === words.length - 1) {
      setTimeout(() => {
        wordContainer.innerHTML = '';
        showWord(0);
      }, 1000);
    } else {
      showWord(index + 1);
    }
  }, 1000);
}

showWord(0);

showWord(0);

// nav bar links
function setActive(clickedElement) {
// Remove the "active" class from all nav-links
const navLinks = document.querySelectorAll('.main_nav');
navLinks.forEach(link => link.classList.remove('active'));

// Add the "active" class to the clicked nav-link
clickedElement.classList.add('active');
}

function showSection(sectionId) {
// Hide all sections
document.querySelectorAll('section').forEach(section => {
  section.classList.remove('active');
});

// Show the selected section
document.getElementById(sectionId).classList.add('active');
}

/*try and error
document.addEventListener('DOMContentLoaded', function () {
const learnMoreBtn = document.getElementById('learnMoreBtn');
const moreDetails = document.getElementById('moreDetails');

learnMoreBtn.addEventListener('click', function () {
  moreDetails.style.display = (moreDetails.style.display === 'none' ? 'block' : 'none');
});
});
**/

/* nav bar 
document.addEventListener('DOMContentLoaded', function() {
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Hide the navbar on smaller screens
    if (window.innerWidth <= 600) {
      const nav = document.querySelector('nav');
      nav.style.display = 'none';
    }
  });
});
});*/


/*sections next and previous code
let currentSection = 1;

function showPrevious() {
if (currentSection > 1) {
    currentSection--;
    showSection();
}
}

function showNext() {
const totalSections = 3; // Update this based on the total number of sections
if (currentSection < totalSections) {
    currentSection++;
    showSection();
}
}

function showSection() {
// Hide all sections
for (let i = 1; i <= 3; i++) {
    const section = document.getElementById(`section${i}`);
    section.style.display = 'none';
}

// Show the current section
const currentSectionElement = document.getElementById(`section${currentSection}`);
currentSectionElement.style.display = 'flex';
}

// Show the initial section
showSection();*/

//contact js code below
const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}


// about code wrapper1
const wrapper = document.querySelector(".wrapper1");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper1 i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
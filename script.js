let options = {
  headers: {
    Authorization:
      "Bearer 563492ad6f917000010000014edd52e92b5b4def84ace90641578d2d",
  },
};

let cardImages = [];

function renderForestImages(images) {
  let container = document.querySelector(".carousel-inner");
  for (let i = 0; i < images.length; i++) {
    let image = images[i];
    if (i === 0) {
      container.innerHTML += ` <div class="carousel-item active">
        <img src="${image.src.landscape}" class="d-block w-100" alt="...">
    </div>`;
    } else {
      container.innerHTML += ` <div class="carousel-item">
        <img src="${image.src.landscape}" class="d-block w-100" alt="...">
    </div>`;
    }
  }
}

function loadCarousel() {
  fetch("https://api.pexels.com/v1/search?query=forest", options)
    .then((responseForest) => responseForest.json())
    .then((responseForestJson) => renderForestImages(responseForestJson.photos))
    .catch((err) => console.error(err));
}

function renderImages(images) {
  cardImages = [];
  let imagesNodes = document.querySelectorAll(".card svg");
  let smallTexts = document.querySelectorAll("small");
  console.log(smallTexts);
  for (let i = 0; i < imagesNodes.length; i++) {
    let image = images[i];
    cardImages.push(image);
    let imageNode = imagesNodes[i];
    console.log(image.src.medium);
    imageNode.innerHTML = `<image id="${image.id}" href="${image.src.landscape} width="100%" height="225"> </image>`;
    smallTexts[i].innerText = image.id;
  }
  let toastBody = document.querySelector(".toast-body");
  toastBody.innerText = `${imagesNodes.length} images has loaded`;
  $("#liveToast").toast("show");
}

function getImages(query) {
  fetch("https://api.pexels.com/v1/search?query=" + query, options)
    .then((response) => response.json())
    .then((responseJson) => renderImages(responseJson.photos))
    .catch((err) => console.error(err));
}

function loadSummerImages() {
  getImages("summer");
}
function loadWinterImages() {
  getImages("winter");
}

function hideImage(event) {
  console.log(event.target);
  let card = event.target.parentNode.parentNode.parentNode.parentNode;
  card.classList.add("d-none");
}

function searchImage() {
  let searchInput = document.getElementById("search-input").value;
  document.getElementsByClassName("container").innerHTML = "";
  getImages(searchInput);
}

function viewImage(event) {
  let card = event.target.closest(".card").querySelector("svg image").id;
  let modalImage = document.querySelector(".modal-body");
  modalImage.innerHTML = "";
  cardImages.forEach((cardImage) => {
    if (cardImage.id == card) {
      modalImage.innerHTML = `<img src="${cardImage.src.medium}" alt="">`;
    }
  });
}

window.onload = loadCarousel();

// Start Selecting Elements
const topImage = document.querySelector(".quick-view__img-top img");

const bottomImages = Array.from(
  document.querySelectorAll(".quick-view__img-bottom div img")
);

const quickViewBody = document.querySelector(".quick-view__body");

const pageContent = JSON.parse(localStorage.getItem("cardInformation"));

const activeImage = bottomImages[0];
const otherImage = bottomImages[1];

/***********************************************************************************/
/* Start Quick View Code */

// Loop through pageContent array that have and contain the data from local storage
pageContent.forEach(function (item,index,array) {
  activeImage.src = topImage.src = pageContent[index].activeImageSource;
  otherImage.src = pageContent[index].otherImageSource;
  quickViewBody.innerHTML = pageContent[index].cardBody;
})

// Change the active image at bottom and active border and change the image at top
bottomImages.forEach(function (img) {
  img.addEventListener("click", function (e) {
    let clickedImageSource = img.getAttribute("src");
    topImage.setAttribute("src", clickedImageSource);

    // Change The border of active image
    if (img === activeImage) {
      activeImage.classList.add("img-active");
      otherImage.classList.remove("img-active");
    } else if (img === otherImage) {
      otherImage.classList.add("img-active");
      activeImage.classList.remove("img-active");
    }
  });
});

/* End Quick View Code */
/***********************************************************************************/

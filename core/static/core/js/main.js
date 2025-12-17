window.onload = function () {
    // List of legendary football images
    const images = [
        "static/core/images/psg_lift_ucl.jpg",
        "static/core/images/man-utd-fa-cup.jpg",
        "static/core/images/dortmund-ultras.jpg",
        "static/core/images/neuer-save.jpeg",
        "static/core/images/omar-marmoush.jpg"
    ];

    let index = 0;

    function changeImage() {
        index++;
        if (index >= images.length) index = 0;
        document.getElementById("overlay").src = images[index];

    }

// Change image interval
// Every 3 seconds
    setInterval(changeImage, 3000)

}

console.log("In order to have the js code working i had to delete some css and change the class to id");

const bubble = document.getElementById("speech-bubble");
document.querySelectorAll(".hover-link").forEach(link => {
    link.addEventListener("mouseenter", e => {
        const text = link.getAttribute("data-bubble");
        console.log(text);
        bubble.textContent = text;
          // position bubble near link
    const rect = link.getBoundingClientRect();
    bubble.style.left = rect.left + "px";
    bubble.style.top = (rect.top - 50) + "px";

    // show bubble with pop animation
    bubble.style.display = "block";
    requestAnimationFrame(() => {
      bubble.style.opacity = "1";
      bubble.style.transform = "scale(1)";
    });
  });

  link.addEventListener("mouseleave", () => {
    // hide bubble with pop-out effect
    bubble.style.opacity = "0";
    bubble.style.transform = "scale(0.8)";
    setTimeout(() => (bubble.style.display = "none"), 150);
  });
});



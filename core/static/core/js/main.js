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



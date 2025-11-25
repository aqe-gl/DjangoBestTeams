window.onload = function () {
    // List of legendary football images
    const images = [
        "static/core/images/psg_lift_ucl.jpg",
        "static/core/images/miracle_at_istanbul.jpg",
        "static/core/images/manutd_w_at_anfield.jpg",
        "static/core/images/flick_trophies.jpg",
        "static/core/images/ronaldo-bk.jpg"
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



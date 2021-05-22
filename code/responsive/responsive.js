


const d = document,
 $videoStart = d.querySelector(".video-start"),
 $videoContainer = d.querySelector(".container-video"),
 $close = d.querySelector(".close");

 $videoStart.addEventListener("click", (e) => {
     $videoContainer.classList.add("show");
 })

 $close.addEventListener("click", () => {
     $videoContainer.classList.remove("show");
 })
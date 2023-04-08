const welcome = document.querySelector(".welcome")
const callToAction = document.querySelector(".call")
const boxes = document.querySelectorAll(".box")

welcome.addEventListener(
  "click",
  () => (welcome.textContent = "Have a Good Time!")
)
callToAction.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.style.display = "block" //注意須加引號
  })
})

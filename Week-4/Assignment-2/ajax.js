function ajax(src, callback) {
  // your code here
  fetch(src)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(error => console.error(error))
}
function render(data) {
  // your code here
  // document.createElement() and appendChild() methods are preferred.
  const container = document.createElement('div')
  data.forEach(product => {
    const card = document.createElement('div')
    card.classList.add('card')
    const name = document.createElement('h3')
    name.textContent = product.name
    const price = document.createElement('p')
    price.textContent = `Price: ${product.price}`
    const description = document.createElement('p')
    description.textContent = product.description
    card.appendChild(name)
    card.appendChild(price)
    card.appendChild(description)
    //或合成 card.append(name, price, description);
    container.appendChild(card)
  })
  document.body.appendChild(container)
}
ajax(
  'https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products',
  function (response) {
    render(response)
  }
) // you should get product information in JSON format and render data in the page

// [
//   {
//     "name": "Pixel 3",
//     "price": 27700,
//     "description": "最新的 Google 手機。"
//   },
//   {
//     "name": "Chromecast",
//     "price": 1500,
//     "description": "在大螢幕上播放喜歡的影片。"
//   },
//   {
//     "name": "Pixel Book",
//     "price": 12000,
//     "description": "最新的 Chromebook 產品。"
//   }
// ]

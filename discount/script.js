const price = document.getElementById('price')
const discount = document.getElementById('discount')
const calculateButton = document.getElementById('calculate')

const resultBenefit= document.getElementById('result-benefit')
const resultPrice = document.getElementById('result-price')


function skeleton() {

  resultBenefit.classList.add("skeleton-appearance")
  resultPrice.classList.add("skeleton-appearance")
  document.querySelector(".price-skeleton").classList.add("result-skeleton")
  document.querySelector(".benefit-skeleton").classList.add("result-skeleton")
  

  setTimeout(() => {
    resultPrice.classList.remove("skeleton-appearance")
    resultPrice.classList.remove("skeleton-appearance")
    document.querySelector(".price-skeleton").classList.remove("result-skeleton")
    document.querySelector(".benefit-skeleton").classList.remove("result-skeleton")
  }, "1200");
}

// Calculation


price.addEventListener('change', calc)
discount.addEventListener('change', calc)
calculateButton.addEventListener('click', calc)

function calc() {
  let benefit = price.value / 100 * discount.value

  resultBenefit.innerText = `${benefit} ${countrySymbol}`
  resultPrice.innerText = `${price.value - benefit} ${countrySymbol}`

  skeleton()
}



setTimeout(() => {calc()}, "800")
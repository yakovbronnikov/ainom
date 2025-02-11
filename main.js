let countrySelect = document.getElementById('country')

let countryList = {
  AT: '€',
  AZ: '₼',
  BE: '€',
  CN: '¥',
  CY: '€',
  DE: '€',
  EE: '€',
  ES: '€',
  EU: '€',
  FI: '€',
  FR: '€',
  GE: '₾',
  GR: '€',
  HR: '€',
  IE: '€',
  IN: '₹',
  IT: '€',
  JP: '¥',
  KR: '₩',
  KZ: '₸',
  LT: '€',
  LV: '€',
  LU: '€',
  MT: '€',
  NG: '₦',
  NL: '€',
  PT: '€',
  RU: '₽',
  SK: '€',
  SI: '€',
  TH: '฿',
  TM: '₼',
  TR: '₺',
  UK: '£',
  US: '$',
}

let countrySymbol = countryList.US

function cnangeCountry() {
  localStorage.setItem('country', JSON.stringify(countrySelect.value))
  countrySymbol = countryList[countrySelect.value]
}

async function getUserCountry() {
  try {
    const response = await fetch('https://ipinfo.io/json?token=556db3634e33b8');
    const data = await response.json();

    console.log(data.country)

    if (data.country in countryList && countryList[data.country] !== '€') {
      countrySelect.value = data.country
      countrySymbol = countryList[data.country]
    } else if (data.country in countryList && countryList[data.country] == '€') {
      countrySelect.value = 'EU'
      countrySymbol = countryList[data.country]
    } else {
      countrySelect.value = 'US'
      countrySymbol = countryList['US']
    }

  } catch (error) {
    console.error('Не удалось определить страну пользователя:', error);
  }
}

if(localStorage.getItem('country')) {
  let storageCountry = JSON.parse(localStorage.getItem('country'))
  countrySelect.value = storageCountry
  countrySymbol = countryList[storageCountry]
} else {
  getUserCountry()
}


// SW

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => navigator.serviceWorker.ready.then((worker) => {
      worker.sync.register('syncdata');
    }))
    .catch((err) => console.log(err));
}


let selectRegion = '';
let allCountries = null;

function myFunction(e) {
  if (document.querySelector('#option li.active') !== null) {
    document.querySelector('#option li.active').classList.remove('active');
  }
  e.target.className = 'active';
}

function init() {
  fetchCountries();
}

function fetchCountries() {
  let countriesPromise = fetch('https://restcountries.com/v2/all');

  countriesPromise.then((resp) => {
    resp.json().then((countries) => {
      orderCountries(countries);
      allCountries = countries;
    });
  });
}

function setRegion(region) {
  selectRegion = region;
  console.log(selectRegion);

  return filterByRegion(allCountries, selectRegion);
}

function orderCountries(countries) {
  countries.sort(function (a, b) {
    if (a.name.common > b.name.common) {
      return 1;
    }

    if (a.name.common < b.name.common) {
      return -1;
    }

    return 0;
  });

  renderCountryCard(countries);
}

function filterByRegion(countries, region = '') {
  if (region === '') {
    renderCountryCard(countries);
    return;
  }

  let filtered_countries = countries.filter(
    (country) => country.region == region
  );
  console.log(filtered_countries);
  renderCountryCard(filtered_countries);
}

function renderCountryCard(orderedCountries) {
  console.log(orderedCountries);

  const listCountries = orderedCountries.map((country) => {
    return `
    <div class="card__content">
    <div class="card__content--front ${country.region}"><img src="${country.flags.png}" /></div>
    
    <div class="card__content--back ${country.region}">
        <h3>${country.name}</h3>
        <p>Nome nativo: ${country.nativeName}</p>
        <p>Capital: ${country.capital}</p>
        <p>Região: ${country.region}</p>
        <p>Sub-região: ${country.subregion}</p>
    </div>
    </div>`;
  });

  const ul = document.querySelector('[data-js="show"]');

  ul.innerHTML = listCountries.join('');
}

init();

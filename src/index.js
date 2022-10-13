import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryName = document.querySelector('#search-box');
console.log(countryName);
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountries().then(console.log(fetchCountries));

countryName.addEventListener('input', debounce(inputCountries, DEBOUNCE_DELAY));

function inputCountries(evt) {
  //evt.preventDefault()
  const country = evt.target.value.trim();
  if (!country) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
}

fetchCountries(name)
  .then(countries => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (countries.length === 1) {
      countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
      countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
    } else if (countries.length >= 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else {
      countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
    }
  })
  .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));

function renderCountryList(countries) {
  return countries
    .map(
      ({ name, flags }) => `<li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>`
    )
    .join('');
}
console.log(renderCountryList());

function renderCountryInfo(countries) {
  return countries
    .map(
      ({ capital, population, languages }) => `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(
              languages
            ).join(', ')}</p></li>
        </ul>
        `
    )
    .join('');
}

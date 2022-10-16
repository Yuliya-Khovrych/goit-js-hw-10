import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

//---------------HBS------------------
import markupCountryList from './templates/markupCountryList.hbs';
import markupCountryInfo from './templates/markupCountryInfo.hbs';

const DEBOUNCE_DELAY = 300;

const countryName = document.querySelector('#search-box');
//console.log(countryName);
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryName.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));
function onInputCountry(evt) {
  evt.preventDefault();
  const name = countryName.value.trim();
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }

  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      if (countries.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length === 1) {
        countryList.insertAdjacentHTML(
          'beforeend',
          markupCountryList(countries)
        );

        countryInfo.insertAdjacentHTML(
          'beforeend',
          markupCountryInfo(countries)
        );
      } else {
        countryInfo.innerHTML = '';
        countryList.insertAdjacentHTML(
          'beforeend',
          markupCountryList(countries)
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}



//----Function-----------

// const DEBOUNCE_DELAY = 300;

// const countryName = document.querySelector('#search-box');
// //console.log(countryName);
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// countryName.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

// function onInputCountry(evt) {
//   evt.preventDefault();
//   const name = countryName.value.trim();
//   if (name === '') {
//     return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
//   }

//   fetchCountries(name)
//     .then(countries => {
//       countryList.innerHTML = '';
//       countryInfo.innerHTML = '';
//       if (countries.length >= 10) {
//         Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//         return;
//       }
//       if (countries.length === 1) {
//         countryList.insertAdjacentHTML(
//           'beforeend',
//           renderCountryList(countries)
//         );
//         countryInfo.insertAdjacentHTML(
//           'beforeend',
//           renderCountryInfo(countries)
//         );
//       } else {
//         countryInfo.innerHTML = '';
//         countryList.insertAdjacentHTML(
//           'beforeend',
//           renderCountryList(countries)
//         );
//       }
//     })
//     .catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       countryList.innerHTML = '';
//       countryInfo.innerHTML = '';
//     });
// }

// function renderCountryList(countries) {
//   const markup = countries
//     .map(({ name, flags }) => {
//       return `
//           <li class="country-list__item">
//               <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = auto>
//               <h2>${name.official}</h2>
//           </li>
//           `;
//     })
//     .join('');
//   return markup;
// }

// function renderCountryInfo(countries) {
//   const markup = countries
//     .map(({ capital, population, languages }) => {
//       return `
//         <ul class="country-info__list">
//             <li><p><b>Capital: </b>${capital}</p></li>
//             <li><p><b>Population: </b>${population}</p></li>
//             <li><p><b>Languages: </b>${Object.values(languages).join(
//               ', '
//             )}</p></li>
//         </ul>
//         `;
//     })
//     .join('');
//   return markup;
// }

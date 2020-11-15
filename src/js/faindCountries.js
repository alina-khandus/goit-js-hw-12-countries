import '../css/styles.scss';
import debounce from 'lodash.debounce';
import countryCard from '../templates/countries_card.hbs';
import countryList from '../templates/countries_list.hbs';
import API from './fetchCountries';
import getRefs from './getRefs';


import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';


const refs = getRefs();
refs.input.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
    e.preventDefault();
    const form = e.target;
    const inputValue = refs.input.value;

    API.fetchCountryByName(inputValue)
        .then(renderCountryCard)
        .finally(() => form.reset);
}

function renderCountryCard(countries) {
  if (countries.length >= 10) {
    error({
      text: 'Too many mathces found. Please enter a more specific query!',
      type: 'info',
    });
  } else if
        (countries.length < 10 && countries.length > 1) {
            refs.card.innerHTML = countryList(countries);
    } else if
        (countries.length === 1) {
            refs.card.innerHTML = countryCard(countries[0]);
    }   
}

export default { onSearch };
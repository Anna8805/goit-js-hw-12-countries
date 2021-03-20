import './css/styles.css';
import APIfetchCountries from './js/fetchCountries';
import getRefs from './js/get-refs';
import oneCardCountryTemplate from './templates/templateOneCountry.hbs';
import countryListTemplate from './templates/countriesTemplate.hbs';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');

const refs = getRefs();

refs.fetchCountries.addEventListener('input', debounce(onSearch, 500));

function onSearch({ target: { value } }) {
    APIfetchCountries(value)
        .then(data => {
            refs.cardContainer.innerHTML = '';
            if (data.length > 10) {
                error({
                    text: 'Слишком много совпадений! Уточните запрос!',
                    delay: 1500,
                });
            } else if (2 <= data.length && data.length <= 10) {
                refs.cardContainer.insertAdjacentHTML('beforeend', countryListTemplate(data));
            } else if (data.length === 1) {
                refs.cardContainer.insertAdjacentHTML('beforeend', oneCardCountryTemplate(data));
            }
        })
        .catch(errorMsg);
}

function errorMsg(){
    error({
        text: "Страна не найдена!",
        delay: 1500,
    });
}
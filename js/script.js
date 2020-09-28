const elemCountires = document.querySelector('.countries');
const searchBar = document.querySelector('.search-bar')
const searchInput = document.querySelector('.search-bar__input');
const filter = document.querySelector('.filter');
const filterBtn = document.querySelector('.filter__btn');
const filterList = document.querySelector('.filter__list');
const filterRegions = filterList.querySelectorAll('li');
const darkmodeBtn = document.querySelector('.header__btn-darkmode');



getcountries();

async function getcountries() {
    let url = 'https://restcountries.eu/rest/v2/all';
    try {
        const res = await fetch(url);
        const countries = await res.json();
        listCountries(countries);
        console.log(countries);
    } catch (error) {
        console.log(error);
    }
    const filterRegions = filterBtn.querySelectorAll('li');
    console.log(filterRegions);
}


function listCountries(countries) {
    elemCountires.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country');
        countryCard.innerHTML = `<div class="country__flag">
        <img class="country__flag-img" src="${country.flag}" alt="flag">
        </div>
        <div class="country__info">
        <h3 class="country__name">${country.name}</h3>
        <p class="country__population">Population: <span>${country.population}</span></p>
        <p class="country__region">Region: <span>${country.region}</span></p>
        <p class="country__capital">Capital: <span>${country.capital}</span></p>
        </div>`;

        elemCountires.appendChild(countryCard);

        countryCard.addEventListener('click', () => {
            moreInformation(country);
        })



    });

    function moreInformation(country) {
        elemCountires.style.display = "none";
        searchBar.style.display = "none";
        filter.style.display = "none";
        document.querySelector('.more-information').innerHTML = `<button class="more-information__btn-back"><span
        class="fas fa-arrow-left more-information__btn-back-icon"></span>Back</button>`;
        const countryCard = document.createElement('div');
        countryCard.classList.add('more-information__country');
        countryCard.innerHTML = `
        <div class="more-information__flag animate__animated animate__fadeIn">
        <img class="more-information__flag-img" src="${country.flag}" alt="flag">
        </div>
        <div class="more-information__text-container">
        <h3 class="more-information__name">${country.name}</h3>
        <div class="more-information__basic">
        <p class="more-information__native-name">Native Name: <span>${country.nativeName}</span></p>
        <p class="more-information__population">Population: <span>${country.population}</span></p>
        <p class="more-information__region">Region: <span>${country.region}</span></p>
        <p class="more-information__sub-region">Sub Region: <span>${country.subregion}</span></p>
        <p class="more-information__capital">Capital: <span>${country.capital}</span></p>
        </div>
        <div class="more-information__detailed">
        <p class="more-information__top-level-domain">Top Level Domain: <span>${country.topLevelDomain}</span></p>
        <p class="more-information__curriences">Currencies: <span>${country.currencies[0].name}</span></p>
        <p class="more-information__languages">Languages: <span class="more-information__languages">
        ${country.languages.map(language => language.name)}</span></p>
        </div>
        <h3 class="more-information__border-title">Border Countries: </h3>
        <div class="more-information__borders">
        </div>
        </div>`
        document.querySelector('.more-information').appendChild(countryCard);


        country.borders.forEach(border => {
            let span = document.createElement('span');
            span.className = "more-information__border";
            console.log(border.length);
            span.textContent = `${border}`;
            document.querySelector('.more-information__borders').appendChild(span);
        });



        document.querySelector('.more-information__btn-back').addEventListener('click', () => {
            elemCountires.style.display = "grid";
            searchBar.style.display = "flex";
            filter.style.display = "flex";
            document.querySelector('.more-information').innerHTML = "";
        });

    }

};

filterBtn.addEventListener('click', () => {
    document.querySelector('.filter__list').classList.toggle('filter__list--active');
})


searchInput.addEventListener('input', (e) => {

    document.querySelector('.more-information').innerHTML = "";

    let searchValue = e.target.value;
    let countryName = document.querySelectorAll('.country__name');
    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
            name.parentElement.parentElement.style.display = "block";
        } else {
            name.parentElement.parentElement.style.display = "none";
        }
    });
});

darkmodeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
})

filterRegions.forEach(filter => {
    filter.addEventListener('click', () => {
        let valueFilter = filter.innerText;
        let regionsCountries = document.querySelectorAll('.country__region > span');
        regionsCountries.forEach(regionCountry => {
            if (regionCountry.innerText.includes(valueFilter) || valueFilter.includes("All")) {
                regionCountry.parentElement.parentElement.parentElement.style.display = "block";
            } else {
                regionCountry.parentElement.parentElement.parentElement.style.display = "none";
            }
            document.querySelector('.filter__list').classList.remove('filter__list--active');
        })
    });
});
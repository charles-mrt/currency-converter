import { RenderSelectCurrencies } from "./components/RenderSelectCurrencies.js";


const selectedCurrencyFrom = document.querySelector("select.currencyFrom");
const selectedCurrencyTo = document.querySelector("select.currencyTo");

const getInputValueFrom = document.querySelector("input.currencyFrom");
const getInputValueTo = document.querySelector("input.currencyTo");

const firstCurrencySimbolFiled = document.querySelector(".firstCurrency .currencySimbol");
const secondCurrencySimbolFiled = document.querySelector(".secondCurrency .currencySimbol");

const simbolsOfCurrency = {
    "$": "USD",
    "R$": "BRL",
    "€": "EUR",
    "$": "ARS",
};

RenderSelectCurrencies(selectedCurrencyFrom, selectedCurrencyTo);


/**
 * 
 * @param {string} url 
 * @returns 
 */
async function getUrlFromApi(url) {
    return (await fetch(url)).json();
}

/**
 * handle with currency conversion
 * @param {string} getSelectedCurrency 
 * - wait currency value ex: USD
 */
async function calculateCurrency(getSelectedCurrency) {

    getSelectedCurrency = selectedCurrencyFrom.value;

    const { rates } = await getUrlFromApi(`https://open.er-api.com/v6/latest/${getSelectedCurrency}`);

    let rate = rates[selectedCurrencyTo.value]
    getInputValueTo.value = (getInputValueFrom.value * rate).toFixed(2);
}

/**
 * trigger to convert the currency
 */
getInputValueFrom.addEventListener("change", () => {
    calculateCurrency();
});


/**
 * filter object values
 * @param {object} obj 
 * @param {string} value 
 * @returns 
 */
const getCurrencySimbol = (obj, value) => {
    return Object.keys(obj).filter(function (key) {
        return obj[key] == value;
    });
}


/**
 * add correct currency symbol
 * @param {string} currencySimbolField
 * @param {string} currencySelected 
 */
const setCurrencySimbol = (currencySimbolField, currencySelected) => {
    const simbol = getCurrencySimbol(simbolsOfCurrency, currencySelected.value);
    currencySimbolField.textContent = simbol.length === 0 ? "$" : simbol;
}

selectedCurrencyFrom.addEventListener("change", () => {
    setCurrencySimbol(firstCurrencySimbolFiled, selectedCurrencyFrom);
});

selectedCurrencyTo.addEventListener("change", () => {
    setCurrencySimbol(secondCurrencySimbolFiled, selectedCurrencyTo);
});


/**
 * swap currency to be converted
 * @param {number} storeTemporaryValue 
 */
const swapTheCurrency = (storeTemporaryValue) => {
    setCurrencySimbol(firstCurrencySimbolFiled, selectedCurrencyTo);
    setCurrencySimbol(secondCurrencySimbolFiled, selectedCurrencyFrom);

    storeTemporaryValue = selectedCurrencyFrom.value;
    selectedCurrencyFrom.value = selectedCurrencyTo.value;
    selectedCurrencyTo.value = storeTemporaryValue;

    calculateCurrency();
}

/**
 * handles with swap button
 * @param {boolean} swap 
 */
const handleWithSwapCurrencyButton = (swap) => {
    const swapCurrencyButton = document.querySelector(".swapCurrency");

    swapCurrencyButton.addEventListener("click", () => {
        if (!getInputValueFrom.value) {
            return alert("adicione um valor para converter!");
        }
        if (!swap) {
            swap = true;
            swapCurrencyButton.style.transition = "1s"
            swapCurrencyButton.style.transform = "rotateY(180deg)";
            swapTheCurrency();
        } else {
            swap = false;
            swapCurrencyButton.style.transition = "1s"
            swapCurrencyButton.style.transform = "rotateY(10deg)";
            swapTheCurrency();
        }
    });
}

handleWithSwapCurrencyButton();

const currencyFrom = document.querySelectorAll(".currencyFrom");
const currencyTo = document.querySelectorAll(".currencyTo");

const currencyFieldFrom = document.querySelector(".firstCurrency");
const currencyFieldTo = document.querySelector(".secondCurrency");

/**
 * handle with highlited currency field
 * @param {boolean} isActived 
 */
const setBorderColor = (isActived, currencyField) => {
    if (isActived) {
        isActived = true;
        currencyField.style.borderColor = "var(--highlight)";
    } else {
        isActived = false;
        currencyField.style.borderColor = "var(--medium-gray)";
    }
}

currencyFieldFrom.addEventListener("click", () => {

});
currencyFrom.forEach(el => {
    el.addEventListener("focus", () => {
        setBorderColor(true, currencyFieldFrom);
    });
    el.addEventListener("blur", () => {
        setBorderColor(false, currencyFieldFrom);
    });
});

currencyTo.forEach(el => {
    el.addEventListener("focus", () => {
        setBorderColor(true, currencyFieldTo);
    });
    el.addEventListener("blur", () => {
        setBorderColor(false, currencyFieldTo);
    });
});



/**
 * handle with dark and light theme
 * @param {boolean} isActived 
 */
const handleWithThemeColor = (isActived) => {
    const themeColorButton = document.querySelector(".swapThemeColor");
    const icon = themeColorButton.firstChild;

    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.setAttribute("data-theme", "light");
        themeColorButton.addEventListener("click", () => {
            if (!isActived) {
                isActived = true;
                icon.setAttribute("class", "ph-moon-stars");
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                isActived = false;
                icon.setAttribute("class", "ph-sun-dim");
                document.documentElement.setAttribute("data-theme", "light");

            }
        });
    });
}
handleWithThemeColor();







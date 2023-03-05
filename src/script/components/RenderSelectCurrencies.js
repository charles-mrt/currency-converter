import { currencies } from "../../currencyData.js";
/**
 * build select component by currencies values
 * @param {string} from 
 * @param {string} to 
 */
export const RenderSelectCurrencies = (from, to) => {

    for (let currency of Object.getOwnPropertyNames(currencies)) {
        from.innerHTML += `
            <option value="${currency}">
                ${currency}
            </option>`;

        to.innerHTML += `
            <option value="${currency}">
                ${currency}
            </option>`;
    }
}


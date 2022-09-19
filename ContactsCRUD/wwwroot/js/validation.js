const nameEl = document.querySelector('#name');
const phoneEl = document.querySelector('#mPhone');
const positionEl = document.querySelector('#jTitle');
const bdateEl = document.querySelector('#BDay');

const form = document.querySelector('#validateForm');

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isPhoneCorrect = (phone) => { 
    const ph = new RegExp(/^((8029|\+375)[\-]?)?(\(?\d{3}\)?[\-]?)?[\d\-]{7,10}$/im);
    return ph.test(phone);
};

const showError = (input, message) => {

    const formField = input.parentElement;

    input.classList.remove('success');
    input.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {

    const formField = input.parentElement;

    input.classList.remove('error');
    input.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkName = () => {

    let valid = false;
    const min = 3,
        max = 20;
    const name = nameEl.value.trim();

    if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Username must be between ${min} and ${max} characters.`)
    }
    else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}

const checkPhone = () => {

    let valid = false;

    const phone = phoneEl.value.trim();

    if (!isPhoneCorrect(phone)) {
        showError(phoneEl, "Incorrect phone number!")
    }
    else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
}

const checkPosition = () => {

    let valid = false;
    const min = 3,
        max = 18;
    const position = positionEl.value.trim();

    if (!isBetween(position.length, min, max)) {
        showError(positionEl, `Position must be between ${min} and ${max} characters.`)
    }
    else {
        showSuccess(positionEl);
        valid = true;
    }
    return valid;
}

const checkDate = () => {

    let valid = false;

    const date = bdateEl.value.trim();

    if (date === "") {
        showError(bdateEl, "Pick a birth date")
    }
    else {
        showSuccess(bdateEl);
        valid = true;
    }

    return valid;
}

function validateForm() {

    if (checkName() === true &&
        checkPhone() === true &&
        checkPosition() === true &&
        checkDate() === true) {
        return true;
    }

    return false;
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'mPhone':
            checkPhone();
            break;
        case 'jTitle':
            checkPosition();
            break;
        case 'BDay':
            checkDate();
            break;
    }
}));
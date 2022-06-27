const form = document.body.querySelector('form');

// form.addEventListener('submit', formValidation);

function formValidation(event) {
    event.preventDefault();
    const [input] = form.elements;
    const validityState = input['validity'];
    const validationMessage = input['validationMessage'];
    console.log(validityState);
    console.log(validationMessage);
}
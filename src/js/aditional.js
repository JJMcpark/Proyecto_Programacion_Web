const inputQuantity = document.querySelector('.input-quantity')
const btnIncrement = document.querySelector('#increment')
const btnDecrement = document.querySelector('#decrement')

let valueByDefault = parseInt(inputQuantity.value)

btnIncrement.addEventListener('click', () => {

    valueByDefault += 1
    inputQuantity.value = valueByDefault

})

btnDecrement.addEventListener('click', () => {

    if (valueByDefault === 1){
        return
    }
    valueByDefault -= 1
    inputQuantity.value = valueByDefault
    
})



//tagle
document.addEventListener('DOMContentLoaded', () => {
    const buttonDescription = document.querySelector('.title-description');
    const buttonAdditionalInformation = document.querySelector('.title-additional-information');

    const contentDescription = document.querySelector('.text-description');
    const contentAdditionalInformation = document.querySelector('.text-additional-information');

    if (buttonDescription && contentDescription) {
        buttonDescription.addEventListener('click', () => {
            contentDescription.classList.toggle('hidden');
        });
    }

    if (buttonAdditionalInformation && contentAdditionalInformation) {
        buttonAdditionalInformation.addEventListener('click', () => {
            contentAdditionalInformation.classList.toggle('hidden');
        });
    }
});


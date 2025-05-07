const keys = document.querySelector('#keys');
const display = document.querySelector('#display');
const clearBtn = document.querySelector('#clear-btn');
display.value = "0";

function safeEval(expression) {
    try {
        const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
        return new Function('return ' + sanitizedExpression)();
    } catch (error) {
        return "Syntax Error";
    }
}

keys.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        buttonText = event.target.textContent;
        if(display.value === '0'){
            display.value = '';
        }
        display.value += buttonText;
            switch(buttonText){
            case "C":
                display.value = '0';
                return;
            case "=":
                display.value = safeEval(display.value);
        }
    }
})






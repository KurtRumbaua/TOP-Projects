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
        const buttonText = event.target.textContent;

        if(buttonText === "C"){
            display.value = '0';
            return;
        }

        if(buttonText === "="){
            try {
                display.value = safeEval(display.value);
            } catch {
                display.value = "0"
            }
            return;
        }

        if(display.value === '0' ){
            display.value = '';
        }

        if(['+', '-', '*', '/'].includes(buttonText)){
            const lastChar = display.value.slice(-1);
            
            if (buttonText === '-' && ['+', '*', '/'].includes(lastChar)) {
                display.value += buttonText;
                return;
            }
            
            if(['+', '-', '*', '/'].includes(lastChar)){
                display.value = display.value.slice(0, -1) + buttonText;
                return;
            }
        }
        
        display.value += buttonText;
    }
})






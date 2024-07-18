
const calcButtons = document.querySelectorAll(".calc-button");
const result = document.getElementById("result");
let prevNum = null;
let currentNum = "0";
let prevCommand = null;

calcButtons.forEach((button) => button.addEventListener('click', () => {
    const value = button.innerHTML;
    result.innerHTML = controller(value);
}));

function controller(value) {
    console.log(value);
    if(!isNaN(value)) return printScreen(value);
    if(value == "C") return resetScreen();
    if(value == "←") return deleteScreen();
    if(value == "÷" || value == "×" || value == "−" || value == "+") return setOperator(value);
    if(value == "=") return calculate(prevCommand, true);
}

function printScreen(value) {
    if(currentNum == "0") {
        currentNum = value;
    } else {
        currentNum += value;
    }
    return currentNum;
}

function resetScreen() {
    currentNum = "0";
    prevNum = null;
    prevCommand = null;
    return currentNum;
}

function deleteScreen() {
    if(currentNum.length == 1) {
        currentNum = "0";
    } else {
        currentNum = currentNum.slice(0, -1);
    }
    return currentNum;
}

function setOperator(value) {
    if (prevNum === null) {
        prevNum = parseFloat(currentNum);
    } else {
        prevNum = calculate(prevCommand);
    }
    prevCommand = value;
    currentNum = "0";
    return prevNum;
}

function calculate(operator, isFinal = false) {
    let resultNum;
    const num = parseFloat(currentNum);

    if(operator == "+") {
        resultNum = parseFloat(prevNum) + num;
    } else if(operator == "−") {
        resultNum = prevNum - num;
    } else if(operator == "×") {
        resultNum = prevNum * num;
    } else if(operator == "÷") {
        resultNum = num != 0 ? prevNum / num : "Error";
    } else {
        return currentNum;
    }

    if(isFinal) prevCommand = null;
    
    prevNum = resultNum;
    currentNum = resultNum.toString();
    return resultNum;
}
// variable for the display element
let displayElem = document.getElementById('calc-display');
// boolean for resetting display after the operation has been selected
let totaled = false;
let isSymbol = false;


//function to clear the display
function clearAll(){
    displayElem.value = "";
}

// function to take input from form and add it to the display and reset it if equals has been selected
function num(val){
    isSymbol = /\+|\-|\*|\//.test(val);
    if(totaled && !isSymbol){
        clearAll();
    }
    totaled = false;
    displayElem.value = displayElem.value + val;
    if(!isSymbol){
        flash(val); 
    }
    document.getElementById(val).blur();  
}


// function to solve equation in the display
function solve(){
    displayElem.value = calculate(displayElem.value);
    totaled = true;
}


//resets the key to the default button of bootsrap
function resetKey(theKey){
    document.getElementById(theKey).classList.add('btn-default');
    document.getElementById(theKey).classList.remove('btn-primary');
}


//makes the button typed flash to denote it has been pressed
function flash(theKey){
    document.getElementById(theKey).classList.remove('btn-default');
    document.getElementById(theKey).classList.add('btn-primary');
    setTimeout(function (){resetKey(theKey)}, 100);
}

//calculates the equation in the display
function calculate(fn){
    return new Function('return ' + fn)();
}


//function to handle key input
function handleKeys(e){
    //if the key pressed is a number or period it is sent to the num function, if the key is a space then it is ignored
    if(e.key != ' '){
        if(e.key >= 0 && e.key <= 9){
            num(e.key);
        }else if(e.key === '.'){
            num(e.key);
        }else if(/\+|\-|\*|\//.test(e.key)){  //if the key pressed is a math symbol then it is sent to the num function
            num(e.key);
        }
        // handled the equals/enter key and the c/ac key
        switch(e.key){
            case "Enter":
               solve(); 
               break;
            case "c":
                clearAll();
                break;
            default:
                break;
        }
    }
    
}

//event listener for entire page to check for key presses
document.addEventListener('keydown', handleKeys)
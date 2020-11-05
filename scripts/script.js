// variable for the display element
let displayElem = document.getElementById('calc-display');
let nums = [0,0];
// variable for keeping track of the current operation so it can send the last number inputed to the proper array after hitting equals
let currentOp = '';
// boolean for resetting display after the operation has been selected
let resetDisplay = false;

let numCount = 0;


// function to clear the arrays in the problem class
function clearProblem(){
    nums = [0,0];
    numCount = 0;
    currentOp = '';
}

function clearAll(){
    clearProblem();
    displayElem.value = "";
}

// function to take input from form and add it to the display and reset it if an operation has been selected
function num(val){
    if(resetDisplay){
        displayElem.value = "";
        resetDisplay = false;
    }
    if(val == "."){
        if(displayElem.value.includes(".")){
            val = '';
        }
    }
    displayElem.value = displayElem.value + val;    
}


// function to add to numbers to the appropriate array in the problem class
function oper(op){
    nums[numCount] = displayElem.value;
    numCount = (numCount == 1) ? 0 : 1;
    resetDisplay = true;
    currentOp = op;
}

function solve(fromEquals){
    if(fromEquals){
        oper(currentOp);
    }
      // send this to the appropriate object array
    console.log(nums)
    switch(currentOp){
        case "addition":
            displayElem.value = parseFloat(nums[0]) + parseFloat(nums[1]);
            break;   
        case "subtraction":
            displayElem.value = parseFloat(nums[0]) - parseFloat(nums[1]);
            break;
        case "multiplication":
            displayElem.value = parseFloat(nums[0]) * parseFloat(nums[1]);
            break;
        case "division":
            displayElem.value = parseFloat(nums[0]) / parseFloat(nums[1]);
            break;
        default:
            break;

    }
    clearProblem();  
    
}
function handleKeys(e){
    if(e.key >= 0 && e.key <= 9){
        num(e.key);
    }else if(e.key === '.'){
        num(e.key);
    }
    switch(e.key){
        case "+":
            oper("addition");
            break; 
        case "-":
            oper("subtraction");
            break; 
        case "*":
            oper("multiplication");
            break;
        case "/":
            oper("division");
            break; 
        case "Enter":
           solve(true); 
           break;
        default:
            break;
    }
    console.log(e.key)
    
}
document.addEventListener('keydown', handleKeys)
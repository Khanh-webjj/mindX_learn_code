function retangleArea (length, width) {
    let area = length * width;
    let perimeter = (length + width) *2;
    console.log("area:", area)
    console.log("perimeter", perimeter)
}

var timeFormConvert = (S)=>{
    let seconds = S % 60;
    let minutes = (S%3600 - seconds) / 60;
    let hours = (S - seconds - minutes*60)/3600;
    
    console.log("TIME RESULT", (`${hours}h${minutes}m${seconds}s`))
}

function exponential(base, exponent){
    let power = Math.pow(base,exponent)
    
    console.log("POWER RESULT:", power)
}

function avarageOfThreeNumb(a,b,c){
    let temp = (a+b+c) /3;
    
    console.log("average: ",temp);
}   

function distanceOfTwoPoinds(xa,ya,xb,yb) {
    let temp = Math.sqrt(Math.pow(xa - xb, 2) + Math.pow(ya - yb, 2));
    
    console.log("distance: ", temp)
}

function numbOneIsMax(a,b,c){
    let numblist = [a,b,c];
    let temp = Math.max(numblist)==a;
    
    console.log("1st num is max: ", temp);
    return temp;
}

function compare2String(a,b){
    a += "";
    b += "";
    let temp = a == b;

    console.log("2 same strings: ", temp);
    return temp;
}

function isPositive (a){
    a = parseInt(a+"");
    let temp = a > 0;

    console.log("IS POSITIVE: ", temp);
    return temp;
}

function checkLeapYear(year){
    if (!Number.isInteger(Number(year+""))){
        console.log("input isn't a year numb (not a numb)")
        return false;
    }
    year = parseInt(year+"")
    if(year < 0){
        console.log("input isn't a year numb (not positive numb)")
        return false;
    }

    let temp = year % 4 == 0
    console.log("is leap year: ", temp);
    return temp;
}

retangleArea(2,3); // TT1
timeFormConvert(12345); // TT2
exponential(5,2); //TT3
avarageOfThreeNumb(2,3,5) //TT4
distanceOfTwoPoinds(1,2,3,4) //TT5
let numMax = numbOneIsMax(1,2,3); //TT6
let sameString = compare2String(5,"5"); //TT7
let isPos = isPositive("-5"); //TT8
let isLeap = checkLeapYear("1456"); //TT9
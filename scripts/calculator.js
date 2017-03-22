(function() {
var keyToButtonId = {
    '0':'b0',
    '1':'b1',
    '2':'b2',
    '3':'b3',
    '4':'b4',
    '5':'b5',
    '6':'b6',
    '7':'b7',
    '8':'b8',
    '9':'b9',
    'c':'bClear',
    'Delete':'bClear',
    'Backspace':'bClear',
    '=':'bEnter',
    'Enter':'bEnter',
    'p':'bPercent',
    '%':'bPercent',
    '/':'bSlash',
    '*':'bAsterix',
    '-':'bMinus',
    '+':'bPlus',
    '.':'bComma',
    ',':'bComma',
    'm':'bPlusMinus',
};

var choose = "";
var isNumLock = 0;
var in_number = false;
var calc_history = [];
            

!function EL(){
    document.getElementById('calculator')
    .addEventListener('click',function(e) {
        if(e.target.tagName == 'BUTTON')
            chooser(e.target.id);
    }, false);
    window.addEventListener('keydown',function(e){
        chooser(keyToButtonId[e.key]);
    },false);
}();

/* switch choosen buttom */
function chooser(choosen){
    if(!choosen) return;
    
    var dspl_el = document.getElementById('display');
    var n = '';

    switch(choosen){
        case "bClear" :
            dspl_el.innerHTML = "0";
            in_number = false;
            calc_history = []
            break;
        case "bEnter" :
            calc_history.push( Number(dspl_el.innerHTML) );
            dspl_el.innerHTML = calculation(calc_history);
            in_number = false;
            break;
        case "bPercent" :
            //~ /* 4, +, 2, %,  show  2% of 4 
            //~ 5, /, 3, %, =,     show how much 5/3 is in percent
                //~ general after typing 'n', '%', the last result before 'n' is total */
            calc_history.push( Number(dspl_el.innerHTML) );
            calc_history.push( "%" );
            dspl_el.innerHTML = calculation(calc_history);
            in_number = false;
            break;
        case "bSlash" :
            calc_history.push( Number(dspl_el.innerHTML) );
            calc_history.push( "/" );
            in_number = false;
            break;
        case "bAsterix" :
            calc_history.push( Number(dspl_el.innerHTML) );
            calc_history.push( "*" );
            in_number = false;
            break;
        case "bMinus"  :
            calc_history.push( Number(dspl_el.innerHTML) );
            dspl_el.innerHTML = calculation(calc_history);
            calc_history.push( Number(dspl_el.innerHTML) );
            calc_history.push( "-" );
            in_number = false;
        break;
        case "bPlus" :
            calc_history.push( Number(dspl_el.innerHTML) );
            dspl_el.innerHTML = calculation(calc_history);
            calc_history.push( Number(dspl_el.innerHTML) );
            calc_history.push( "+" );
            in_number = false;
            break;
        case "bPlusMinus" :
            if( dspl_el.innerHTML[0] == '-' )
                dspl_el.innerHTML = dspl_el.innerHTML.slice(1);
            else
                dspl_el.innerHTML = '-' + dspl_el.innerHTML;
            if( in_number === false )
                in_number = true;
            break;
        case "bComma" :
            if( in_number ){
                if( /\./.test(dspl_el.innerHTML) == false)
                    dspl_el.innerHTML += '.';
            }else{
                dspl_el.innerHTML = '0.';
                in_number = true;
            }
            break;
        case "b1" : 
        case "b2" : 
        case "b3" : 
        case "b4" : 
        case "b5" : 
        case "b6" : 
        case "b7" : 
        case "b8" : 
        case "b9" : 
        case "b0" : 
            n = choosen.slice(1);
            if(in_number === true ){
                if( /^0/.test(dspl_el.innerHTML) )
                    n = dspl_el.innerHTML.slice(1) + n;
                else if( /^-0/.test(dspl_el.innerHTML) )
                    n = dspl_el.innerHTML.slice(0,1) + n;
                else
                    n = dspl_el.innerHTML + n;
                dspl_el.innerHTML = n;
            }else{
                dspl_el.innerHTML = n;
                in_number = true;
            }
            break;
        default: break;
    }
}

/* run through number array find '*' '/' before '+' '-' */
function calculation(){
    function count (op, x, y){
        switch(op){
            case "/": return x / y;
            case "*": return x * y;
            case "-": return x - y;
            case "+": return x + y;
        }
    }
    if( calc_history[calc_history.length-1] == "%" ){
        calc_history.pop();
        var pc = calc_history.pop() / 100;
        if( /^[+-]$/.test(calc_history[calc_history.length-1]) ){
            pc *= calc_history[calc_history.length-2]
        }
        return pc;
    }
    var i
    while(true){
        i = calc_history.findIndex(function(val){
            return /^[*/]$/.test(val);
        });
        if( i != -1 ){
            calc_history.splice(i-1, 3, 
                count( calc_history[i], calc_history[i-1], calc_history[i+1]));
        }else{
            break;
        }
    }
    while(true){
        i = calc_history.findIndex(function(val){
            return /^[+-]$/.test(val);
        });
        if( i != -1 ){
            calc_history.splice(i-1, 3, 
                count( calc_history[i], calc_history[i-1], calc_history[i+1]));
        }else{
            break;
        }
    }
    return calc_history.pop();
}

})()

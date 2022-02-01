const path = "http://localhost:3000/calculadora"

function UpdateVisor()
{
    visor.innerText = operand2 && operator ? `${operand1} ${operator.symbol} ${operand2}` : operator ? `${operand1} ${operator.symbol}` : operand1 ? `${operand1}` : "0";
}

function GetResult ()
{
    fetch(`${path}/?operand1=${operand1}&operator=${operator.name}&operand2=${operand2}`, {})
    .then((resp) => resp.json())
    .then(data => 
    {
        console.log(data);
        Clear ();
        operand1 = data;
        UpdateVisor();
        /* callback(data); */
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

function Clear ()
{
    operand1 = undefined;
    operand2 = undefined;
    operator = undefined;
    operatorAlt = false;
    operatorChanged = false;
}

function GetOperators (callback)
{
    fetch(`${path}/operators`, {})
    .then((resp) => resp.json())
    .then(data => 
    {
        console.log(data);
        callback(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

const visor = document.getElementById("visor");
const ops = document.getElementById("ops");

let operand1, operand2, operator, operatorChanged = false, operatorAlt = false;
function SetOperand (value){
    if(!operatorAlt){
        operand1 = operand1?(operand1*10)+value:value;
    } else {
        operand2 = operand2?(operand2*10)+value:value;
    }
}

function CreateButton (o, callback)
{
    const li = document.createElement("li");
    li.innerText = o.symbol;
    li.onclick = () => 
    {
        callback(o);
        UpdateVisor();
    };
    ops.append(li);
}

function CreateButtons (data)
{
    data.forEach(button => {
        CreateButton(button, (o) => 
        {
            console.log("Operator clicked "+ o.name);
            operator = {name:o.name, symbol:o.symbol};
            
            if(!operatorAlt) {
                operatorAlt = true;
            }
        });
    });
    
    const special = 
    [
        {name:"clean", symbol:"C", sp:(o) => {Clear()}}, 
        {name:"equal", symbol:"=", sp:(o) => {GetResult()}}
    ];

    special.forEach(o => 
    {
        CreateButton(o, o.sp);
    });
    
    for(let i = 0; i <= 9; i++)
    {
        const n = i;
        const sn = `${n}`;
        CreateButton({name:sn, symbol:i}, () => 
        {
            SetOperand(n);
        });
    }
 
    UpdateVisor();
}

GetOperators(CreateButtons);
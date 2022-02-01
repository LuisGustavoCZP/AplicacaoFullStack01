function Calculator ()
{
    let operators = [
        {name:"soma", symbol:"+", operation: (a, b) => a+b},
        {name:"subtração", symbol:"-", operation: (a, b) => a-b},
        {name:"divisão", symbol:"/", operation: (a, b) => 
        {
            if(b == 0) 
            {
                console.error(`${operation} não pode ter operand2 com valor ${this.b}!`);
                return 0;
            }
            return a/b;
        }},
        {name:"multiplicação", symbol:"*", operation: (a, b) => a*b},
        {name:"potencia", symbol:"^", operation: (a, b) => Math.pow(a, b)},
        {name:"resto", symbol:"%", operation: (a, b) => a % b},
    ];
    let dicOperators = operators.reduce((n, op) => 
    {
        n[op.name] = op;
        return n;
    }, []);
    const c = {
        operators: operators,
        getResult (opA, operation, opB)
        {
            if(!dicOperators.hasOwnProperty(operation)) return "0";

            const oA = parseFloat(opA), oB = parseFloat(opB);
            if(!oA || !oB) return "0";

            console.log(`${opA} ${operation} ${opB}`);
            let r = dicOperators[operation].operation(oA, oB);
            return `${r}`;
            
        },
        Show () {
            let n = operation > -1;
            return n && operand2 != 0 ? `${operand1} ${operators[operation].symbol} ${operand2}` : n ? `${operand1} ${operacoes[operation].symbol}` : operand1;
        }
    };

    return c;
}

module.exports = Calculator;
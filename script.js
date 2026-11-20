const expressionInput = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const angleModeDisplay = document.getElementById('angle-mode');

let isDegree = true;
let lastAnswer = 0;

// Alternar entre Grados (DEG) y Radianes (RAD)
function toggleAngleMode() {
    isDegree = !isDegree;
    angleModeDisplay.textContent = isDegree ? 'DEG' : 'RAD';
}

// Agregar números o paréntesis
function appendValue(val) {
    expressionInput.value += val;
}

// Agregar operadores
function appendOperator(op) {
    expressionInput.value += op;
}

// Agregar funciones científicas
function appendFunction(func) {
    expressionInput.value += func;
}

// Usar el último resultado (Ans)
function useAns() {
    expressionInput.value += 'Ans';
}

// Borrar el último carácter (DEL)
function deleteLast() {
    expressionInput.value = expressionInput.value.slice(0, -1);
}

// Limpiar toda la pantalla (AC)
function clearAll() {
    expressionInput.value = '';
    resultDisplay.textContent = '0';
}

// Funciones trigonométricas adaptadas a DEG o RAD
function calcSin(x) {
    return isDegree ? Math.sin(x * Math.PI / 180) : Math.sin(x);
}

function calcCos(x) {
    return isDegree ? Math.cos(x * Math.PI / 180) : Math.cos(x);
}

function calcTan(x) {
    return isDegree ? Math.tan(x * Math.PI / 180) : Math.tan(x);
}

// Evaluar la expresión matemática
function calculate() {
    let expr = expressionInput.value;
    if (!expr) return;

    try {
        // Reemplazar símbolos visuales por funciones válidas en JavaScript
        let parsedExpr = expr
            .replace(/Ans/g, `(${lastAnswer})`)
            .replace(/\^/g, '**')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sin\(/g, 'calcSin(')
            .replace(/cos\(/g, 'calcCos(')
            .replace(/tan\(/g, 'calcTan(');

        // Evaluar el resultado
        let evalResult = eval(parsedExpr);

        // Redondear decimales largos por precisión de punto flotante (ej. sin(30))
        if (!Number.isInteger(evalResult)) {
            evalResult = parseFloat(evalResult.toFixed(10));
        }

        lastAnswer = evalResult;
        resultDisplay.textContent = evalResult;
    } catch (error) {
        resultDisplay.textContent = 'Syntax ERROR';
    }
}

// Permitir usar la tecla Enter del teclado físico para calcular
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});

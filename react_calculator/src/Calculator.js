import React, { useState } from 'react';
import './Calculator.css';

// Componente do Display
const Display = ({ value }) => {
  return (
    <div className="display">
      {value || '0'}
    </div>
  );
};

// Componente dos Botões
const Button = ({ onClick, className = '', children }) => {
  return (
    <button 
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Componente Principal da Calculadora
const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplayValue(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplayValue('0.');
      setWaitingForNewValue(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch(operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplayValue(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="button-grid">
        <Button onClick={clearDisplay} className="function">AC</Button>
        <Button onClick={() => performOperation('/')} className="operation">/</Button>
        <Button onClick={() => performOperation('*')} className="operation">×</Button>
        <Button onClick={() => inputNumber(7)}>7</Button>
        <Button onClick={() => inputNumber(8)}>8</Button>
        <Button onClick={() => inputNumber(9)}>9</Button>
        <Button onClick={() => performOperation('-')} className="operation">-</Button>
        <Button onClick={() => inputNumber(4)}>4</Button>
        <Button onClick={() => inputNumber(5)}>5</Button>
        <Button onClick={() => inputNumber(6)}>6</Button>
        <Button onClick={() => performOperation('+')} className="operation">+</Button>
        <Button onClick={() => inputNumber(1)}>1</Button>
        <Button onClick={() => inputNumber(2)}>2</Button>
        <Button onClick={() => inputNumber(3)}>3</Button>
        <Button onClick={handleEquals} className="equals">=</Button>
        <Button onClick={() => inputNumber(0)} className="zero">0</Button>
        <Button onClick={inputDot}>.</Button>
      </div>
    </div>
  );
};

export default Calculator;
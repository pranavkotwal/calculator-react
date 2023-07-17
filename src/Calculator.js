import React, { useState } from 'react';
import styles from './styles/calculator.module.css'

function Display({ value }) {
  return <div className={styles.display}>{value}</div>;
}
function Button({ label, onClick, className }) {
    return <button className={className} onClick={onClick}>{label}</button>;
  }

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumberClick = (num) => {
    setDisplayValue(prevValue => {
      if (prevValue === '0') {
        return num.toString();
      } else {
        return prevValue + num.toString();
      }
    });
  };

  const handleOperatorClick = (op) => {
    if (storedValue === null) {
      setStoredValue(parseFloat(displayValue));
      setOperator(op);
      setDisplayValue('0');
    } else {
      calculate();
      setOperator(op);
    }
  };
  const handlePercentageClick = () => {
    const currentValue = parseFloat(displayValue);
    const percentageValue = currentValue / 100;
    setDisplayValue(percentageValue.toString());
  };
  
  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(prevValue => prevValue + '.');
    }
  };

  const calculate = () => {
    const currentValue = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = storedValue + currentValue;
        break;
      case '-':
        result = storedValue - currentValue;
        break;
      case '*':
        result = storedValue * currentValue;
        break;
      case '/':
        result = storedValue / currentValue;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setStoredValue(result);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setStoredValue(null);
    setOperator(null);
  };

  const handleEqualsClick = () => {
    if (storedValue !== null) {
      calculate();
      setStoredValue(null);
      setOperator(null);
    }
  };
  const handleNegationClick = () => {
    setDisplayValue(prevValue => {
      if (prevValue === '0') {
        return prevValue;
      } else if (prevValue.charAt(0) === '-') {
        return prevValue.slice(1);
      } else {
        return '-' + prevValue;
      }
    });
  };

  return (
    <div className={styles.calculator}>
      <Display value={displayValue} />
      <div className={styles.buttons}>
        <div className={styles.row}>
          <Button label="C" onClick={handleClearClick} className={`${styles.buttonClear} ${styles.buttons}`} />
          <Button label="+/-" onClick={handleNegationClick} className={styles.buttons} />
          <Button label="%" onClick={handlePercentageClick} className={styles.buttons} />
          <Button label="+" onClick={() => handleOperatorClick('+')} className={styles.buttonOperation} />
        </div>

        <div  className={styles.row}>

          <Button label="7" onClick={() => handleNumberClick(7)} />
          <Button label="8" onClick={() => handleNumberClick(8)} />
          <Button label="9" onClick={() => handleNumberClick(9)} />
          <Button label="/" onClick={() => handleOperatorClick('/')} className={styles.buttonOperation}/>
        </div>
        <div  className={styles.row}>
          <Button label="4" onClick={() => handleNumberClick(4)} />
          <Button label="5" onClick={() => handleNumberClick(5)} />
          <Button label="6" onClick={() => handleNumberClick(6)} />
          <Button label="*" onClick={() => handleOperatorClick('*') } className={styles.buttonOperation}/>
        </div>
        <div  className={styles.row}>
          <Button label="1" onClick={() => handleNumberClick(1)} />
          <Button label="2" onClick={() => handleNumberClick(2)} />
          <Button label="3" onClick={() => handleNumberClick(3)} />
          <Button label="-" onClick={() => handleOperatorClick('-')} className={styles.buttonOperation}/>
        </div>
        <div  className={styles.row}>
          <Button label="0" onClick={() => handleNumberClick(0) } className={styles.buttonZero}/>
          <Button label="." onClick={handleDecimalClick} />
          <Button label="=" onClick={handleEqualsClick} className={styles.buttonOperation}/>

        </div>
      </div>
    </div>
  );
}

export default Calculator;

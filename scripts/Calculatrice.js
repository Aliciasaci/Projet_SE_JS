import { DivisionError } from "./ExceptionsClasses.js";

const operationsKeys = ["+", "-", "/", "*", "=", "+/-", "C", "M+", "MC"];
const numbersKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const refreshBtn = document.querySelector("#btn-refresh");

let operationPartOne = 0;
let operationPartTwo = 0;
let output = 0;
let operator = undefined;
let nbOperators = 0;
let nbPoint = 0;
let resultOfOperation = 0;
let resetOutput = 0;
let errorMessage = "";
let intermediaryResult = 0;

export function renderCalculatorBody() {
  return `
  <h2 class="param-title">Calculatrice</h2>
  <div class="calculator-wrapper center">
            <table id="calculator">
                <tr class="result">
                    <td colspan="4" class="glass"> <input id="result-input" type="text" value="0" /></td>
                </tr>
                <tr class="keys">
                    <td> <input type="button" value="C" id="btn-refresh" /> </td>
                    <td> <input type="button" value="M+" id="btn-mr" /> </td>
                    <td> <input type="button" value="MC" id="btn-mc"> </td>
                    <td> <input type="button" value="+/-" /> </td>
                </tr>
                <tr class="keys">
                    <td> <input type="button" value="1" /> </td>
                    <td> <input type="button" value="2" /> </td>
                    <td> <input type="button" value="3" /> </td>
                    <td> <input type="button" value="+" id="btn-add" /> </td>
                </tr>
                <tr class="keys">
                    <td> <input type="button" value="4" /> </td>
                    <td> <input type="button" value="5" /> </td>
                    <td> <input type="button" value="6" /> </td>
                    <td> <input type="button" value="-" id="btn-substract" /> </td>
                </tr>
                <tr class="keys">
                    <td> <input type="button" value="7" /> </td>
                    <td> <input type="button" value="8" /> </td>
                    <td> <input type="button" value="9" /> </td>
                    <td> <input type="button" value="*" id="btn-multiply" /> </td>
                </tr>
                <tr class="keys">
                    <td> <input type="button" value="." id="btn-comma" /> </td>
                    <td> <input type="button" value="0" /> </td>
                    <td> <input type="button" value="=" id="btn-equal" /> </td>
                    <td> <input type="button" value="/" id="btn-division" /> </td>
                </tr>
            </table>
            
            <ul id="operations-pannel" class="glass_effect">
                <li>0</li>
            </ul>
        </div>`;
}

const devide = (partOne, partTwo) => {
  if (partTwo == 0) throw new DivisionError("Erreur de division par zéro");

  return parseFloat(partOne) / parseFloat(partTwo);
};

const add = (partOne, partTwo) => {
  if (partOne && partTwo) return parseFloat(partOne) + parseFloat(partTwo);
};

const substract = (partOne, partTwo) => {
  if (partOne && partTwo) return parseFloat(partOne) - parseFloat(partTwo);
};

const multiply = (partOne, partTwo) => {
  if (partOne && partTwo) return parseFloat(partOne) * parseFloat(partTwo);
};

//Fonction qui inverse le signe d'un chiffre/résultat
const invertSignNumber = (number) => {
  if (number) return -number;
};

export function calculate(key) {
  const resultInput = document.querySelector("#result-input");
  const operationsPannel = document.querySelector("#operations-pannel");
  const keyValue = key.value;

  resultInput.value = 0;

  if (numbersKeys.includes(keyValue)) {
    //si chiffre
    if (resetOutput == 1) {
      output = 0;
      resetOutput = 0;
    }
    if (keyValue == ".") {
      if (nbPoint == 0) {
        if (nbOperators == 0) {
          //si toujours pas d'operateur, on continue de remplir
          operationPartOne += keyValue;
        } else {
          operationPartTwo += keyValue;
        }
        output += keyValue;
        nbPoint++;
      }
    } else {
      if (output == 0) {
        output = keyValue;
        operationPartOne = keyValue; //construire la partie 1 de l'opération
      } else {
        if (nbOperators == 0) {
          //si toujours pas d'operateur, on continue de remplir
          output += keyValue;
          operationPartOne += keyValue;
        } else {
          //le cas ou on a déjà un operateur
          if (operationPartTwo == 0) {
            const outputLength = output.length;
            if (output.charAt(outputLength - 1) == 0) {
              operationPartTwo = keyValue;
              output[outputLength - 1] = keyValue;
            } else {
              operationPartTwo += keyValue;
              output += keyValue;
            }
          } else {
            operationPartTwo += keyValue;
            output += keyValue;
          }
        }
      }
    }
  } else if (operationsKeys.includes(keyValue)) {
    if (keyValue == "M+") {
      intermediaryResult = operationPartOne;
      window.alert("Le resultat a été mis en mémoire.");
    } else {
      if (keyValue == "C" || keyValue == "MC") {
        operationPartOne = 0;
        operationPartTwo = 0;
        output = 0;
        operator = undefined;
        nbOperators = 0;
        resultOfOperation = 0;
        resultInput.value = 0;
        operationsPannel.innerHTML = 0;
        if (keyValue == "MC") {
          operationPartOne = intermediaryResult;
          output = intermediaryResult;
          resultInput.value = intermediaryResult;
        }
        return;
      }

      if (nbOperators == 0) {
        //si aucun opérateur auparavant
        if (keyValue != "=" && keyValue != "+/-") {
          //vérifier que le premier opérateur saisi n'est pas un =
          operator = keyValue;
          nbOperators++;
          output += operator;
        } else if (keyValue == "+/-") {
          operationPartOne = invertSignNumber(operationPartOne);
          output = operationPartOne;
        }
        nbPoint = 0;
        resetOutput = 0;
      } else {
        //dès qu'un operateur existe, vérifier lequel c'est, et faire l'operétation
        const outputLength = output.length;
        if (!operationsKeys.includes(output[outputLength - 1])) {
          if (keyValue != "+/-") {
            switch (operator) {
              case "+":
                resultOfOperation = add(operationPartOne, operationPartTwo);
                break;
              case "-":
                resultOfOperation = substract(
                  operationPartOne,
                  operationPartTwo
                );
                break;
              case "/":
                try {
                  resultOfOperation = devide(
                    operationPartOne,
                    operationPartTwo
                  );
                } catch (error) {
                  if (error instanceof DivisionError) {
                    errorMessage = "Error";
                  } else {
                    console.log(error.message);
                  }
                }
                break;
              case "*":
                resultOfOperation = multiply(
                  operationPartOne,
                  operationPartTwo
                );
                break;
            }
            let listElement = document.createElement("li"); //créer une ligne dans le pannel d'affichage
            listElement.innerHTML += output;
            operationPartOne = resultOfOperation;
            operationPartTwo = 0;
            if (keyValue == "=") {
              output = operationPartOne;
              nbOperators = 0;
              listElement.innerHTML += "=";
              listElement.innerHTML += resultOfOperation;

              if (errorMessage == "Error") {
                listElement.innerHTML = errorMessage;
              }

              operationsPannel.append(listElement);
              errorMessage = "";
              resetOutput = 1;
            } else {
              operator = keyValue;
              output = operationPartOne + keyValue;
              resetOutput = 0;
            }
            nbPoint = 0;
          } else {
            operationPartTwo = invertSignNumber(operationPartTwo);
            output = operationPartOne + operator + operationPartTwo;
          }
        }
      }
    }
  }
  resultInput.value = output;
}

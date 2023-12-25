/**
 * Function to add two numbers.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The sum of the two numbers.
 */
const add = (num1: number, num2: number): number => num1 + num2;

/**
 * Function to subtract the second number from the first.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The result of subtracting the second number from the first.
 */
const subtract = (num1: number, num2: number): number => num1 - num2;

/**
 * Function to multiply two numbers.
 * @param num1 - The first number.
 * @param num2 - The second number.
 * @returns The product of the two numbers.
 */
const multiply = (num1: number, num2: number): number => num1 * num2;

/**
 * Function to divide the first number by the second.
 * @param num1 - The numerator.
 * @param num2 - The denominator.
 * @returns The result of dividing the first number by the second.
 */
const divide = (num1: number, num2: number): number => num1 / num2;

/**
 * Function to raise the first number to the power of the second.
 * @param num1 - The base.
 * @param num2 - The exponent.
 * @returns The result of raising the base to the exponent.
 */
const raise = (num1: number, num2: number): number => num1 ** num2;

/**
 * Function to calculate the square root of a number.
 * @param num1 - The number.
 * @returns The square root of the number.
 */
const squareRoot = (num1: number): number => Math.sqrt(num1);

/**
 * Function to calculate the cube root of a number.
 * @param num1 - The number.
 * @returns The cube root of the number.
 */
const cubeRoot = (num1: number): number => Math.cbrt(num1);

/**
 * Function to calculate the cosine of a number.
 * @param num - The angle in radians.
 * @returns The cosine of the angle.
 */
const cos = (num: number): number => Math.cos(num);

/**
 * Function to calculate the sine of a number.
 * @param num - The angle in radians.
 * @returns The sine of the angle.
 */
const sin = (num: number): number => Math.sin(num);

/**
 * Function to calculate the tangent of a number.
 * @param num - The angle in radians.
 * @returns The tangent of the angle.
 */
const tan = (num: number): number => Math.tan(num);

/**
 * Function to calculate the factorial of a number.
 * @param num - The number.
 * @returns The factorial of the number.
 */
const factorial = (num: number): number => {
    let result = 1;
    while (num > 1) {
        result *= num;
        num--;
    }
    return result;
};

/**
 * Function to calculate the percentage of a number.
 * @param num - The number.
 * @returns The percentage of the number.
 */
const percentage = (num: number): number => num / 100;

/**
 * Function to calculate the arctangent of a number.
 * @param num - The angle in radians.
 * @returns The arctangent of the angle.
 */
const atan = (num: number): number => Math.atan(num);

const log = (num: number): number => Math.log10(num);

export {
    add,
    subtract,
    multiply,
    divide,
    raise,
    squareRoot,
    cubeRoot,
    cos,
    sin,
    tan,
    factorial,
    percentage,
    atan,
    log
};

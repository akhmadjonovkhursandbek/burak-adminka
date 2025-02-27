console.log("Train Area:");
console.log("ZH-TASK");

// // H-TASK

// function getPositive(arr) {
//     return arr.filter(num => num > 0).join('');
//   }

//   // Misol uchun
//   console.log(getPositive([1, -4, 2]));
//   console.log(getPositive([1, -4, 2, 5, -10]));
//   console.log(getPositive([-1, -16, 6, 27]));
//   console.log(getPositive([-19, -21,, 9, 101, 30]));

// // H-2 TASK

// function getDigits(inputString: string): string {
//   return inputString
//     .split('')
//     .filter(char => /\d/.test(char))
//     .join('');
// }

// const result = getDigits("m14i1t");
// console.log(result);
// const result2 = getDigits("m2456ion5jb5t");
// console.log(result2);

// const result3 = getDigits("nn784n4j4n34h459b");
// console.log(result3);
// const result4 = getDigits("m8lm34k4n9bb");
// console.log(result4);

/* Project Standarts:
  -Logging standarts
  -Naming standarts:
     function, method, variable => CAMEL
      class => PASCAL
     folder, file => KEBAB
     CSS => SNAKE
  -Error handling

  */

/*
    Traditional Api
    Rest Api
    GraphQL Api
    ...
  */

/**
 * Validation:
 * Frontend validation
 * Backend validation
 * Database validation
 */
// // I-TASK

// function majorityElement(arr: number[]): number | null {
//   const countMap: Record<number, number> = {};
//   let maxElement: number | null = null;
//   let maxCount = 0;

//   for (const num of arr) {
//       countMap[num] = (countMap[num] || 0) + 1;
//       if (countMap[num] > maxCount) {
//           maxCount = countMap[num];
//           maxElement = num;
//       }
//   }

//   return maxElement;
// }

// console.log(majorityElement([5, 3, 5, 2, 3, 4, 5, 9, 3, 4]));
// console.log(majorityElement([2, 5, 1, 2, 2, 8, 3, 3, 3]));
// console.log(majorityElement([9, 7, 7, 8, 1, 1]));

// // J-TASK

// function findLongestWord(sentence: string): string {
//   const words = sentence.split(" ");

//   const longestWord = words.reduce((longest, current) => {
//       return current.length > longest.length ? current : longest;
//   }, "");

//   return longestWord;
// }

// const result = findLongestWord("나는 감정스러운 사람이다");
// console.log(result);

// const result2 = findLongestWord("Korean peoples are so kind");
// console.log(result2);

// const result3 = findLongestWord("O'zbekiston vatanim manim");
// console.log(result3);

// // K-TASK

// function countVowels(str: string): number {
//   const vowels = "aeiouAEIOU";
//   let count = 0;

//   for (const char of str) {
//       if (vowels.includes(char)) {
//           count++;
//       }
//   }

//   return count;
// }

// console.log(countVowels("understand"));
// console.log(countVowels("Assalom Uzbekistan"));

// // L-TASK

// function reverseSentence(sentence: string): string {
//   const words = sentence.split(" ");
//   const reversedWords = words.map(word => word.split("").reverse().join(""));
//   return reversedWords.join(" ");
// }

// const input = ("We like coding");
// const result = reverseSentence(input);
// console.log(result);

// const input2 = "I love Uzbekistan";
// const result2 = reverseSentence(input2);
// console.log(result2);

// const input3 = "I am a coder not an engineer";
// const result3 = reverseSentence(input3);
// console.log(result3);

// // M-TASK

// type NumberSquare = {
//   number: number;
//   square: number;
// };

// function getSquareNumbers(numbers: number[]): NumberSquare[] {
//   return numbers.map(num => ({
//     number: num,
//     square: num * num,
//   }));
// }

// const result = getSquareNumbers([1, 2, 3]);
// console.log(result);

// const result2 = getSquareNumbers([4, 5, 6]);
// console.log(result2);

// const result3 = getSquareNumbers([7, 8, 9]);
// console.log(result3);

// // N-TASK

// function palindromCheck(input: string): boolean {
//   const cleanedInput = input.toLowerCase().replace(/[\W_]/g, "");

//   const reversedInput = cleanedInput.split("").reverse().join("");

//   return cleanedInput === reversedInput;
// }

// console.log("Ona:", palindromCheck("Ona"));
// console.log("Qozoq:", palindromCheck("Qozoq"));
// console.log("Aziza:", palindromCheck("Aziza"));
// console.log("Hello:", palindromCheck("Hello"));

// O-TASK

// function calculateSumOfNumbers(arr: any[]): number {
//   return arr.reduce((sum, current) => {
//     return typeof current === "number" ? sum + current : sum;
//   }, 0);
// }

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));
// console.log(calculateSumOfNumbers([12, "2", { son: 5 }, false, 98]));
// console.log(calculateSumOfNumbers([71, "20", { son: 1 }, false, 18]));
// console.log(calculateSumOfNumbers([0, "101", { son: 9 }, true, 2]));

//sdkjbkjsdkdhvkdhdssdhkshv

// Q-TASK

// function hasProperty(obj: object, prop: string): boolean {
//   return Object.prototype.hasOwnProperty.call(obj, prop);
// }

// console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
// console.log(hasProperty({ name: "BMW", model: "M3" }, "year")); // false

// R-TASK
// function calculate(expression: string): number {
//   try {
//     if (/^[\d\s\+\-\*\/\(\)]+$/.test(expression)) {
//       return Function(`return ${expression}`)();
//     } else {
//       throw new Error("Invalid expression");
//     }
//   } catch (error) {
//     throw new Error("Error evaluating the expression");
//   }
// }

// console.log(calculate("1 + 3")); // 4
// console.log(calculate("2 * 5")); // 10
// console.log(calculate("10 / 2 + 1")); // 6

// S-TASK

// function missingNumber(nums: number[]): number {
//   const n = nums.length;
//   const expectedSum = (n * (n + 1)) / 2;

//   const actualSum = nums.reduce((sum, num) => sum + num, 0);

//   return expectedSum - actualSum;
// }

// const result = missingNumber([3, 0, 1]);
// console.log(result);

// T-TASK

// function mergeSortedArrays(array1: number[], array2: number[]): number[] {
//   let i = 0, j = 0;
//   const mergedArray: number[] = [];
//   while (i < array1.length && j < array2.length) {
//       if (array1[i] < array2[j]) {
//           mergedArray.push(array1[i]);
//           i++;
//       } else {
//           mergedArray.push(array2[j]);
//           j++;
//       }
//   }
//   while (i < array1.length) {
//       mergedArray.push(array1[i]);
//       i++;
//   }
//   while (j < array2.length) {
//       mergedArray.push(array2[j]);
//       j++;
//   }

//   return mergedArray;
// }
// const result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
// console.log(result); // Output: [0, 3, 4, 4, 6, 30, 31]

// // U-TASK

// function sumOdds(n: number): number {
//   let count = 0;
//   for (let i = 1; i <= n; i += 2) {
//       count++;
//   }
//   return count;
// }
// console.log(sumOdds(9));  // Output: 4
// console.log(sumOdds(11)); // Output: 5

// V-TASK

// function countChars(str: string): Record<string, number> {
//   const charCount: Record<string, number> = {};

//   for (const char of str) {
//       if (charCount[char]) {
//           charCount[char]++;
//       } else {
//           charCount[char] = 1;
//       }
//   }

//   return charCount;
// }
// console.log(countChars("hello"));

// W-TASK

// function chunkArray<T>(array: T[], chunkSize: number): T[][] {
//   if (chunkSize <= 0) {
//     throw new Error("Chunk size must be greater than 0");
//   }

//   const result: T[][] = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     result.push(array.slice(i, i + chunkSize));
//   }

//   return result;
// }
// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const chunkSize = 3;
// console.log(chunkArray(array, chunkSize));

// X-TASK

// function countOccurrences(obj: Record<string, any>, key: string): number {
//   let count = 0;

//   function search(obj: Record<string, any>) {
//     for (const k in obj) {
//       if (k === key) {
//         count++;
//       }
//       if (typeof obj[k] === "object" && obj[k] !== null) {
//         search(obj[k]);
//       }
//     }
//   }

//   search(obj);
//   return count;
// }
// const data = {
//   model: "Bugatti",
//   steer: {
//     model: "HANKOOK",
//     size: 30,
//   },
// };
// console.log(countOccurrences(data, "model"));

// Y-TASK

// function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
//   return arr1.filter((value) => arr2.includes(value));
// }

// console.log(findIntersection([1, 2, 3], [3, 2, 0])); // [2, 3]

// Z-TASK

// function sumEvens(numbers: number[]): number {
//   return numbers.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0);
// }

// console.log(sumEvens([1, 2, 3])); // 2
// console.log(sumEvens([1, 2, 3, 2])); // 4

// ZA-Task

// function sortByAge(arr: { age: number }[]): { age: number }[] {
//   return arr.sort((a, b) => a.age - b.age);
// }
// const people = [{ age: 23 }, { age: 21 }, { age: 13 }];
// console.log(sortByAge(people));

// ZC-TASK

// function celsiusToFahrenheit(celsius: number): number {
//   return (celsius * 9/5) + 32;
// }

// console.log(celsiusToFahrenheit(0));
// console.log(celsiusToFahrenheit(100));
// console.log(celsiusToFahrenheit(-40));

// ZD-TASK

// function changeNumberInArray(
//   target: number,
//   arr: number[],
//   newValue: number
// ): number[] {
//   const index = arr.indexOf(target);
//   if (index !== -1) {
//     arr[index] = newValue;
//   }
//   return arr;
// }
// console.log(changeNumberInArray(1, [1, 3, 7, 2], 2));

// ZE-TASK

// function removeDuplicate(str: string): string {
//   return Array.from(new Set(str)).join('');
// }
// console.log(removeDuplicate('stringg'));

// ZF-TASK

// function capitalizeWords(input: string): string {
//   return input
//     .split(" ")
//     .map((word) => {
//       if (word.length > 2) {
//         return word.charAt(0).toUpperCase() + word.slice(1);
//       }
//       return word;
//     })
//     .join(" ");
// }

// console.log(capitalizeWords("name should be a string"));
// console.log(capitalizeWords("i am a adam"));
// console.log(capitalizeWords("this is a test case"));

// ZG-TASK

// function capitalizeWordsToSnakeCase(input: string): string {
//   return input
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, '_');
// }
// console.log(capitalizeWordsToSnakeCase('name should be a string'));

// ZH-TASK

function findDisappearedNumbers(arr: number[]): number[] {
  const maxNum = Math.max(...arr);
  const missingNumbers: number[] = [];

  for (let i = 1; i < maxNum; i++) {
    if (!arr.includes(i)) {
      missingNumbers.push(i);
    }
  }

  return missingNumbers;
}

console.log(findDisappearedNumbers([1, 3, 4, 7]));

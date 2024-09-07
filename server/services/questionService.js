// questionService.js
export const fetchRandomQuestion = async () => {
  const questions = [
      {
          prompt: 'Write a function in JavaScript that returns the sum of all numbers in an array.',
          correctSolution: `function sumArray(arr) { return arr.reduce((acc, num) => acc + num, 0); }`
      },
      {
          prompt: 'Write a function that checks if a string is a palindrome.',
          correctSolution: `function isPalindrome(str) { return str === str.split('').reverse().join(''); }`
      },
      {
          prompt: 'Create a function that finds the largest number in an array.',
          correctSolution: `function findMax(arr) { return Math.max(...arr); }`
      },
      {
          prompt: 'Write a function to count the number of occurrences of a character in a string.',
          correctSolution: `function countChar(str, char) { return (str.split(char).length - 1); }`
      },
      {
          prompt: 'Write a function to reverse a string.',
          correctSolution: `function reverseString(str) { return str.split('').reverse().join(''); }`
      },
      {
          prompt: 'Create a function to check if a number is even.',
          correctSolution: `function isEven(num) { return num % 2 === 0; }`
      },
      {
          prompt: 'Write a function that returns the factorial of a number.',
          correctSolution: `function factorial(n) { return n <= 1 ? 1 : n * factorial(n - 1); }`
      },
      {
          prompt: 'Write a function to remove duplicates from an array.',
          correctSolution: `function removeDuplicates(arr) { return [...new Set(arr)]; }`
      },
      {
          prompt: 'Write a function to merge two arrays into one.',
          correctSolution: `function mergeArrays(arr1, arr2) { return arr1.concat(arr2); }`
      },
      {
          prompt: 'Create a function to check if a number is a perfect square.',
          correctSolution: `function isPerfectSquare(num) { return Number.isInteger(Math.sqrt(num)); }`
      },
      {
          prompt: 'Write a function that returns the Fibonacci sequence up to n numbers.',
          correctSolution: `function fibonacci(n) { 
              let [a, b] = [0, 1];
              let result = [];
              while (n-- > 0) {
                  result.push(a);
                  [a, b] = [b, a + b];
              }
              return result;
          }`
      },
      {
          prompt: 'Create a function that checks if two strings are anagrams.',
          correctSolution: `function areAnagrams(str1, str2) { 
              const sortString = str => str.split('').sort().join('');
              return sortString(str1) === sortString(str2);
          }`
      },
      {
          prompt: 'Write a function to find the average of an array of numbers.',
          correctSolution: `function average(arr) { return arr.reduce((acc, num) => acc + num, 0) / arr.length; }`
      },
      {
          prompt: 'Write a function to capitalize the first letter of each word in a string.',
          correctSolution: `function capitalizeWords(str) { 
              return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          }`
      },
      {
          prompt: 'Write a function to find the longest word in a string.',
          correctSolution: `function findLongestWord(str) { 
              return str.split(' ').reduce((longest, word) => word.length > longest.length ? word : longest, '');
          }`
      },
      {
          prompt: 'Create a function that returns an object with the count of each character in a string.',
          correctSolution: `function charCount(str) { 
              return str.split('').reduce((count, char) => { 
                  count[char] = (count[char] || 0) + 1; 
                  return count; 
              }, {});
          }`
      },
      {
          prompt: 'Write a function to get the current date in YYYY-MM-DD format.',
          correctSolution: `function getCurrentDate() { 
              const date = new Date(); 
              return date.toISOString().split('T')[0];
          }`
      },
      {
          prompt: 'Write a function that checks if a number is a prime number.',
          correctSolution: `function isPrime(num) { 
              if (num <= 1) return false; 
              for (let i = 2; i <= Math.sqrt(num); i++) { 
                  if (num % i === 0) return false; 
              } 
              return true;
          }`
      },
      {
          prompt: 'Write a function to convert a string to title case.',
          correctSolution: `function toTitleCase(str) { 
              return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          }`
      },
      {
          prompt: 'Create a function to flatten a nested array.',
          correctSolution: `function flattenArray(arr) { 
              return arr.reduce((flat, toFlatten) => 
                  flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten), []);
          }`
      },
      {
          prompt: 'Write a function to find the common elements in two arrays.',
          correctSolution: `function commonElements(arr1, arr2) { 
              return arr1.filter(value => arr2.includes(value));
          }`
      },
      {
          prompt: 'Write a function to sort an array of objects by a specific property.',
          correctSolution: `function sortByProperty(arr, property) { 
              return arr.sort((a, b) => (a[property] > b[property]) ? 1 : -1);
          }`
      },
      {
          prompt: 'Write a function that generates a random integer between min and max.',
          correctSolution: `function getRandomInt(min, max) { 
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }`
      },
      {
          prompt: 'Create a function to find the intersection of two arrays.',
          correctSolution: `function intersection(arr1, arr2) { 
              return arr1.filter(value => arr2.includes(value));
          }`
      },
      {
          prompt: 'Write a function to deep clone an object.',
          correctSolution: `function deepClone(obj) { 
              return JSON.parse(JSON.stringify(obj));
          }`
      },
      {
          prompt: 'Write a function to check if an array is a subset of another array.',
          correctSolution: `function isSubset(arr1, arr2) { 
              return arr1.every(value => arr2.includes(value));
          }`
      },
      {
          prompt: 'Write a function to debounce a function call.',
          correctSolution: `function debounce(func, wait) { 
              let timeout; 
              return function(...args) { 
                  clearTimeout(timeout); 
                  timeout = setTimeout(() => func.apply(this, args), wait); 
              }; 
          }`
      },
      {
          prompt: 'Write a function to throttle a function call.',
          correctSolution: `function throttle(func, limit) { 
              let lastFunc; 
              let lastRan; 
              return function(...args) { 
                  const context = this; 
                  if (!lastRan) { 
                      func.apply(context, args); 
                      lastRan = Date.now(); 
                  } else { 
                      clearTimeout(lastFunc); 
                      lastFunc = setTimeout(() => { 
                          if ((Date.now() - lastRan) >= limit) { 
                              func.apply(context, args); 
                              lastRan = Date.now(); 
                          } 
                      }, limit - (Date.now() - lastRan)); 
                  } 
              }; 
          }`
      },
      {
          prompt: 'Write a function to get the unique values of an array.',
          correctSolution: `function uniqueValues(arr) { 
              return [...new Set(arr)];
          }`
      },
      {
          prompt: 'Create a function to merge two objects.',
          correctSolution: `function mergeObjects(obj1, obj2) { 
              return { ...obj1, ...obj2 };
          }`
      },
      {
          prompt: 'Write a function to get the difference between two arrays.',
          correctSolution: `function difference(arr1, arr2) { 
              return arr1.filter(value => !arr2.includes(value));
          }`
      },
      {
          prompt: 'Write a function to calculate the sum of squares of numbers in an array.',
          correctSolution: `function sumOfSquares(arr) { 
              return arr.reduce((sum, num) => sum + num * num, 0);
          }`
      },
      {
          prompt: 'Write a function to check if an object is empty.',
          correctSolution: `function isEmpty(obj) { 
              return Object.keys(obj).length === 0;
          }`
      },
      {
          prompt: 'Write a function to get the keys of an object.',
          correctSolution: `function getKeys(obj) { 
              return Object.keys(obj);
          }`
      },
      {
          prompt: 'Write a function to get the values of an object.',
          correctSolution: `function getValues(obj) { 
              return Object.values(obj);
          }`
      },
      {
          prompt: 'Create a function to create a range of numbers.',
          correctSolution: `function range(start, end) { 
              return Array.from({ length: end - start + 1 }, (_, i) => start + i);
          }`
      },
      {
          prompt: 'Write a function to flatten an object into a single level.',
          correctSolution: `function flattenObject(obj, parent = '', res = {}) { 
              for (let key in obj) { 
                  let propName = parent ? \`\${parent}.\${key}\` : key; 
                  if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) { 
                      flattenObject(obj[key], propName, res); 
                  } else { 
                      res[propName] = obj[key]; 
                  } 
              } 
              return res; 
          }`
      },
      {
          prompt: 'Write a function to parse a URL and return its components.',
          correctSolution: `function parseUrl(url) { 
              const { protocol, hostname, pathname, search, hash } = new URL(url); 
              return { protocol, hostname, pathname, search, hash };
          }`
      },
      {
          prompt: 'Write a function to get the current timestamp.',
          correctSolution: `function getTimestamp() { 
              return new Date().getTime();
          }`
      },
      {
          prompt: 'Write a function to convert a number to a currency format.',
          correctSolution: `function formatCurrency(amount) { 
              return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
          }`
      },
      {
          prompt: 'Write a function to convert a string to a number.',
          correctSolution: `function stringToNumber(str) { 
              return Number(str);
          }`
      },
      {
          prompt: 'Create a function to find the first non-repeated character in a string.',
          correctSolution: `function firstNonRepeatedChar(str) { 
              const charCount = {};
              for (let char of str) { 
                  charCount[char] = (charCount[char] || 0) + 1;
              }
              for (let char of str) { 
                  if (charCount[char] === 1) return char; 
              }
              return null;
          }`
      },
      {
          prompt: 'Write a function to check if a string is a valid email address.',
          correctSolution: `function isValidEmail(email) { 
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
              return regex.test(email);
          }`
      },
      {
          prompt: 'Write a function to generate a random alphanumeric string of a given length.',
          correctSolution: `function generateRandomString(length) { 
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              let result = '';
              for (let i = 0; i < length; i++) { 
                  result += chars.charAt(Math.floor(Math.random() * chars.length));
              }
              return result;
          }`
      },
      {
          prompt: 'Write a function to count the number of vowels in a string.',
          correctSolution: `function countVowels(str) { 
              return (str.match(/[aeiouAEIOU]/g) || []).length;
          }`
      },
      {
          prompt: 'Write a function to get the last element of an array.',
          correctSolution: `function getLastElement(arr) { 
              return arr[arr.length - 1];
          }`
      },
      {
          prompt: 'Write a function to check if an array contains only unique values.',
          correctSolution: `function hasUniqueValues(arr) { 
              return new Set(arr).size === arr.length;
          }`
      },
      {
          prompt: 'Write a function to shuffle the elements of an array.',
          correctSolution: `function shuffleArray(arr) { 
              for (let i = arr.length - 1; i > 0; i--) { 
                  const j = Math.floor(Math.random() * (i + 1)); 
                  [arr[i], arr[j]] = [arr[j], arr[i]]; 
              } 
              return arr;
          }`
      },
      {
          prompt: 'Create a function to get the difference between two objects.',
          correctSolution: `function differenceObjects(obj1, obj2) { 
              const diff = {};
              for (let key in obj1) { 
                  if (obj1[key] !== obj2[key]) { 
                      diff[key] = obj1[key];
                  }
              }
              return diff;
          }`
      },
      {
          prompt: 'Write a function to check if a number is a power of two.',
          correctSolution: `function isPowerOfTwo(n) { 
              return (n & (n - 1)) === 0 && n > 0;
          }`
      },
      {
          prompt: 'Write a function to get the sum of the digits of a number.',
          correctSolution: `function sumOfDigits(num) { 
              return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
          }`
      },
      {
          prompt: 'Write a function to check if a given number is an Armstrong number.',
          correctSolution: `function isArmstrongNumber(num) { 
              const str = num.toString();
              const len = str.length;
              const sum = str.split('').reduce((acc, digit) => acc + Math.pow(parseInt(digit), len), 0);
              return sum === num;
          }`
      },
      {
          prompt: 'Write a function to convert a date object to a readable string.',
          correctSolution: `function formatDate(date) { 
              return date.toDateString();
          }`
      },
      {
          prompt: 'Write a function to find the median of an array of numbers.',
          correctSolution: `function findMedian(arr) { 
              arr.sort((a, b) => a - b);
              const middle = Math.floor(arr.length / 2);
              return arr.length % 2 === 0 ? (arr[middle - 1] + arr[middle]) / 2 : arr[middle];
          }`
      },
      {
          prompt: 'Write a function to find the mode of an array of numbers.',
          correctSolution: `function findMode(arr) { 
              const frequency = arr.reduce((freq, num) => { 
                  freq[num] = (freq[num] || 0) + 1; 
                  return freq; 
              }, {});
              const maxFreq = Math.max(...Object.values(frequency));
              return Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number);
          }`
      },
      {
          prompt: 'Write a function to create a memoized version of a function.',
          correctSolution: `function memoize(fn) { 
              const cache = new Map(); 
              return function(...args) { 
                  const key = JSON.stringify(args); 
                  if (cache.has(key)) { 
                      return cache.get(key); 
                  } 
                  const result = fn(...args); 
                  cache.set(key, result); 
                  return result; 
              }; 
          }`
      },
      {
          prompt: 'Write a function to debounce a function call.',
          correctSolution: `function debounce(func, wait) { 
              let timeout; 
              return function(...args) { 
                  clearTimeout(timeout); 
                  timeout = setTimeout(() => func.apply(this, args), wait); 
              }; 
          }`
      },
      {
          prompt: 'Create a function that converts an object to a query string.',
          correctSolution: `function objectToQueryString(obj) { 
              return Object.keys(obj).map(key => \`\${encodeURIComponent(key)}=\${encodeURIComponent(obj[key])}\`).join('&');
          }`
      },
      {
          prompt: 'Write a function to parse a query string into an object.',
          correctSolution: `function queryStringToObject(queryString) { 
              return queryString.slice(1).split('&').reduce((acc, pair) => { 
                  const [key, value] = pair.split('='); 
                  acc[decodeURIComponent(key)] = decodeURIComponent(value); 
                  return acc; 
              }, {});
          }`
      },
      {
          prompt: 'Write a function to check if a string contains only alphabetic characters.',
          correctSolution: `function isAlphabetic(str) { 
              return /^[a-zA-Z]+$/.test(str);
          }`
      },
      {
          prompt: 'Write a function to get the keys and values of an object as arrays.',
          correctSolution: `function getKeysAndValues(obj) { 
              return [Object.keys(obj), Object.values(obj)];
          }`
      },
      {
          prompt: 'Write a function to find the intersection of two arrays.',
          correctSolution: `function intersection(arr1, arr2) { 
              return arr1.filter(value => arr2.includes(value));
          }`
      },
      {
          prompt: 'Write a function to check if a string is a valid URL.',
          correctSolution: `function isValidUrl(url) { 
              try { 
                  new URL(url); 
                  return true; 
              } catch (e) { 
                  return false; 
              } 
          }`
      },
      {
          prompt: 'Write a function to convert an array of objects into an array of specific property values.',
          correctSolution: `function pluck(arr, prop) { 
              return arr.map(item => item[prop]);
          }`
      },
      {
          prompt: 'Write a function to get the URL parameters as an object.',
          correctSolution: `function getUrlParams(url) { 
              const params = new URLSearchParams(new URL(url).search); 
              return Object.fromEntries(params.entries());
          }`
      },
      {
          prompt: 'Write a function to create an array of a specific length filled with a given value.',
          correctSolution: `function createArray(length, value) { 
              return Array.from({ length }, () => value);
          }`
      },
      {
          prompt: 'Write a function to find the unique values in a two-dimensional array.',
          correctSolution: `function unique2D(arr) { 
              return [...new Set(arr.flat())];
          }`
      },
      {
          prompt: 'Write a function to convert an array of strings to uppercase.',
          correctSolution: `function toUpperCaseArray(arr) { 
              return arr.map(str => str.toUpperCase());
          }`
      },
      {
          prompt: 'Write a function to create a deep copy of an array.',
          correctSolution: `function deepCopyArray(arr) { 
              return arr.map(item => Array.isArray(item) ? deepCopyArray(item) : item);
          }`
      },
      {
          prompt: 'Write a function to merge multiple arrays into one.',
          correctSolution: `function mergeArrays(...arrays) { 
              return arrays.flat();
          }`
      }
  ];

  // Randomly select a question
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

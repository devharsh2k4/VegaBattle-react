

export const fetchRandomQuestion = async () => {
    
    const questions = [
      {
        prompt: 'Write a function in JavaScript that returns the sum of all numbers in an array.',
        correctSolution: `function sumArray(arr) { return arr.reduce((acc, num) => acc + num, 0); }`
      },
      {
        prompt: 'Create a python function that checks if a number is prime.',
        correctSolution: `def is_prime(n): 
    if n <= 1: 
      return False 
    for i in range(2, int(n ** 0.5) + 1): 
      if n % i == 0: 
        return False 
    return True`
      },  
      // Add more questions as needed
    ];
  
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };
  
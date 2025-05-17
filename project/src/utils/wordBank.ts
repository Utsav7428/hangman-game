// A collection of words for the AI to use
const wordBank = [
  'hangman',
  'javascript',
  'react',
  'typescript',
  'component',
  'function',
  'programming',
  'algorithm',
  'development',
  'interface',
  'animation',
  'application',
  'variable',
  'constant',
  'framework',
  'library',
  'database',
  'responsive',
  'rendering',
  'deployment',
  'keyboard',
  'monitor',
  'browser',
  'internet',
  'network',
  'server',
  'client',
  'cookie',
  'session',
  'storage',
  'router',
  'navigation',
  'animation',
  'transition',
  'callback',
  'promise',
  'asynchronous',
  'synchronous',
  'iteration',
  'recursion',
  'infinite',
  'endpoint',
  'middleware',
  'authentication',
  'authorization',
  'encryption',
  'decryption',
  'security',
  'vulnerability'
];

// Get a random set of words
export const getRandomWords = (count: number): string[] => {
  const shuffled = [...wordBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Check if a word contains only letters and spaces
export const isValidWord = (word: string): boolean => {
  return /^[a-zA-Z\s]+$/.test(word);
};

// Format a word for display (hide unguessed letters)
export const formatWordDisplay = (word: string, guessedLetters: string[]): string => {
  return word
    .split('')
    .map(letter => 
      letter === ' ' 
        ? ' ' 
        : guessedLetters.includes(letter.toLowerCase()) 
          ? letter 
          : '_'
    )
    .join(' ');
};

// Get all unique letters in a word, ignoring spaces
export const getUniqueLetters = (word: string): string[] => {
  return [...new Set(word.toLowerCase().replace(/\s/g, '').split(''))];
};
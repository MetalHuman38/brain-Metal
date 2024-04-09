// Import necessary modules
import crypto from 'crypto';

// Function to generate a hash from a string
export function generateHash(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

// Function to generate an avatar URL based on user initials
export function generateAvatarUrl(name: string): string {
  // Extract the initials from the user's name
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');

  // Generate a hash from the initials
  const hash = generateHash(initials);

  // Construct the avatar URL
  const baseUrl = 'https://www.gravatar.com/avatar/';
  const size = 200; // Specify the desired size of the avatar
  return `${baseUrl}${hash}?s=${size}&d=identicon`;
}

// Example usage
const userName = 'John Doe';
const avatarUrl = generateAvatarUrl(userName);
console.log(avatarUrl); // Output: "https://www.gravatar.com/avatar/<hash>?s=200&d=identicon"

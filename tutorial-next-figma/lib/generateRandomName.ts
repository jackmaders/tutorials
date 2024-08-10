function generateRandomName(): string {
  const randomAdjective =
    ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

const ADJECTIVES = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const ANIMALS = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export default generateRandomName;

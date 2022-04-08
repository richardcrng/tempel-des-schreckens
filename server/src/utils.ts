export const generateRandomGameId = (): string => {
  const stringOptions = "ABCDEFGHIJLKMNOPQRSTUVWXYZ1234567890";
  const randomChars = [...Array(5).keys()].map(
    () => stringOptions[Math.floor(Math.random() * stringOptions.length)]
  );
  return randomChars.join("");
};

export function getColor(): string {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}

export function getColors(n: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < n; i++) {
    colors.push(selectColor(Math.floor(Math.random() * 999)));
  }
  return colors;
}

function selectColor(number: number): string {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},50%,75%)`;
}

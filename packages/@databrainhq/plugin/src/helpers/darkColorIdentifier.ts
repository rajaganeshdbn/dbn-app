/* eslint-disable no-bitwise */
// Function to identify if the color is dark or light

export const darkColorIdentifier = (color: string) => {
  const hexColor = color.replace(/^#/, '');
  const bigint = parseInt(hexColor, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  const threshold = 128;

  return luminance < threshold;
};

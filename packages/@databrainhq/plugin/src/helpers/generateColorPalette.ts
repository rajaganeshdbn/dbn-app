/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-bitwise */

const hexToRgb = (hex: any) => {
  const bigint = parseInt(hex?.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHex = (r: any, g: any, b: any) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

const generateShadedColor = (
  color: any,
  shadeIndex: any,
  totalShades: number
) => {
  const rgbColor = hexToRgb(color);
  const darkPercentage = (shadeIndex + 1) / (totalShades + 1);
  const darkShadedColor = rgbColor.map((component) =>
    Math.round(component * (1 - darkPercentage))
  );
  const lightPercentage = (shadeIndex + 1) / (totalShades + 1);
  const lightShadedColor = rgbColor.map((component) =>
    Math.round(component + (255 - component) * lightPercentage)
  );

  const shadedColor = shadeIndex % 2 === 0 ? lightShadedColor : darkShadedColor;
  const shadedHexColor = rgbToHex(
    shadedColor[0],
    shadedColor[1],
    shadedColor[2]
  );

  return shadedHexColor;
};

// Function to get the different shades of the provided color array
export const generateColorPalette = (
  originalColors: string[],
  numberOfRecords: number
) => {
  const shadeRecords = Math.floor(numberOfRecords / originalColors?.length);
  const shades = shadeRecords > 0 ? shadeRecords + 2 : 5;
  const colorPalette = [];

  for (let i = 0; i < numberOfRecords; i += 1) {
    let color;
    if (i < originalColors.length) {
      color = originalColors[i];
    } else {
      const originalColorIndex =
        (i - originalColors.length) % originalColors.length;
      const originalColor = originalColors[originalColorIndex];
      const shadeIndex =
        Math.floor((i - originalColors.length) / originalColors.length) %
        shades;

      color = generateShadedColor(originalColor, shadeIndex, shades);
    }

    colorPalette.push(color);
  }

  return colorPalette;
};

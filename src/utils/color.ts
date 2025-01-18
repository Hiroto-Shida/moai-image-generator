export const isColorCode = (value: string): boolean => {
  return /^#[0-9a-fA-F]{6}$/.test(value);
};

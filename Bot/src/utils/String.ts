export const isEmpty = (str: string): boolean => {
  return str == null || str === "" || str === " ";
};

export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Put the first letter of a string in uppercase and put all the other letters in lowercase
 * @param str
 * @returns
 */
export const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

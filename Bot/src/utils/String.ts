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

export const separateFirstNameAndLastName = (
  fullName: string
): { firstname: string; lastname: string } => {
  const words = fullName.split(" ");
  const firstnameArray: string[] = [];
  let lastname = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (i === words.length - 1 || word === word.toUpperCase()) {
      lastname = words.slice(i).join(" ");
      break;
    } else {
      firstnameArray.push(word);
    }
  }

  const firstname = firstnameArray.join(" ");

  return { firstname, lastname };
};

export const wordToSqlJokerReady = (word: string): string => {
  return word.replace(/[- ]/g, "%");
};

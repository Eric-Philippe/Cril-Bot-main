const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  ", ": "--..--",
  ".": ".-.-.-",
  "?": "..--..",
  "/": "-..-.",
  "-": "-....-",
  "(": "-.--.",
  ")": "-.--.-",
  " ": " ",
};

const leetCode = {
  a: "4",
  b: "8",
  c: "(",
  d: String.raw`\|)`,
  e: "3",
  f: String.raw`\|=`,
  g: "6",
  h: "#",
  i: "!",
  j: String.raw`\_\|`,
  k: String.raw`\|<`,
  l: "1",
  m: String.raw`\|v\|`,
  n: String.raw`|\\|`,
  o: "0",
  p: String.raw`\|•`,
  q: "(_,)",
  r: String.raw`\|2`,
  s: "5",
  t: "7",
  u: String.raw`\|\_\|`,
  v: String.raw`\\/`,
  w: String.raw`\\/\\/`,
  x: "><",
  y: "`/",
  z: "2",
};

export const strToBinaire = (str: string) => {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(2))
    .join(" ");
};

export const strToZorglang = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
};

export const strToMorse = (str: string) => {
  return str
    .toLowerCase()
    .split("")
    .map((c) => morseCode[c])
    .join(" ");
};

export const strToLeetCode = (str: string) => {
  return str
    .toLowerCase()
    .split("")
    .map((c) => leetCode[c])
    .join("");
};

export const strToLouise = (str: string) => {
  return str
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) + 2))
    .join("");
};

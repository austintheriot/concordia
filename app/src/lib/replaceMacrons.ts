export function replaceMacrons(text: string): string {
  // Mapping of macron characters to their plain equivalents
  const macronMap: { [key: string]: string } = {
    // Lowercase
    ā: 'a',
    ē: 'e',
    ī: 'i',
    ō: 'o',
    ū: 'u',
    ȳ: 'y',

    // Uppercase
    Ā: 'A',
    Ē: 'E',
    Ī: 'I',
    Ō: 'O',
    Ū: 'U',
    Ȳ: 'Y'
  };

  // Replace each macron character with its plain equivalent
  return text.replace(/[āēīōūȳĀĒĪŌŪȲ]/g, (char) => macronMap[char] || char);
}

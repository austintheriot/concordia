export function detectWordUnderPointer(
  e: PointerEvent
): { word: string | null; textNode: Node; offset: number } | null {
  let range: CaretPosition | Range | null = null;
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    if (!range) {
      console.error('No ragne found');
      return null;
    }

    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    // Use WebKit-proprietary fallback method
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (!range) {
      console.error('No ragne found');
      return null;
    }

    textNode = range.startContainer;
    offset = range.startOffset;
  } else {
    if (!range) {
      console.error('Getting text range is not supported');
      return null;
    }
    return null;
  }

  let word: string | null = null;

  // Logging code (uses hidden method to get substring with ^ at offset)
  if (textNode?.nodeType === Node.TEXT_NODE) {
    if (!textNode.textContent) {
      console.error('Text node has no text content');
      return null;
    }
    word = getWordAroundOffset(textNode.textContent, offset);
  }

  return {
    word,
    textNode,
    offset
  };
}

function _replaceMacrons(text: string): string {
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

function getWordAroundOffset(text: string, offset: number): string | null {
  // Handle edge cases
  if (!text || offset < 0 || offset >= text.length) {
    return null;
  }

  if (!isAlpha(text[offset])) {
    return null;
  }

  let start = offset;
  let end = offset;

  // Walk backwards to find start of word
  while (start > 0) {
    if (!isAlpha(text[start - 1])) {
      break;
    }
    start--;
  }

  // Walk forwards to find end of word
  while (end < text.length - 1) {
    if (!isAlpha(text[end + 1])) {
      break;
    }
    end++;
  }

  return text.slice(start, end + 1);
}

// Helper function to check if character is alphabetic
function isAlpha(char: string): boolean {
  return /^[A-Za-zāēīōūȳĀĒĪŌŪȲ]$/.test(char);
}

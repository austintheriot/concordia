import * as fs from "fs";
import * as path from "path";

function writeToFileIfNotPresent(
  outputFilePath: string,
  currentContent: string[],
): void {
  // Check if the file already exists
  if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, currentContent.join("\n"));
    console.log(`Created file: ${outputFilePath}`);
  } else {
    console.log(`Skipped file (already exists): ${outputFilePath}`);
  }
}

function parseAndGenerateFiles(inputFilePath: string, outputDir: string): void {
  // Read the input file
  const fileContent = fs.readFileSync(inputFilePath, "utf-8");

  // Split the content by lines
  const lines = fileContent.split("\n");

  // Initialize variables to store the current word and its content
  let currentWord: string | null = null;
  let currentContent: string[] = [];

  // Iterate through each line
  for (const line of lines) {
    // Check if the line starts with '* ' indicating a new word
    if (line.startsWith("* ")) {
      // If there's a current word, write its content to a file
      if (currentWord) {
        const outputFilePath = path.join(
          outputDir,
          `${currentWord.toLowerCase()}.txt`,
        );
        writeToFileIfNotPresent(outputFilePath, currentContent);
      }

      // Start a new word
      currentWord = line.slice(2).trim();
      currentContent = [];
    } else if (currentWord) {
      // Add the line to the current word's content
      currentContent.push(line);
    }
  }

  // Write the last word's content to a file
  if (currentWord) {
    const outputFilePath = path.join(
      outputDir,
      `${currentWord.toLowerCase()}.txt`,
    );
    writeToFileIfNotPresent(outputFilePath, currentContent);
  }
}

// Directory where the output files will be saved
const outputDir = "./app/static/lemmas/";

const inputFilePaths = [
  "./analysis/1-tria-symbola/lemmas-and-morph-no-unnkowns.txt",
];

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// generate static, fetchable lemmas for text
inputFilePaths.forEach((inputFilePath) => {
  parseAndGenerateFiles(inputFilePath, outputDir);
});

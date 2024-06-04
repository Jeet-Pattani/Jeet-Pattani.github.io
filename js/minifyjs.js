const fs = require('fs');
const readline = require('readline');
const UglifyJS = require('uglify-js');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user to enter the JS filenames
rl.question('Enter the names of the JS files (without extension, separated by commas): ', (input) => {
  // Close the readline interface
  rl.close();

  // Split the input string to get individual JS filenames
  const jsFileNames = input.split(',');

  // Process each JS file
  jsFileNames.forEach((jsFileName) => {
    // Read the JS file
    const jsFilePath = `../js/${jsFileName}.js`;
    fs.readFile(jsFilePath, 'utf-8', (err, js) => {
      if (err) {
        console.error(`Error reading JS file: ${err}`);
        return;
      }

      // Minify the JS
      const minifiedCode = UglifyJS.minify(js).code;

      // Write the minified JS to a new file
      const minifiedFilePath = `../js/${jsFileName}.min.js`;
      fs.writeFile(minifiedFilePath, minifiedCode, (err) => {
        if (err) {
          console.error(`Error writing minified JS file: ${err}`);
          return;
        }

        console.log(`JS minified successfully! Minified file saved as ${minifiedFilePath}`);
      });
    });
  });
});

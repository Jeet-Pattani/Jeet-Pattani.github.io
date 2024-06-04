const fs = require('fs');
const readline = require('readline');
const postcss = require('postcss');
const cssnano = require('cssnano');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user to enter the CSS filenames
rl.question('Enter the names of the CSS files (without extension, separated by commas): ', (input) => {
  // Close the readline interface
  rl.close();

  // Split the input string to get individual CSS filenames
  const cssFileNames = input.split(',');

  // Process each CSS file
  cssFileNames.forEach((cssFileName) => {
    // Read the CSS file
    const cssFilePath = `../css/${cssFileName}.css`;
    fs.readFile(cssFilePath, 'utf-8', (err, css) => {
      if (err) {
        console.error(`Error reading CSS file: ${err}`);
        return;
      }

      // Minify the CSS
      postcss([cssnano])
        .process(css, { from: undefined })
        .then((result) => {
          // Write the minified CSS to a new file
          const minifiedFilePath = `../css/${cssFileName}.min.css`;
          fs.writeFile(minifiedFilePath, result.css, (err) => {
            if (err) {
              console.error(`Error writing minified CSS file: ${err}`);
              return;
            }

            console.log(`CSS minified successfully! Minified file saved as ${minifiedFilePath}`);
          });
        })
        .catch((error) => {
          console.error(`Error minifying CSS: ${error}`);
        });
    });
  });
});
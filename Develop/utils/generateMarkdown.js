const fs = require('fs');
const inquirer = require('inquirer');

let badge = '';
let licenseLink = '';
let licenseSection = '';

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your git hub user name?',
      name: 'name',
    },
    {
      type: 'input',
      message: 'Please enter your e-mail.',
      name: 'email'
    },
    {
      type: 'input',
      message: 'What is the title of your project?',
      name: 'title'
    },
    {
      type: 'input',
      message: 'Please describe your project.',
      name: 'description'
    },
    {
      type: 'input',
      message: 'Explain gow to install your project.',
      name: 'installation'
    },
    {
      type: 'input',
      message: 'How do you use your project.',
      name: 'usage',
    },
    {
      type: 'list',
      message: 'Please select license.',
      name: 'license',
      choices: ['MIT', 'ISC', 'The Unlicense', 'None']

    },
    {
      type: 'input',
      message: 'How can others contribute to your project?',
      name: 'contributing'
    },
    {
      type: 'input',
      message: 'How can others run test on your project?',
      name: 'test'
    },
    {
      type: 'input',
      message: 'How can others submit questions?',
      name: 'questions'
    }
  ])
  .then((answers)=>{
    console.log('got answers');
    console.log(answers.license);
    renderLicenseBadge(answers.license);
    console.log(badge);
    renderLicenseLink(answers.license);
    renderLicenseSection(answers.license);
    fs.writeFile('README.md', generateMarkdown(answers, licenseSection, badge, licenseLink), function (err) {
      if (err) throw err;
      console.log('README created!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
  

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  switch (license){
    case 'MIT':
      badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      break;
    case 'ISC':
      badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
      break;
    case 'The Unlicense':
      badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
      break;
    case 'None':
      badge = '';
      break;
  }
  return badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  switch (license){
    case 'MIT':
      licenseLink = 'https://opensource.org/license/mit/';
      break;
    case 'ISC':
      licenseLink = 'https://opensource.org/license/isc-license-txt/';
      break;
    case 'The Unlicense':
      licenseLink = 'https://unlicense.org/';
      break;
    case 'None':
      licenseLink = '';
      break;
  }
  return licenseLink;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  switch (license){
    case 'MIT':
      licenseSection = mit;
      break;
    case 'ISC':
      licenseSection = isc;
      break;
    case 'The Unlicense':
      licenseSection = unlicense;
      break;
    case 'None':
      licenseSection = ''
      break;
  }
  return licenseSection;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, licenseSection, badge, licenseLink) {
  return `# ${data.title}
## Description
${data.description}
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#How-to-Contribute)
- [Test](#test)
## Installation
${data.installation}
## Usage
${data.usage}
## License
Copyright (c) ${new Date().getFullYear()}, ${data.name}
${licenseSection}\n
${badge}\n
${licenseLink}
## How-to-Contribute
${data.contributing}
## Tests
${data.test}
## How to submit questions.
https://github.com/${data.name}\n
${data.email}\n
${data.questions},
`;
}

module.exports = generateMarkdown;

const mit = `The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

const isc = `The ISC License

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`

const unlicense = `The Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.`

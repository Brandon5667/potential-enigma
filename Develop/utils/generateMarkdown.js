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
  return `
`;
}

module.exports = generateMarkdown;


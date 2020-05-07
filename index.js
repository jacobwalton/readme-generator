const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const dotenv = require("dotenv");

const writeFileAsync = util.promisify(fs.writeFile);
//ask for user inputs
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },
    {
      type: "input",
      message: "What the title of your project?",
      name: "title",
    },
    {
      type: "input",
      message: "Give a short description of your project",
      name: "desc",
    },
    {
      type: "input",
      message: "How will the user install your project",
      name: "install",
    },
    {
      type: "input",
      message: "Provide usage information",
      name: "usage",
    },
    {
      type: "input",
      message: "Provide the licensing info for your project",
      name: "license",
    },
    {
    type: "input",
    message: "Provide names of all contributors (separated by commas)",
    name: "contributors",
      },
    {
      type: "input",
      message: "How will the user run a test",
      name: "test",
    },
    {
      type: "input",
      message: "What is your GitHub email address",
      name: "email",
    },
  ]);
}
function generateReadme(res) {
  return `
# ${res.title}
![Languages badge](https://img.shields.io/github/languages/count/${res.username}/${res.title.split(" ").join("-").toLowerCase()})
## Description:
${res.desc}\n

# Table of Contents:
* [Installation ](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Questions](#questions)
----

## Installation
${res.install}


## Usage
${res.usage}\n


## License
${res.license}\n


## Contributors
${res.contributors}\n


## Test
Test by running the following command:
${res.test}\n


## Questions

If you have any questions you can contact me at ${res.email}.
`
}

promptUser()
  .then(function (res) {
    const readme = generateReadme(res);

    return writeFileAsync("README.md", readme);
  })
  .then(function () {
    console.log("Successfully generated your README file!");
  })
  .catch(function (err) {
    console.log(err);
  });
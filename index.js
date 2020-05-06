const fs = require('fs');
const inquirer = require('inquirer');
const util = require ('util');
const dotenv = require ('dotenv');

const writeFileAsync=util.promisify(fs.writeFile)
//ask for user inputs
function promptUser() {
    return inquirer.prompt([
{
    type:'input',
    message: 'What the title of your project?',
    name: 'title',
},
{
    type:'input',
    message:'BADGE INFO HERE',
    name:'badge',
},
{
    type:'input',
    message:'Give a short description of your project',
    name:'desc',
},
{
    type:'input',
    message:'Provide a table of contents',
    name:'tableOfContents',
},
{
    type:'input',
    message:'How will the user install your project',
    name:'install',
},
{
    type:'input',
    message:'Provide usage information',
    name:'usage',
},
{
    type:'input',
    message:'Provide the licensing info for your project',
    name:'license',
},
{
    type:'input',
    message:'How will the user run a test',
    name:'test',
},
{
    type:'input',
    message:'QUESTIONS HEADER',
    name:'questions',
},
{
    type:'input',
    message:'What is your GitHub email address',
    name:'email',
}
]);
}
function generateReadme(res){
return `
#${res.title}
RESEARCH & INSERT BADGE STUFF HERE ---------------------------
#Description:
${res.desc}\n
#Table of Contents
INSERT LINKS FOR TOC\n
#Installation
Install by running the following command:
${res.install}\n
#Usage

#License

#Contributors

#Test
Test by running the following command:
${res.test}\n
#Questions
PROFILE PIC HERE
If you have any questions you can contact me at ${res.email}
`

};


promptUser()
  .then(function(res) {
    const readme = generateReadme(res);

    return writeFileAsync("README.md", readme);
  })
  .then(function() {
    console.log("Successfully generated README file");
  })
  .catch(function(err) {
    console.log(err);
  });

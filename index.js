// installing packages for use
const inquirer = require("inquirer");
const fs = require("fs");

// list of question about image for user
let questions = 
[
    {type: "input", message: "Provide the three letters you would like in the image", name: "letters", default: "img"},
    {type: "input", message: "Provide a text color in either words or 6 digit hexadecimal format", name: "textColor", default: "red"},
    {type: "list", message: "Pick the shape you desire", choices: ["Circle", "Square", "Triangle"], name:"shape"},
    {type: "input", message:"Provide a shape color in either words or 6 digit hexadecimal format", name: "shapeColor"}
];

inquirer.prompt(questions)
.then((response) => {
    // if the choosen letters are not 3 show error message
    if(response.letters.length !== 3){
        console.info("\nThe letters you have chosen are longer than 3 characters, it has been changed to (img) for you.\n");
    } 
    // if the user gave a hexadeimal that is not the right format show error
    if(!/^#[0-9A-F]{6}$/i.test(response.textColor)){
        console.info("\nThe text color hexadecimal you have entered is not valid. It has been changed to RED for you.\n")
    }
    if (response.testColor !== "red") {
        
    }
})
// installing packages for use
const inquirer = require("inquirer");
const createSVG = require("./lib/shapes");

// list of question about image for user
let questions = 
[
    {type: "input", message: "Provide the three letters you would like in the image", name: "letters"},
    {type: "input", message: "Provide a text color in either words ex:[white, black, pink, purple, green] or 6 digit hexcode format", name: "lettersColor"},
    {type: "list", message: "Pick the shape you desire", choices: ["Circle", "Square", "Triangle"], name:"shape"},
    {type: "input", message:"Provide a shape color in either words or 6 digit hexcode format", name: "shapeColor"},
];

inquirer.prompt(questions)
.then((response) => {

    let shape;
    let svg;

    // based on the choosen shape set new instance with the given shape color
    if(response.shape == "Circle"){shape = new createSVG.Circle(response.shapeColor);}
    if(response.shape == "Square"){shape = new createSVG.Square(response.shapeColor);}
    if(response.shape == "Triangle"){shape = new createSVG.Triangle(response.shapeColor);}

    // call the SVG class and create instance from the data given and the shape instance created with the shape color
    svg = new createSVG.SVG(response.letters, response.lettersColor, shape)

    // return the svg
    return svg;
}).then(svg => {
    // call the write to file function to setup the shape
    svg.writeToFile();
    // write to console
    console.log("Generated logo.svg");
})
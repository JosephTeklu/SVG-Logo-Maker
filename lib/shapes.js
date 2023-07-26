// fs to write to file of svg
const fs = require('fs');
// array of avaliable colors
const allowedColors = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua', 'pink'];

class Shape{
    // the constructor calls the setColot() function to make sure the user's given color is correct
    constructor(color){
        this.setColor(color);
    }
    setColor(color){

        // if the color is undefined set to undefined
        // else make sure the color given is a string and a string with either a hexcode or a color from the allowed colors array 
        if(typeof color === 'undefined'){
            this.color = undefined;
            return;
        }else if(typeof color !== 'string'){
            throw new Error('color must be type string');
        }
        else if(!/^#[0-9A-F]{6}$/i.test(color) && (!allowedColors.includes(color.toLowerCase()))){
            throw new Error("the color must be given in string or hexcode form");
        }

        // set color
        this.color = color;
    }
    getColor(){
        // check if the given color is incorrect and throw error if so, then return the color 
        if(!this.color) throw new Error("color is incorrect");
        return this.color;
    }
}

// Square, Circle, and Triangle classes that inherit the Shape class
// the constructor set's the color and the render function makes the class's shape by grabbing the color from the parent shape class
class Circle extends Shape{
    constructor(color){super(color);}
    render(){return `<circle cx="150" cy="100" r="100" style="fill:${this.getColor()}"/>`;}
}
class Square extends Shape{
    constructor(color){super(color);}
    render(){return `<rect x="50" y="0" width="200" height="200" style="fill:${this.getColor()}"/>`;}
}
class Triangle extends Shape{
    constructor(color){super(color);}
    render(){return `<polygon points="0,200 300,200 150,0" style="fill:${this.getColor()}"/>`;}
}

class SVG{
    // the constructor checks for erros then assigns each paramater
    constructor(letters, lettersColor, shape){
        // make sure that the letters, and letters color, are in string format if not throw error
        // check that shape param is an instance of shape class
        // check if the provided letters are longer than 3 characters if not throw error
        // make sure the color given is a string and a string with either a hexcode or a color from the allowed colors array 
        if(typeof letters !== 'string' || typeof lettersColor !== 'string') throw new Error("your responses must be a string");
        else if(!(shape instanceof Shape)) throw new Error("error with shape");
        else if(letters.length > 3) throw new Error("your responses must be a string");
        else if(!/^#[0-9A-F]{6}$/i.test(lettersColor) && (!allowedColors.includes(lettersColor.toLowerCase()))){
            throw new Error("the letter of the colors must be given in string or hexcode form");
        }
        else{
            // set up paramaters if all checks pass and set filename to be "logo.svg"
            this.letters = letters;
            this.lettersColor = lettersColor;
            this.shape = shape;
            this.fileName = "logo.svg";
        }
    }

    // returns the valid paramaters for svg
    getShapeData(){return {letters: this.letters, lettersColor: this.lettersColor, shape: this.shape, fileName: this.fileName};}
    
    render(){
        // return the svg with all of the passed values
        return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${this.getShapeData().shape.render()}
            <text>
                <tspan 
                    x="150"
                    y="105"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    style="fill:${this.lettersColor}; font-size: 70px; font-family: sans-serif">
                    ${this.letters}
                </tspan>
            </text>
        </svg>`
    }

    writeToFile(){
         fs.writeFile(`./logo.svg`,this.render(),'utf-8',(err) => {
            //  throw error if necessary
            if(err){
                console.error(err.message);
                console.error(`An error occured writing to logo.svg`);
            }
        });
    }
}

// export the choosen file
module.exports = {SVG, Square, Circle, Triangle}
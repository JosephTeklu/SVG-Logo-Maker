const {SVG, Square, Circle, Triangle} = require('../lib/shapes.js');

describe('Shapes', () => {
    // test for the constructor of the shapes class and color validation
    describe('constructer', () => {

        it('throw an error if given color is not a string', () => {
            expect(() => new Circle(1)).toThrowError(new Error('color must be type string'))
            expect(() => new Triangle(1)).toThrowError(new Error('color must be type string'))
            expect(() => new Square(1)).toThrowError(new Error('color must be type string'))
        });

        it('throw an error if given an invalid hexcode or color not in allowedColors array', () => {
            expect(() => new Circle('#wrong')).toThrowError(new Error("the color must be given in string or hexcode form"))
            expect(() => new Triangle('#wrong')).toThrowError(new Error("the color must be given in string or hexcode form"))
            expect(() => new Square('#wrong')).toThrowError(new Error("the color must be given in string or hexcode form"))
        });

        it('should throw an error if it does not contain all valid data passed to it', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.color).toEqual('black');
            expect(triangle.color).toEqual('green');
            expect(square.color).toEqual('blue');
        });
    });

    describe('getColor', () => {
        it('throw an error if the color is undefined', () => {
            circle = new Circle();
            triangle = new Triangle();
            square = new Square();
            expect(() => circle.getColor()).toThrowError(new Error('color is incorrect'));
            expect(() => triangle.getColor()).toThrowError(new Error('color is incorrect'));
            expect(() => square.getColor()).toThrowError(new Error("color is incorrect"));
        })
        it('return the color passed to it', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.getColor()).toEqual('black');
            expect(triangle.getColor()).toEqual('green');
            expect(square.getColor()).toEqual('blue');
        })
    })

    describe('render', () => {
        it('should return an SVG element containing all passed valid data', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.render()).toEqual('<circle cx="150" cy="100" r="100" style="fill:black"/>');
            expect(triangle.render()).toEqual('<polygon points="0,200 300,200 150,0" style="fill:green"/>');
            expect(square.render()).toEqual('<rect x="50" y="0" width="200" height="200" style="fill:blue"/>');
        });
    });
});

describe('SVG', () => {
    // all test for the constructor of the SVG class
    describe('constructer', () => {

        it('throw an error if any given input is not the correct type', () => {
            shape = new Circle('black');
            expect(() => new SVG(1, 'white', shape)).toThrowError(new Error("your responses must be a string"));
            expect(() => new SVG('SVG', 1, shape,)).toThrowError(new Error("your responses must be a string"));
            expect(() => new SVG('SVG', 'white', 1)).toThrowError(new Error("error with shape"));
        })
        it('throw an error if given more than 3 letters', () => {
            shape = new Circle('black')
            expect(() => new SVG('1234','white', shape,)).toThrowError(new Error("your responses must be a string"));
        });
        it('throw an error if given an incorrect hexcode orcolor is not in the allowedColors array', () => {
            shape = new Circle('black')
            expect(() => new SVG('SVG', '#wrong', shape)).toThrowError(new Error("the letter of the colors must be given in string or hexcode form"));
        });
        it('throw an error if it does not contain all valid data passed to it', () => {
            shape = new Circle('black');
            let mySVG = new SVG('SVG', '#FFFFFF', shape, "logo.svg");
            expect(mySVG.getShapeData()).toEqual({letters: 'SVG', lettersColor: '#FFFFFF', shape: shape, fileName: "logo.svg"});
        });
    });


    describe('render', () => {
        it('throw an error if it does not return an SVG containing all given data', () => {
            shape = new Circle('black');
            let mySVG = new SVG('SVG', 'white', shape);
            rawSVG =`
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${mySVG.getShapeData()['shape'].render()}
            <text>
                <tspan 
                    x="150"
                    y="155"
                    text-anchor="middle"
                    alignment-baseline="middle"
                    style="fill:${mySVG.getShapeData()['lettersColor']}; font-size: 70px; font-family: sans-serif">
                    ${mySVG.getShapeData()['letters']}
                </tspan>
            </text>
        </svg>`
            expect(mySVG.render()).toEqual(rawSVG);
        });
    });
});
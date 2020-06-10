const parse = require('mrz').parse;


const extractMrzCode = (description) => {
    const start = description.indexOf("P<");
    let mrz = description.slice(start).trim().replace("\n", ":");

    const indexOfSpace = mrz.indexOf(" ");
    let s1 = mrz.slice(0, indexOfSpace)
    let s2 = mrz.slice(indexOfSpace);
    return `${s1}\n${s2}`;
};


const runner = (mrzCode) => {
    let [firstLine, secondLine] = mrzCode.split(":");

    // this should be avoided at all cost, this is just a weird trick
    if(secondLine.length === 45){
        const remove = secondLine.lastIndexOf("<");
        secondLine = secondLine.slice(0, remove) + secondLine.slice(remove+1);

    }
    // firstLine = firstLine.replace(/ /, "")
    // secondLine = secondLine.replace(/ /, "");

    console.log(firstLine,"\n", secondLine)
    let result = parse([firstLine, secondLine]);
    return {...result, firstLine, secondLine};
}


const mrz = {extractMrzCode, runner};

module.exports = mrz;
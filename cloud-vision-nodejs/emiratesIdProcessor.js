const parse = require("mrz").parse;

// const parse = require('mrz').parse;

// let mrz = [
//   'I<UTOD23145890<1233<<<<<<<<<<<',
//   '7408122F1204159UTO<<<<<<<<<<<6',
//   'ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
// ];

// var result = parse(mrz);
// console.log(result);
module.exports = emiratesProcessor = (res, description, initiatePostTimeout) => {
  try {
    let lines;
    const pattern = /[A-Z]{1}<{1}/;
    const startIndex = description.match(pattern).index;
    const untrimmedCode = description
      .slice(startIndex)
      .trim()
      .replace(/\s/g, "");

    let mrzCode = untrimmedCode
      .replace(/«/g, "<<")
      .replace(/く/g, "<")
      .replace(/>/g, "<");

    if (mrzCode.length === 90) {
      lines = mrzCode.match(/.{1,30}/g);
    }
    var result = parse(lines);

    console.log(result);
    return res.status(200).send(result);
  } catch (e) {
    res.status(400).send({error: "An error occured"})
  }
};

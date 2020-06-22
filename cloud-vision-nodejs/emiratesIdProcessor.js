const parse = require("mrz").parse;

module.exports = emiratesProcessor = (res, description, initiatePostTimeout) => {
  try {
    let lines;
    const pattern = /[A-Z]{2}ARE/;
    const startIndex = description.match(pattern).index;
    const untrimmedCode = description
      .slice(startIndex)
      .trim()
      .replace(/\s/g, "");

    let mrzCode = untrimmedCode
      .replace(/«/g, "<<")
      .replace(/く/g, "<")
      .replace(/>/g, "<");

    lines = mrzCode.match(/.{1,30}/g);
    console.log(mrzCode.length, lines, mrzCode);
    var result = parse(lines.slice(0, 3));
    return res.status(200).send(result);
  } catch (e) {
    res.status(400).send({error: e.message})
  }
};

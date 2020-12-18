const parse = require('mrz').parse;




const parsedDocumentsChecksumDigitsCheck = (parsedDocument) => {
    const details = parsedDocument.details;
    for(let detail of details) {
        if(detail.field === 'documentNumberCheckDigit' && !detail.valid) {
            return false;
        }
    }

    return true;
}

const extractMrzCode = (description, res) => {
  const start = description.indexOf("P<");
  let untrimmedCode = description.slice(start).trim().replace(/\s/g, "");
  let mrzCode = untrimmedCode
    .replace(/«/g, "<<")
    .replace(/く/g, "<")
    .replace(/>/g, "<");

  console.log({ untrimmedCode }, { mrzCode });
  if (mrzCode.length > 88) {
    mrzCode = mrzCode.slice(0, 88);
  }

  return mrzCode;
};


const runner = (mrzCode, initiatePostTimeout) => {
    let lines = [];

    if(initiatePostTimeout==false && mrzCode.length >=86) {
        console.log("in post timeout");
        while(mrzCode.length < 88) {
            console.log("appending <")
            mrzCode+="<";
        }
    }

    console.log({mrzCode})
    if(mrzCode.length === 88) {
        lines = mrzCode.match(/.{1,44}/g)
    }else if(mrzCode.length === 90) {
        lines = mrzCode.match(/.{1, 30}/g)
    }else{
        throw new Error("Lines dont match the required length");
    }

    let result = parse(lines);
    return result;
}


const mrz = {extractMrzCode, runner, parsedDocumentsChecksumDigitsCheck};

module.exports = mrz;
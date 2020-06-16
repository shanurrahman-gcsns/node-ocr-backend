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


const testForErrors = (mrzCode, res) => {
    if(!mrzCode.startsWith("P<")) {
        throw new Error("Doesnot start with valid symbol");
    }
    // if(!mrzCode.slice(0, 44).match(/P<[A-Za-z]+<<([A-Za-z]+[<])*[A-Z]*/g)) {
    //     throw new Error("Doesnot match pattern for line 1");
    // }
}


const extractMrzCode = (description, res) => {
    const start = description.indexOf("P<");
    let mrzCode = description.slice(start).trim().replace(/\s/g, "");

    console.log(mrzCode)
    testForErrors(mrzCode, res);

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

    console.log("mrzCode length", mrzCode.length)
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
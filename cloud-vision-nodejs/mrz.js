const parse = require('mrz').parse;



const testForErrors = (mrzCode, res) => {
    if(!mrzCode.startsWith("P<")) {
        throw new Error("Doesnot start with valid symbol");
    }
    if(!mrzCode.slice(0, 44).match(/<<[A-Z]+/g)) {
        throw new Error("Doesnot match pattern for line 1");
    }
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

    if(initiatePostTimeout && mrzCode.length >=86) {
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
    }

    let result = parse(lines);
    return result;
}


const mrz = {extractMrzCode, runner};

module.exports = mrz;
const { parse } = require("mrz");

const replaceSimilar = (parsedValue, dictionary) => {
    parsedValue.details.forEach(detail=>{
        if(dictionary[detail.value]) {
            // we are only interested in replacing lastname if it is greater than something
            if (
              !detail.value ||
              dictionary.value ||
              !detail.field === "lastName"
            ) {
              return;
            } else if (
              detail.value.trim().length <
              dictionary[detail.value].trim().length
            ) {
              detail.value = dictionary[detail.value];
              detail.value.replace(parsedValue.fields.firstname)
            }
        }
    })


    return parsedValue;
}



module.exports = replaceSimilar;
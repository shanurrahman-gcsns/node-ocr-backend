const replaceSimilar = (parsedValue, dictionary) => {
    parsedValue.details.forEach(detail=>{
        if(dictionary[detail.value]) {
            detail.value = dictionary[detail.value];
        }
    })


    return parsedValue;
}



module.exports = replaceSimilar;
const replaceSimilar = (parsedValue, dictionary) => {
    parsedValue.details.forEach(detail=>{
        if(dictionary[detail.value]) {
            if(!detail.value || dictionary.value) {
                return
            }
            if(detail.value.trim().length> dictionary[detail.value].trim().length){
                detail.value = dictionary[detail.value];
            }
        }
    })


    return parsedValue;
}



module.exports = replaceSimilar;
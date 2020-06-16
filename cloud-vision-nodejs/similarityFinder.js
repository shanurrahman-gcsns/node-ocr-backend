const stringSimilarity = require('string-similarity');
const fs = require('fs');

const findSimilarity = (extractedDocs, fulltext) => {
    const bag = fulltext.split("\n");
    const indexofmrz = fulltext.indexOf("P<");

    // we dont want to read anything from machine readable zone now, that infomation is present in extracted documents
    fulltext = fulltext.slice(0, indexofmrz);

    const dict = {};

    extractedDocs = extractedDocs.details.map(detail=>detail.value);// this will give us plain words which we will match
    // with bag of words
    extractedDocs.forEach(document=>{
        if(!document)
            return;
        const simi = stringSimilarity.findBestMatch(document, bag);


        if(simi.bestMatch.rating > 0.7) {
            dict[document] = simi.bestMatch.target;
        }
    })


    // fs.writeFileSync('similar.json', JSON.stringify(dict));

    return dict;

}


module.exports = findSimilarity;
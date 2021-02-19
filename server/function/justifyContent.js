
function justifyContent(text) {
    const nbrRound = Math.round(text.length / 80);
    let newText = '';

    for (let i = 0; i < nbrRound; i++) {
        // Verifying if lastline to not add unnecessary new line
        if ((i + 1) === nbrRound) {
            let tmpTxt = text.slice(0, 80);
            newText += tmpTxt;
        } else {
            let tmpTxt = text.slice(0, 80);
            text = text.slice(80);
            newText += tmpTxt + '\n';
        };
    };

    alignContent(newText)

    return newText;
};

// Align Content if line starts or ends with
// a whitespace
function alignContent (text) {
    let arrAllLines = text.split(/\n/);

    console.log(arrAllLines)
};

module.exports = justifyContent;

function justifyContent(text) {
    const nbrRound = Math.ceil(text.length / 80);
    let newText = '';

    // Removing extra whitespace
    text = text.replace(/\s\s+/g, ' ');

    for (let i = 0; i < nbrRound; i++) {
        // Verifying if it's lastline to not add unnecessary new line
        if ((i + 1) === nbrRound) {
            let tmpTxt = text.slice(0, 80);
            newText += tmpTxt.trim();
        } else {
            let tmpTxt = text.slice(0, 80);
            text = text.slice(80);

            if (tmpTxt.startsWith(' ') || tmpTxt.endsWith(' ')) {        
                const missingChar = tmpTxt.length - tmpTxt.trim().length;
                if (missingChar === 2) {
                    newText += tmpTxt.trim() + ' ' + text.slice(0, 1) + '\n';
                    text = text.slice(1);
                };
                if (missingChar === 1) {
                    let tmpArr = tmpTxt.trim().split(' ');
                    tmpArr[0] += ' ';
                    newText += tmpArr.join(' ') + '\n';
                };
            } else {
                newText += tmpTxt + '\n';
            };
        };
    };

    return newText;
};

module.exports = justifyContent;
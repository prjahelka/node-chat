var isRealString = (theStr) => {
    return typeof theStr === 'string' && theStr.trim().length > 0;
}

module.exports = {
    isRealString
}
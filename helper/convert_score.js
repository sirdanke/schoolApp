
function convert_score(score) {
    if(score == null) {
        return 'empty'
    } else  if(score > 85) {
        return 'A'
    } else if(score > 70) {
        return 'B'
    } else if(score > 55) {
        return 'C'
    } else {
        return 'D'
    }
}

module.exports = convert_score
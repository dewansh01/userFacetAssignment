function similarity(uarr1, uarr2) {
    let score = 0;
    let arr1 = Object.values(uarr1);
    let arr2 = Object.values(uarr2);
    for (let i = 1; i < 10; i++) {
        score += Math.abs(arr1[i] - arr2[i]);
    }
    return score;
}

function getSimilarity(user_data) {
    let user_array = Object.values(user_data);
    let similarityScore = {};
    var len = Object.keys(user_data).length;
    for (let i = 0; i < len; i++) {
        similarityScore[user_array[i].name] = [];
        for (let j = 0; j < len; j++) {
            if(i!=j){
                let score = similarity(user_array[i].data, user_array[j].data);
            similarityScore[user_array[i].name].push({ user: user_array[j].name, score: score });
            }
        }
    }
    return similarityScore;
}

    module.exports = {
        getSimilarity: getSimilarity
      };
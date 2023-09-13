function similarity(uarr1, uarr2) {
    let score = 0;
    let arr1 = Object.values(uarr1);
    let arr2 = Object.values(uarr2);
    for (let i = 1; i < 20; i++) {
        if (arr1[i] == arr2[i]) {
            score++;
        }
    }
    return (score/20)*100;
}

function getSimilarity(user_data) {
    let user_array = Object.values(user_data);
    let similarityScore = {};
    var len = Object.keys(user_data).length;
    for (let i = 0; i < len; i++) {
        similarityScore[user_array[i].name] = [];
        for (let j = 0; j < len; j++) {
            if (i != j) {
                let score = similarity(user_array[i].data, user_array[j].data);
                similarityScore[user_array[i].name].push({ user: user_array[j].name, score: score });
            }
        }
    }
    return similarityScore;
}

function getSimilarityWithFilter(user_data, candidate) {
    let allResponse = getSimilarity(user_data);
    let response = allResponse[candidate];
    return response;
}

function getSimilarityBySearch(user_data, search) {
    let allResponse = getSimilarity(user_data);
    let response = {};
    for (let i = 0; i < Object.keys(allResponse).length; i++) {
        if (Object.keys(allResponse)[i].includes(search)) {
            response[Object.keys(allResponse)[i]] = allResponse[Object.keys(allResponse)[i]];
        }
    } 
    //filter objects in value array also
    for (let i = 0; i < Object.keys(response).length; i++) {
        let arr = response[Object.keys(response)[i]];
        let temp = [];
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].user.includes(search)) {
                temp.push(arr[j]);
            }
        }
        response[Object.keys(response)[i]] = temp;
    }
    return response;
}



module.exports = {
    getSimilarity: getSimilarity,
    getSimilarityWithFilter: getSimilarityWithFilter,
    getSimilarityBySearch: getSimilarityBySearch
};
window.onload = function () {
    function getWordCounts(nodeList) {
        var wordCount = 0;
        if (nodeList != null) {
            for (var i = 0; i < nodeList.length; i++) {
                wordCount += nodeList[i].textContent.split(' ').length;
            }
            return wordCount;
        } else return 0;
    }
    document.querySelector('span_wc').innerHTML = getWordCounts(document.querySelectorAll('p')) + getWordCounts(document.querySelectorAll('li'));
}

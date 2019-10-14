function getData(data, webId) {
    let infoNumber = 1
    let hotTitle = data.map(el => {
        let hot = {
            webId,
            infoNumber,
            infoContent: el.infoContent,
            infoURL: el.infoURL,
        }
        infoNumber++
        return hot
    });

    return hotTitle;
}

module.exports = getData
const { default: Switch } = require("react-bootstrap/esm/Switch");
const { time } = require("uniqid");

module.exports = {
    sortData: function sortData(data, type) {
        let userVisitData = {};
        let visitLength = {};

        switch (type) {
            case 'userVisit':
                var urls = [...new Set(data.userVisitData.map(item => item.url))] // Get unqiue links
                let count = [] 
                for (let i = 0; i < urls.length; i++) { // For each unique link -> 
                    let found = data.userVisitData.filter((obj) => obj.url === urls[i]).length; // Find how many of the unique urls we have
                    count = [...count, {url: urls[i], count: found}] // Update count
                }      

                userVisitData.urls = count
                break
            case 'visitLength':
                var urls = [...new Set(data.visitLengthData.map(item => item.url))] // Get unqiue links
                let times = []
                let newUrls = []
                for (let i = 0; i < urls.length; i++) {
                    let found = data.visitLengthData.filter((obj) => {
                        if (obj.url === urls[i]) {        
                            newUrls.push(obj.url)
                            times.push(obj.visitLength)
                        }
                    })
                }
                visitLength = {urls: newUrls, times: times}
                break

        } 

        return {userVisitData, visitLength}

    }
}
module.exports = {
    sortData: function sortData(data) {
        let userVisitData = {};
        let visitLength;

        if (data.userVisitData) {
            const urls = [...new Set(data.userVisitData.map(item => item.url))] // Get unqiue links
            let count = [] 
            for (let i = 0; i < urls.length; i++) { // For each unique link -> 
                let found = data.userVisitData.filter((obj) => obj.url === urls[i]).length; // Find how many of the unique urls we have
                count = [...count, {url: urls[i], count: found}] // Update count
            }      

            userVisitData.urls = count
        }

        return {userVisitData, visitLength}

    }
}
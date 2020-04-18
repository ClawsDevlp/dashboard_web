import axios from 'axios'
import sortkeys from 'sort-keys'

export default {
    getTreesFromApi: () => async (state, actions) => {
        console.log("getTreesFromApi function")
        const request = await axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&facet=genre&facet=espece&facet=dateplantation&rows=182')
        .then(response => {
            return response.data.records
        })
            .catch(error => { console.log(error) })

            const newState = actions.setTreeArray(request)
            actions.updateBarChart(newState)
            actions.updateLineChart(newState)
            
            return newState
    },

    setTreeArray: rawtrees => (state, actions) => {
        const onlyFields = rawtrees.map(x => x.fields)
        
        const district = actions.setTreeByDistrictArray(onlyFields)
        const year = actions.setTreeByYearArray(onlyFields)
        //console.log(onlyFields)

        return {...state, trees: onlyFields, districtData: district, yearData: year}
    },

    setTreeByDistrictArray: (trees) => state => {
        const treesByDistrict = trees.map(x => x.arrondissement)

        // Get occurences of trees by district
        const occTreesByDistrict = treesByDistrict.reduce(function(obj, item) {
            obj[item] = (obj[item] || 0) + 1
            return obj
        }, {})

        return {
            distictName: Object.keys(occTreesByDistrict),
            nbTrees:  Object.values(occTreesByDistrict)
        }
    },

    setTreeByYearArray: (trees) => state => {
        const treesByYear = trees.map(x => x.dateplantation)

        // Get occurences of trees by year
        const occTreesByYear = treesByYear.reduce(function(obj, item) {
            obj[item] = (obj[item] || 0) + 1
            return obj
        }, {}) 
        
        // Sort data and delete 1602
        const occSort = sortkeys(occTreesByYear)
        delete occSort["1602-01-01T00:09:21+00:00"]

        return {
            yearDate: Object.keys(occSort),
            nbTrees:  Object.values(occSort)
        }
    },

    saveBarChart: (c) => state => {
        return {...state, barChart: c}
    },

    saveLineChart: (c) => state => {
        return {...state, lineChart: c}
    },

    updateLineChart: (newState) => state => {
        // Shaping data
        newState.yearData.nbTrees.forEach(sumNbTrees)  // Sum trees over years
        function sumNbTrees(item, index, arr) {
            if(index != 0) {
                arr[index] += arr[index - 1]
            }
        }

        newState.yearData.yearDate.forEach(getYearDate) // Get only year data
        function getYearDate(item, index, arr) {
            arr[index] = parseInt(arr[index])
        }
        
        state.lineChart.data.labels = newState.yearData.yearDate
        state.lineChart.data.datasets[0].data = newState.yearData.nbTrees
        state.lineChart.update({duration: 800})
        return {}
    },

    updateBarChart: (newState) => state => {
        state.barChart.data.labels = newState.districtData.distictName
        state.barChart.data.datasets[0].data = newState.districtData.nbTrees
        state.barChart.update({duration: 800})
        return {}
    }
}

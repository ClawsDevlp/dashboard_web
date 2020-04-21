import axios from 'axios'
import sortkeys from 'sort-keys'

export default {
  
    getTreesFromApi: () => async (state, actions) => {
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

    // Calculate the age of the tree according to the current date 
    calculateAge: (dateplantation) => {
        const ageDifNow = Date.now() - dateplantation
        const ageDate = new Date(ageDifNow) 
        return Math.abs(ageDate.getUTCFullYear() - 1970) 
    },
    
    // Function to store the data in the state
    setTreeArray: rawtrees => (state, actions) => {

        const onlyFields = rawtrees.map(x => x.fields)
        const recap = actions.setRecapArray(onlyFields)
        
        // add an age section for each tree
        onlyFields.forEach(
            (element) => {
                element.age = actions.calculateAge(new Date(element.dateplantation).getTime())}
        )

        const species = actions.setTreeBySpeciesArray(onlyFields)
        const district = actions.setTreeByDistrictArray(onlyFields)
        const year = actions.setTreeByYearArray(onlyFields)
     
        console.log("setTreeArray function")
        return {...state, trees: onlyFields,  recapArray: recap, speciesNumber: species, districtData: district, yearData: year }
    },

    // Function to set the organise array for the recap array section
    setRecapArray : (tree) => () => {
        const recap = tree.map( newArray =>({
            species: newArray.espece,
            genre: newArray.genre,
            adress: newArray.adresse,
            district: newArray.arrondissement, 
            circumference: newArray.circonferenceencm,
            height: newArray.hauteurenm,
            date: newArray.dateplantation.slice(0, 4) // We decided that only the year of plantation was relevant
        }))
        return recap
    },
    // Function that reorganises the recap array with increasing numbers (circumference, height, year of plantation)
    organiseByNumber: (category) => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a[category] - b[category]);
        return {...state, recapArray: sortedRecapArray}
    },
    // Function that reorganises the recap array depending of the alphabetical order of a category (adress, species, district)
    organiseByString: (category) => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a[category].localeCompare(b[category]));
        return {...state, recapArray: sortedRecapArray}
    },
    
    setTreeBySpeciesArray: trees => state => {
        const speciesName = trees.map(x => x.espece)

        // count the number of trees for each species
        const speciesCount = speciesName.reduce((obj, value) => {
            obj[value] = (obj[value] || 0) + 1
            return obj
        }, {})

        var speciesSort = []
        // enter my data found in a table
        for(var species in speciesCount)
        {
            speciesSort.push([species, speciesCount[species]])
        }

        // sort the species by the number of trees in descending order
        speciesSort.sort((a,b) => b[1] - a[1])
        

        return speciesSort
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
        
        // Sort data and delete year 1602
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
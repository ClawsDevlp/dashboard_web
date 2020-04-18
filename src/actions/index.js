import axios from 'axios'
import sortkeys from 'sort-keys'

export default {
    /* increment: () => state => {
        console.log(state)
        return { ...state, count: state.count + 1 } // on retourne le nouveau state avec notre compteur mis à jour
    }, */
    /* decrement: () => state => {
        console.log(state)
        return { ...state, count: state.count - 1 }
    }, */

    /* setIp: ip => state => {
        return { ...state, ip: ip } // on retourne le nouveau state en modifiant l'adresse ip dans notre state
    }, */

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
    /*
    getLocationTreeDataFromApi: ({count, callBack}) => (state, actions) => {
        const request = axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&facet=arrondissement&rows=' + (count || 10))
        request
            .then(response => {
                // je calcul mon nouveau state via l'action parseEspaceVertsData qui soccupe de faire mon tri sur les données reçus
                const newState = actions.parseLocationTreeData(response.data.records)
                // une fois le state calculé, j'appel mon fonction de callback avec mes nouvelles données
                if ( callBack !== undefined) { callBack(newState.espacesVertsData.categories, newState.espacesVertsData.categoriesCount) }
                return newState // enfin je retourne le state car c'est le but de toute action (retrouver le nouveau state)
            })
            .catch(error => { console.log(error) })
    },
    parseEspaceVertsData: list => state => {
        const locations = list.map( x => x.fields.arrondissement) // on récupère uniquement la catégorie de chaque espace vert
        // à l'aide de la fonction reduce (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce)
        // je compte le nombre d'éléments dans chaque catégories
        const locationsCount = locations.reduce((obj, value) => {
            obj[value] = (obj[value] || 0) + 1
            return obj
        }, {})
        return {
            ...state,
            locationData: {
                locations: Object.keys(locationssCount), // je récupère un tableau représentant les categories
                locationsCount:  Object.values(locationsCount) // et le nombre d'element dans chaque categories
            }
        }

    getEspaceVertsDataFromApi: ({count, callBack}) => (state, actions) => {
        const request = axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=espaces_verts&facet=categorie&rows=' + (count || 10))
        request
            .then(response => {
                // je calcul mon nouveau state via l'action parseEspaceVertsData qui soccupe de faire mon tri sur les données reçus
                const newState = actions.parseEspaceVertsData(response.data.records)
                // une fois le state calculé, j'appel mon fonction de callback avec mes nouvelles données
                if ( callBack !== undefined) { callBack(newState.espacesVertsData.categories, newState.espacesVertsData.categoriesCount) }
                return newState // enfin je retourne le state car c'est le but de toute action (retrouver le nouveau state)
            })
            .catch(error => { console.log(error) })
    },
    parseEspaceVertsData: list => state => {
        const categories = list.map( x => x.fields.categorie) // on récupère uniquement la catégorie de chaque espace vert
        // à l'aide de la fonction reduce (https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce)
        // je compte le nombre d'éléments dans chaque catégories
        const categoriesCount = categories.reduce((obj, value) => {
            obj[value] = (obj[value] || 0) + 1
            return obj
        }, {})
        return {
            ...state,
            espacesVertsData: {
                categories: Object.keys(categoriesCount), // je récupère un tableau représentant les categories
                categoriesCount:  Object.values(categoriesCount) // et le nombre d'element dans chaque categories
            }
        }
    } */
}

import axios from 'axios'

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
            console.log("request" , request)
            const newState = actions.setTreeArray(request)
            console.log("newstete" , newState)
            state.chart.data.labels = newState.districtData.distictName
            state.chart.data.datasets[0].data = newState.districtData.nbTrees
            state.chart.update({duration: 800})
            console.log(state.chart.data.datasets)
            return newState
    },
    setTreeArray: rawtrees => (state, actions) => {
        const onlyFields = rawtrees.map(x => x.fields)
        const district = actions.setTreeByDistrictArray(onlyFields)

        return {...state, trees: onlyFields, districtData: district}
    },
    // set treesDistrict with trees
    setTreeByDistrictArray: (trees) => state => {
        const treesByDistrict = trees.map(x => x.arrondissement)

        // Get occurences of trees by district
        const occTreesByDistrict = treesByDistrict.reduce(function(obj, item) {
            obj[item] = (obj[item] || 0) + 1
            return obj
        }, {})

        return {
            distictName: Object.keys(occTreesByDistrict), // je récupère un tableau représentant les categories
            nbTrees:  Object.values(occTreesByDistrict) // et le nombre d'element dans chaque categories
        }
    },
    saveChart: (c) => state => {
        return {...state, chart: c}
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

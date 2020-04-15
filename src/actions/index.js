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
    getTreesFromApi: () => (state, actions) => {
        const request = axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&facet=genre&facet=espece&facet=dateplantation')
        console.log("getTreesFromApi function")
        request.then(response => {
            console.log(response.data.records)
            return actions.setTreeArray(response.data.records)
        })
            .catch(error => { console.log(error) })
    },
    setTreeArray: rawtrees => state => {
        const onlyFields = rawtrees.map(x => x.fields)
        // console.log("Only fields : " + rawtrees[0].fields.id)
        const cleanTree = {
            id: onlyFields.objectid, 
            adresse: onlyFields.adresse,
            arrondissement:onlyFields.arrondissement,
            circonference:onlyFields.circonferenceencm,
            dateplantation:onlyFields.dateplantation,
            espece:onlyFields.espece,
            genre:onlyFields.genre,
            hauteur:onlyFields.hauteurenm
        }
        console.log("Clean trees : " + cleanTree)
        //return {...state, trees: cleanTree}
        console.log("setTreeArray function")
        return {...state, trees: rawtrees}
    }
    /* getEspaceVertsDataFromApi: ({count, callBack}) => (state, actions) => {
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

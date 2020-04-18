import axios from 'axios'


export default {
  
    getTreesFromApi: () => (state, actions) => {
        const request = axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&facet=genre&facet=espece&facet=dateplantation&rows=182')
        console.log("getTreesFromApi function")
        request.then(response => {
            console.log(response.data.records)
            return actions.setTreeArray(response.data.records)
        })
            .catch(error => { console.log(error) })
    },

    // je calcule l'age en fonction de la date actuelle 
    calculateAge: (dateplantation) => {
        const ageDifNow = Date.now() - dateplantation
        const ageDate = new Date(ageDifNow) 
        return Math.abs(ageDate.getUTCFullYear() - 1970) 
    },
    
    setTreeArray: rawtrees => (state,actions) => {
        const onlyFields = rawtrees.map(x => x.fields)
        console.log("Only fields : " , onlyFields)
        
        // je rajoute une section age pour chaque arbre
        onlyFields.forEach(
            (element) => {
                element.age = actions.calculateAge(new Date(element.dateplantation).getTime())}
        )

        const species = actions.setTreeBySpeciesArray(onlyFields)
     
        console.log("setTreeArray function")
        return {...state, trees: onlyFields,  speciesNumber: species }
    },
    
    setTreeBySpeciesArray: trees => state => {
        const speciesName = trees.map(x => x.espece)

        // je compte le nombre d'arbres pour chaque espèce
        const speciesCount = speciesName.reduce((obj, value) => {
            obj[value] = (obj[value] || 0) + 1
            return obj
        }, {})

        var speciesSort = []
        // je rentre mes données trouvées dans un tableau
        for(var species in speciesCount)
        {
            speciesSort.push([species, speciesCount[species]])
        }

        // je trie les espèces par rapport au nombres d'arbres par ordre décroissant
        speciesSort.sort((a,b) => b[1] - a[1])
        

        return speciesSort
    }
 
}

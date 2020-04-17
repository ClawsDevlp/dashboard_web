import axios from 'axios'

export default {
    // Function that will get the data from the API
    getTreesFromApi: () => (state, actions) => {
        const request = axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&facet=genre&facet=espece&facet=dateplantation&rows=182')
        request.then(response => {
            return actions.setTreeArray(response.data.records)
        })
        .catch(error => { console.log(error) })
    },
    // Function to store the data in the state
    setTreeArray: rawtrees => (state, actions) => {
        const onlyFields = rawtrees.map(x => x.fields)
        const recap = actions.setRecapArray(onlyFields)
        return {...state, trees: onlyFields, recapArray: recap}
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
    // Functions that reorganise the recap array depending on a category
    organiseBySpecies: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.species.localeCompare(b.species));
        return {...state, recapArray: sortedRecapArray}
    },
    organiseByAdress: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.adress.localeCompare(b.adress));
        return {...state, recapArray: sortedRecapArray}
    },
    organiseByDistrict: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.district.localeCompare(b.district));
        return {...state, recapArray: sortedRecapArray}
    },
    organiseByCirc: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.circumference - b.circumference);
        return {...state, recapArray: sortedRecapArray}
    },
    organiseByHeight: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.height - b.height);
        return {...state, recapArray: sortedRecapArray}
    },
    organiseByDate: () => (state) => {
        const sortedRecapArray = state.recapArray.sort((a, b) => a.date - b.date);
        return {...state, recapArray: sortedRecapArray}
    }
}

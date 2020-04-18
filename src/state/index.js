export default {
    trees: [], // array of all the data from the api
    recapArray: [], // re organised array with only the data that will be used for the "Un petit récapitulatif" section
    count: 0,
    speciesNumber: [], // array of all the species and the number of trees for each species
    districtData : { // object with disctrict and their number of trees
        distictName : [],
        nbTrees: []
    },
    yearData : { // object with year of plantation and their number of trees
        yearDate : [],
        nbTrees: []
    },
    barChart: {}, // Charts
    lineChart: {}
   
}

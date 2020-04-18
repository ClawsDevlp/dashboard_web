import { h } from 'hyperapp'
import CircumferenceList from './CircumferenceList'

// Creating a list of tree sorted by their size in centimeters 
export default (props) =>
    h( 'div', { class : 'container top3'}, [
        h( 'h3', null, [h('span', null, '🏆 TOP 3'), ' Les arbres les plus gros 🏋️‍♀️']),
        h('ul',  {} , 
            props.trees
            .sort((a, b) => ( b.circonferenceencm - a.circonferenceencm ))
            .slice(0,3)
            .map( tree => h('li', {}, [
                CircumferenceList({
                    circonferenceencm : tree.circonferenceencm,
                    espece : tree.espece,
                    arrondissement : tree.arrondissement
                })
                
            ]))
        
        )
    ])
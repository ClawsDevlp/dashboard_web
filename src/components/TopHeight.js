import { h } from 'hyperapp'
import HeightList from './HeightList'

// Creating a list of tree sorted by their height in meters
export default (props) =>
    h( 'div', { class : 'container top3'}, [
        h( 'h3', null, [h('span', null, '🏆 TOP 3'), '  Les arbres les plus haut 🧗']),
        h('ul',  {} , 
            props.trees
            .sort((a, b) => ( b.hauteurenm - a.hauteurenm ))
            .slice(0,3)
            .map( tree => h('li', {}, [
                HeightList({
                    hauteurenm : tree.hauteurenm,
                    espece : tree.espece,
                    arrondissement : tree.arrondissement
                   
                })
                
            ]))
        
        )
    ])
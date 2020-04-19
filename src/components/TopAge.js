import { h } from 'hyperapp'
import AgeList from './AgeList'

// Creating a list sorted by Age of the tree (the oldest trees)
export default (props) =>
    h( 'div', { class : 'container top3'}, [
        h( 'h3', null, [h('span', null, '🏆 TOP 3'), ' Les arbres les plus vieux 👵']),
        h('ul',  {} , 
            props.trees
            .sort((a, b) => ( b.age - a.age ))
            .slice(0,3)
            .map( tree => h('li', {}, [
                AgeList({
                    age : tree.age,
                    espece : tree.espece,
                    arrondissement : tree.arrondissement
                })
                
            ]))
        
        )
    ])
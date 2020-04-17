import { h } from 'hyperapp'
import AgeList from './AgeList'

export default (props) =>
    h( 'div', { class : 'container top3'}, [
        h( 'h3', null, [h('span', null, '🏆 TOP 3'), ' Les arbres les plus vieux 👵']),
        h('ul',  {} , 
            props.trees
            .sort((a, b) => ( b.age - a.age ))
            //.sort((a, b) => ( new Date(a.dateplantation).getTime()  - new Date(b.dateplantation).getTime()))
            .slice(0,3)
            .map( tree => h('li', {}, [
                AgeList({
                    age : tree.age,
                    espece : tree.espece,
                    arrondissement : tree.arrondissement
                    //age : actions.calculateAge(new Date(tree.dateplantation).getTime())
                    //age: props.getAge(new Date(tree.dateplantation).getTime())
                })
                
            ]))
        
        )
    ])
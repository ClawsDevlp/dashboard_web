import { h } from 'hyperapp'
import Circumference from './Circumference'

export default (props) =>
    h( 'div', { class : 'todo-list__root'}, [
        h('ul',  {} , 
            props.trees
            .sort((a, b) => ( b.circonferenceencm - a.circonferenceencm ))
            //.sort((a, b) => ( new Date(a.dateplantation).getTime()  - new Date(b.dateplantation).getTime()))
            .slice(0,3)
            .map( tree => h('li', {}, [
                Circumference({
                    circonferenceencm : tree.circonferenceencm,
                    espece : tree.espece,
                    arrondissement : tree.arrondissement
                    //age : actions.calculateAge(new Date(tree.dateplantation).getTime())
                    //age: props.getAge(new Date(tree.dateplantation).getTime())
                })
                
            ]))
        
        )
    ])
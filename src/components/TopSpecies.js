import { h } from 'hyperapp'
import SpeciesList from './SpeciesList'

export default (props) =>
    h( 'div', { class : 'container top3'}, [
        h( 'h3', null, [h('span', null, '🏆 TOP 3'), '  Les espèces les plus importantes 🧗']),
        h('ul',  {} , 
            props.species
            .slice(0,3)
            .map( type => h('li', {}, [
                SpeciesList({
                    name : type[0], // le nom de l'espèce
                    value : type[1] // le nombre d'arbre de cette espèce
                   
                })
                
            ]))
        
        )
    ])
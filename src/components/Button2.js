import { Link } from 'react-router-dom';

import '../components/styles/navbar.css'

function Button2({text, href}){
    return(
        <div>
            <button id="button2">
            <Link to={href}>
                {text}
            </Link>
            </button>
        </div>
    )
}

export default Button2;
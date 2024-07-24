import { Link } from 'react-router-dom';

import Argent from '../media/argent.png'
import Accueil from '../media/accueil.png'
import Bibliotheque from '../media/bibliotheque.png'

import '../components/styles/navbar.css'

import Button1 from './Button1'
import Button2 from './Button2'

function Navbar(){
    return (
        <div>
            <nav>
                <ul>
                    <li>
                    <Link to="/dashboard">
                        <img src={Argent} />
                    </Link>
                    </li>
                </ul>
                <ul id="buttons">
                    <li>
                        <Button1 text="Log in" href="/login"/>
                    </li>
                    <li>
                        <Button2 text="Sign up" href="/signup"/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;
import { Link } from 'react-router-dom';
import '../components/styles/navbar.css';

function Button1({ text, href, onClick, type }) {
    if (href) {
        return (
            <Link to={href} style={{ textDecoration: 'none' }}>
                <button id="button1" onClick={onClick} type={type}>
                    {text}
                </button>
            </Link>
        );
    } else {
        return (
            <button id="button1" onClick={onClick} type={type}>
                {text}
            </button>
        );
    }
}

export default Button1;
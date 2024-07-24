import '../components/styles/PageAccueil.css'

function Card({title, image, link}){
    return (
        <div className="card">
            <img src={image} alt=""/>
            <h3>{title}</h3>
            <a href="">{link}</a>
        </div>
    )
}

export default Card;
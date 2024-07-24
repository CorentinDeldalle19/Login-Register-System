import '../components/styles/PageAccueil.css'
import Button1 from './Button1';
import Button2 from './Button2';
import Card from './Card';
import Ordi from '../media/ordi.png'
import fusee from '../media/fusee.png'
import robot from '../media/robot.png'
import argent from '../media/argent.png'

function PageAccueil (){
    return (
        <div class="page">
            <h1>Learning to code is the <br/> best thing you can do today</h1>
            <div className="buttons">
                <div className="one">
                    <Button2 text="Get started →" href="#"/>
                </div>
                <Button1 text="Already member →" href="#"/>
            </div>
            <img src={Ordi} alt="" id="image"/>
            <div className="cards">
                <Card title="30 concepts per language" image={robot} link="Know more →"/>
                <Card title="All is free" image={argent} link="Know more →"/>
                <Card title="Boost your career" image={fusee} link="Know more →"/>
            </div>
            <footer>
                <p>Copyright</p>
            </footer>
        </div>
    )
}

export default PageAccueil;
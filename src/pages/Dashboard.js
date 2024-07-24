import Navbar from "../components/Navbar";
import Card from "../components/Card";

import c from "../media/c.png";
import python from '../media/python.png'
import javascript from '../media/javascript.png'
import work from '../media/work.png'

import '../components/styles/dashboard.css'

function Dashboard(){
    return (
        <div>
            <Navbar />
            <div className="pageDash">
                <h2 className="title">Hi !</h2>
                <div className="cards">
                    <Card title="Javascript" image={javascript} link="Go back →"/>
                    <Card title="Python" image={python} link="Go back →"/>
                    <Card title="Javascript" image={javascript} link="Go back →"/>
                    <Card title="Python" image={python} link="Go back →"/>
                    <Card title="Javascript" image={javascript} link="Go back →"/>
                    <Card title="Python" image={python} link="Go back →"/>
                </div>
                <div className="section">
                    <div className="left">
                        <img src={work} alt=""/>
                    </div>
                    <div className="right">
                        <h3 className="subtitle">Recommended</h3>
                        <div className="cards2">
                            <Card title="Python" image={python} link="Discover →"/>
                            <Card title="C" image={c} link="Discover →"/>
                            <Card title="C" image={c} link="Discover →"/>
                            <Card title="C" image={c} link="Discover →"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '../components/Navbar.js'
import Map from '../components/Map';

const Home = () => {
    return (
        <div className="App">
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Map />
            </div>
        </div >
    );
}

export default Home;

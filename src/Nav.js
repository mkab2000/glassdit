import logo from './logo.png';
import { Link } from 'react-router-dom';
import './Styles/Nav.css'

// const navStyle = {height: "50px", display: "flex", flexDirection: "row", alignItems: "center", padding: 30, backgroundColor: "#262626"}
const logoStyle = {height: "50px"}

function Nav() {
    return (
      <div className="Nav">
        <div>
          <img src={logo} alt="LOGO" />
          <h1>Realtime Glassdit</h1>
        </div>
        
        <Link to={"/posts/new"} className='postCreate'><button>Create new post</button></Link>
        

      </div>
    );
  }
  
  export default Nav;
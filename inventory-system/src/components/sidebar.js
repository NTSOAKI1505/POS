import "./sidebar.css";
import { Link } from "react-router-dom";
function sidebar(){
    return(
        <div className="sidebar">
            <h2>Wings Cafe</h2>
            <ul>
            <li><Link to="/">dashboard</Link></li>
              <li><Link to="/customer">customer</Link></li>
              <li><Link to="/sales">sales</Link></li>
              <li><Link to="/reporting">reporting</Link></li>
              <li><Link to="/product-management">product-management</Link></li>
              <li><Link to="/stock-management">stock-management</Link></li>
            </ul>
        </div>
    );

}
export default sidebar;
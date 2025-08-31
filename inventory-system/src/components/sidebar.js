import "./sidebar.css";
import { Link } from "react-router-dom";
function sidebar(){
    return(
        <div className="sidebar">
            <h2>Wings Cafe</h2>
            <ul>
            <li><Link to="/">Home</Link></li>
              <li><Link to="/sales">Sales</Link></li>
              <li><Link to="/customer">Customer</Link></li>
              <li><Link to="/product-management">product-management</Link></li>
              <li><Link to="/stock-management">stock-management</Link></li>
              <li><Link to="/reporting">reporting</Link></li>
            </ul>
        </div>
    );

}
export default sidebar;
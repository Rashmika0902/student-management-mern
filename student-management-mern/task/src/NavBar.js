import SchoolIcon from '@mui/icons-material/School';
import "./styles/NavBar.css"; // Adjust the path to your CSS file

const NavBar = () => {
    return (
        <div className="navbar">
            <SchoolIcon className="navbar-icon" style={{ fontSize: "42px" }} />
            <div className="navbar-text">
                STUDENT MANAGEMENT SYSTEM
            </div>
        </div>
    );
}

export default NavBar;

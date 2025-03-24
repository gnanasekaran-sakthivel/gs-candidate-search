import { Link } from "react-router-dom";
import "../assets/styles/navigation.css"; // Import the CSS file

const Nav = () => {
  return (
    <div className="nav">
      {/* Link to Home page */}
      <Link to="/" className="nav-link">
        Home
      </Link>

      {/* Link to Saved Candidates page */}
      <Link to="/SavedCandidates" className="nav-link">
        Potential Candidates
      </Link>
    </div>
  );
};

export default Nav;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
function Footer() {
  return (
    <>
      <footer className="footer-container flex-column-center">
        <p className="footer-header">
          Made with <span className="keyword">{`</>`}</span> by Winter
          Developers
        </p>

        <p className="copywright">© 2024 | Bakery Cakery</p>
      </footer>
    </>
  );
}

export { Footer };

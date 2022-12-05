import Footer from "../footer/Footer";
import Navbar from "../navBar/NavBar";
import notFound from "./notFound.css"

const NotFound = () => {
  return (
    <div>
    <Navbar />
    <div className="not-found">
      <h2>404</h2>
      <p>Page not found</p>
    </div>
    <Footer />
    </div>
  );
};

export default NotFound;
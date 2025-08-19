import "./homepage.css";
import Pasta from "../../assets/Dishes/pastaSmall.jpg";
import Bruschetta from "../../assets/Dishes/bruscheta2Small.jpg";
import Fish from "../../assets/Dishes/fishSmall.jpg";

function Homepage() {
    return (
        <div className="main">
            <h1>Welcome to Little Lemon!</h1>
            <article className="new-menu">
                <h2>Our New Menu</h2>
                <p>Our menu has been created by our head chef, John Doe. He has been with us for 10 years and has been a key part of our success.</p>
                <p>We are excited to announce our new menu, which is a collection of our favorite dishes. We hope you enjoy them as much as we do.</p>
                <a href="/menu">Find out more!</a>
            </article>
            <article className="weekly-specials">
                <h2>Weekly Specials</h2>
                <p>Our weekly specials are a collection of our favorite dishes. We hope you enjoy them as much as we do.</p>
                <div className="image-carousel">
                    <img src={Pasta} alt="Weekly Special 1" />
                    <img src={Bruschetta} alt="Weekly Special 2" />
                    <img src={Fish} alt="Weekly Special 3" />
                </div>
            </article>
        </div>
    )
}

export default Homepage;
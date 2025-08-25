import "./weeklySpecials.css";
import Pasta from "../../assets/Dishes/pastaSmall.jpg";
import Bruschetta from "../../assets/Dishes/bruscheta2Small.jpg";
import Fish from "../../assets/Dishes/fishSmall.jpg";
import { useNavigate } from 'react-router-dom';

function SpecialsMenu() {
    const navigate = useNavigate();
    const weeklySpecials = [
        {
            id: 1,
            image: Pasta,
            title: "Truffle Mushroom Pasta",
            description: "Handcrafted fettuccine with wild mushrooms, truffle oil, and aged parmesan",
            price: "$24.99"
        },
        {
            id: 2,
            image: Bruschetta,
            title: "Artisan Bruschetta",
            description: "Fresh tomatoes, basil, and mozzarella on toasted ciabatta bread",
            price: "$12.99"
        },
        {
            id: 3,
            image: Fish,
            title: "Mediterranean Sea Bass",
            description: "Pan-seared sea bass with lemon herb sauce and seasonal vegetables",
            price: "$32.99"
        }
    ];

    return (
        <main className="specials-menu" role="region" aria-label="Specials Menu">
            <article className="weekly-specials">
                <h1>This weeks specials!</h1>
                <p>New and fresh dishes every week!</p>
                <div className="specials-cards" role="region" aria-label="Weekly special dishes">
                    {weeklySpecials.map((special) => (
                        <div key={special.id} className="special-card" role="article">
                            <div className="card-image">
                                <img src={special.image} alt={`${special.title} - Weekly Special`} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{special.title}</h3>
                                <p className="card-description">{special.description}</p>
                                <div className="card-price">{special.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="view-menu-btn" onClick={() => navigate('/menu')}>View Menu</button>
            </article>
        </main>
    )
}

export default SpecialsMenu;
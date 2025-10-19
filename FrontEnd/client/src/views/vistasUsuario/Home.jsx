import React from 'react';
import NavBar from '../../components/NavBar.jsx';
import CardList from '../../components/CardList.jsx';


const Home = () => {

const featuredProducts = [
    { id: 1, image: 'https://i.imgur.com/gS5A0fV.png', title: 'Classic Console', description: 'Relive the golden age of gaming.' },
    { id: 2, image: 'https://i.imgur.com/L1b40mS.png', title: 'Rare Comic', description: 'A must-have for any serious collector.' },
    { id: 3, image: 'https://i.imgur.com/y3fNMat.png', title: 'Action Figure', description: 'Add this rare figure to your collection.' },
    { id: 4, image: 'https://i.imgur.com/q7exqg8.png', title: 'Board Game', description: 'Gather friends for an epic game night.' }
];

const categories = [
    { id: 1, image: 'https://i.imgur.com/w8NfO3W.png', title: 'Gaming', description: '' },
    { id: 2, image: 'https://i.imgur.com/i9vfl3x.png', title: 'Comics', description: '' },
    { id: 3, image: 'https://i.imgur.com/mJg89tB.png', title: 'Collectibles', description: '' },
    { id: 4, image: 'https://i.imgur.com/1j9xXG4.png', title: 'Apparel', description: '' }
];



return (
    <div className="home-page">
    
    <NavBar />

    
    <section className="hero-banner" style={{padding: '50px', backgroundColor: '#4a1e9e', color: 'white', textAlign: 'center'}}>
        <h1>Level Up Your Collection</h1>
        <p>Discover a treasure trove of geek grandeur from vintage collectibles...</p>
        <button style={{padding: '10px 20px', fontSize: '1em', cursor: 'pointer'}}>Shop Now</button>
    </section>

    <main className="main-content" style={{maxWidth: '1200px', margin: '40px auto', padding: '0 20px'}}>
        
        <section className="featured-items">
        <h2 style={{textAlign: 'center', fontSize: '2em', marginBottom: '30px'}}>Featured Items</h2>
        <CardList items={featuredProducts} /> 
        </section>

        <section className="shop-by-category" style={{marginTop: '50px'}}>
        <h2 style={{textAlign: 'center', fontSize: '2em', marginBottom: '30px'}}>Shop by Category</h2>
        <CardList items={categories} />
        </section>

        <section className="community-cta" style={{textAlign: 'center', marginTop: '50px', padding: '40px', backgroundColor: '#f4f4f4'}}>
        <h2>Join the Geek Haven Community</h2>
        <p>Stay up-to-date on the latest arrivals, exclusive offers, and community events.</p>
        <button style={{padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#8a2be2', color: 'white', border: 'none'}}>Sign Up Now</button>
        </section>

    </main>

    <footer className="main-footer" style={{textAlign: 'center', padding: '20px', backgroundColor: '#333', color: 'white', marginTop: '50px'}}>
        <p>&copy; 2023 Geek Haven. All rights reserved.</p>
    </footer>
    </div>
);
};

export default Home;
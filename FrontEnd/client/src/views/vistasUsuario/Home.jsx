import React from 'react';
import NavBar from '../../components/NavBar.jsx';
import CardList from '../../components/CardList.jsx';
import ProductCarousel from '../../components/product/ProductCarousel.jsx';

// Esculturas
import escultura1 from '../../assets/escultura1.png';
import escultura2 from '../../assets/escultura2.png';
import escultura3 from '../../assets/escultura3.png';
import escultura4 from '../../assets/escultura4.png';
import escultura5 from '../../assets/escultura5.png';
import escultura6 from '../../assets/escultura6.png';

// Espadas
import espada1 from '../../assets/espada1.png';
import espada2 from '../../assets/espada2.png';
import espada3 from '../../assets/espada3.png';
import espada4 from '../../assets/espada4.png';
import espada5 from '../../assets/espada5.png';
import espada6 from '../../assets/espada6.png';

// Ropa
import ropa1 from '../../assets/ropa1.png';
import ropa2 from '../../assets/ropa2.png';
import ropa3 from '../../assets/ropa3.png';
import ropa4 from '../../assets/ropa4.png';
import ropa5 from '../../assets/ropa5.png';
import ropa6 from '../../assets/ropa6.png';


const Home = () => {

const esculturas = [
    { id: 'e1', title: 'Escultura 1', image: escultura1 },
    { id: 'e2', title: 'Escultura 2', image: escultura2 },
    { id: 'e3', title: 'Escultura 3', image: escultura3 },
    { id: 'e4', title: 'Escultura 4', image: escultura4 },
    { id: 'e5', title: 'Escultura 5', image: escultura5 },
    { id: 'e6', title: 'Escultura 6', image: escultura6 }
];

const espadas = [
    { id: 's1', title: 'Espada 1', image: espada1 },
    { id: 's2', title: 'Espada 2', image: espada2 },
    { id: 's3', title: 'Espada 3', image: espada3 },
    { id: 's4', title: 'Espada 4', image: espada4 },
    { id: 's5', title: 'Espada 5', image: espada5 },
    { id: 's6', title: 'Espada 6', image: espada6 }
];

const ropa = [
    { id: 'r1', title: 'Ropa 1', image: ropa1 },
    { id: 'r2', title: 'Ropa 2', image: ropa2 },
    { id: 'r3', title: 'Ropa 3', image: ropa3 },
    { id: 'r4', title: 'Ropa 4', image: ropa4 },
    { id: 'r5', title: 'Ropa 5', image: ropa5 },
    { id: 'r6', title: 'Ropa 6', image: ropa6 }
];

return (
    <div className="home-page">
    <NavBar />

    <img src="/images/escultura1.png" alt="IMAGEN DE PRUEBA" style={{ border: '5px solid red', width: '200px' }} />
    
    <section className="hero-banner" style={{padding: '50px', backgroundColor: '#4a1e9e', color: 'white', textAlign: 'center'}}>
        <h1>Level Up Your Collection</h1>
        <p>Discover a treasure trove of geek grandeur...</p>
        <button style={{padding: '10px 20px', fontSize: '1em', cursor: 'pointer'}}>Shop Now</button>
    </section>

    <main className="main-content">
                
        <ProductCarousel title="Esculturas" products={esculturas} />
        
        <ProductCarousel title="Espadas" products={espadas} />
        
        <ProductCarousel title="Ropa" products={ropa} />

        <section className="community-cta" style={{textAlign: 'center', marginTop: '50px', padding: '40px', backgroundColor: '#f4f4f4'}}>
        <h2>Join the Geek Haven Community</h2>
        <p>Stay up-to-date on the latest arrivals...</p>
        <button style={{padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#8a2be2', color: 'white', border: 'none'}}>Sign Up Now</button>
        </section>

    </main>

      {/* (Aquí va tu Footer) */}
      {/* <Footer /> */}
    <footer className="main-footer" style={{textAlign: 'center', padding: '20px', backgroundColor: '#333', color: 'white', marginTop: '50px'}}>
        <p>&copy; 2023 Geek Haven. All rights reserved.</p>
    </footer>
    </div>
);
};

export default Home;
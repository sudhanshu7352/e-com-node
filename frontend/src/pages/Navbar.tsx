import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    const navigate = useNavigate();

    return (
        <nav style={styles.navbar}>
            <div style={styles.leftSection}>
                <h1 onClick={() => navigate('/products')} style={styles.appName}>
                    MyApp
                </h1>
            </div>
            <div style={styles.rightSection}>
                <button onClick={() => navigate('/cart')} style={styles.cartButton}>
                    Go to Cart ({cartCount})
                </button>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
    },
    leftSection: {
        flex: 1,
    },
    appName: {
        cursor: 'pointer',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cartButton: {
        backgroundColor: '#61dafb',
        border: 'none',
        color: 'black',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default Navbar;

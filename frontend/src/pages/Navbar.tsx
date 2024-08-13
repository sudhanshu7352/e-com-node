import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        // const confirmed = window.confirm("Are you sure you want to logout?");
        // if (confirmed) {
            localStorage.clear();
            navigate('/login');
        // }
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.leftSection}>
                <h1 onClick={() => navigate('/products')} style={styles.appName}>
                    MyApp
                </h1>
            </div>
            <div style={styles.rightSection}>
                {cartCount !== undefined && (
                    <button style={styles.cartButton} onClick={() => navigate('/cart')}>
                        Go to Cart ({cartCount})
                    </button>
                )}
                {cartCount === undefined && (
                    <button style={styles.cartButton} onClick={() => navigate('/cart')}>
                         Cart
                    </button>
                )}
                <button style={styles.logoutButton} onClick={() => setShowLogoutDialog(true)}>
                    Logout
                </button>
            </div>

            {showLogoutDialog && (
                <div style={styles.dialogOverlay}>
                    <div style={styles.dialogBox}>
                        <p style={{color :"gray"}}>Are you sure you want to logout?</p>
                        <div style={styles.dialogButtons}>
                            <button onClick={handleLogout} style={styles.dialogYesButton}>Yes</button>
                            <button onClick={() => setShowLogoutDialog(false)} style={styles.dialogNoButton}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
    },
    appName: {
        cursor: 'pointer',
        fontSize: '24px',
    },
    cartButton: {
        backgroundColor: '#61dafb',
        border: 'none',
        color: 'black',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    logoutButton: {
        backgroundColor: '#eb7134',
        border: 'none',
        color: 'black',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    dialogOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } as React.CSSProperties,
    dialogBox: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
    } as React.CSSProperties,
    dialogButtons: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    dialogYesButton: {
        padding: '5px 15px',
        marginRight: '10px',
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    dialogNoButton: {
        padding: '5px 15px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Navbar;

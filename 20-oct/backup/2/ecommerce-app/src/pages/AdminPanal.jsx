import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import AddProducts from '../components/AddProducts';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ManageOrders from '../components/ManageOrders';
import ManageProducts from '../components/ManageProducts';
import AddCategory from '../components/AddCategory';

const AdminPanal = () => {
    const [user, setUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);
    const [selectedTab, setSelectedTab] = useState('addProducts'); // To manage which tab to show

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, [auth]);

    const handleShowSignUp = () => {
        setShowSignUp(true);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    // Sign out function
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('You have been signed out.');
        } catch (error) {
            console.error('Error signing out: ', error);
            alert('Error signing out: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            {user ? (
                <div>
                    {/* Admin Navigation Tabs */}
                    <nav>
                        <button onClick={() => handleTabChange('addProducts')}>
                            Add Products
                        </button>
                        <button onClick={() => handleTabChange('manageProducts')}>
                            Manage Products
                        </button>
                        <button onClick={() => handleTabChange('addCategory')}>
                            Add Category
                        </button>
                        <button onClick={() => handleTabChange('manageOrders')}>
                            Manage Orders
                        </button>
                    </nav>

                    {/* Sign Out Button */}
                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>

                    {/* Conditional Rendering Based on Selected Tab */}
                    {selectedTab === 'addProducts' && <AddProducts />}
                    {selectedTab === 'manageProducts' && <ManageProducts />}
                    {selectedTab === 'addCategory' && <AddCategory />}
                    {selectedTab === 'manageOrders' && <ManageOrders />}
                </div>
            ) : (
                <div>
                    <h2>Please Sign In</h2>
                    <SignIn />
                    <button onClick={handleShowSignUp}>
                        Don't have an account? Sign Up
                    </button>
                    {showSignUp && <SignUp />}
                </div>
            )}
        </div>
    );
};

export default AdminPanal;

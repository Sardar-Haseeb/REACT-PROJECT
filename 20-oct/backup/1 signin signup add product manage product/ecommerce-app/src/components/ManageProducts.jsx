import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'; // For Firebase Storage operations
import { db, storage } from '../firebase'; // Import Firestore and Firebase Storage

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
    const [updatedProduct, setUpdatedProduct] = useState({ name: '', category: '', price: '' });
    const [newImage, setNewImage] = useState(null); // For storing the new image file

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsList);
            } catch (err) {
                setError('Failed to fetch products.');
                console.error('Error fetching products: ', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle edit click
    const handleEditClick = (product) => {
        setEditingProduct(product);
        setUpdatedProduct({ name: product.name, category: product.category, price: product.price });
        setNewImage(null); // Reset the image file
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewImage(file); // Set the new image file for upload
    };

    // Handle update product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const productRef = doc(db, 'products', editingProduct.id);

        try {
            // If a new image is uploaded, replace the old one
            let imageUrl = editingProduct.imageUrl; // Keep the old image URL unless a new one is uploaded

            if (newImage) {
                // Delete the old image from Firebase Storage
                if (imageUrl) {
                    const oldImageRef = ref(storage, imageUrl);
                    await deleteObject(oldImageRef);
                }

                // Upload the new image to Firebase Storage
                const newImageRef = ref(storage, `product-images/${newImage.name}`);
                const snapshot = await uploadBytes(newImageRef, newImage);
                imageUrl = await getDownloadURL(snapshot.ref); // Get the new image URL
            }

            // Update Firestore document with the new image URL if applicable
            await updateDoc(productRef, {
                name: updatedProduct.name,
                category: updatedProduct.category,
                price: parseFloat(updatedProduct.price),
                imageUrl: imageUrl, // Use the new image URL or the old one if no new image was uploaded
            });

            // Update local state
            const updatedProducts = products.map((product) =>
                product.id === editingProduct.id
                    ? { ...product, ...updatedProduct, imageUrl }
                    : product
            );
            setProducts(updatedProducts);
            setEditingProduct(null); // Close the edit form
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Failed to update the product.');
        }
    };

    // Handle delete product
    const handleDeleteProduct = async (productId, imageUrl) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            // Delete the product document from Firestore
            await deleteDoc(doc(db, 'products', productId));

            // Delete the image from Firebase Storage if imageUrl exists
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }

            // Update local state
            setProducts(products.filter((product) => product.id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err);
            setError('Failed to delete the product.');
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Manage Products</h1>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h2>{product.name}</h2>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            {product.imageUrl && (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                            )}
                            <button onClick={() => handleEditClick(product)}>Edit</button>
                            <button
                                onClick={() => handleDeleteProduct(product.id, product.imageUrl)}
                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Form */}
            {editingProduct && (
                <div>
                    <h2>Edit Product</h2>
                    <form onSubmit={handleUpdateProduct}>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                value={updatedProduct.category}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label>Replace Image:</label>
                            <input type="file" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditingProduct(null)} style={{ marginLeft: '10px' }}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;

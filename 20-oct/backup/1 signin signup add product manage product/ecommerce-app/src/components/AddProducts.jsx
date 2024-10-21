import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore configuration
import Compressor from 'compressorjs';

const AddProducts = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]); // Store fetched categories
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(''); // New state for description
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch categories from Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const categoryList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoryList);
            } catch (error) {
                console.error('Error fetching categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    // Handle image upload and compression
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            new Compressor(file, {
                quality: 0.6, // Adjust quality as needed
                maxWidth: 800, // Resize image
                maxHeight: 800,
                success: (compressedResult) => {
                    const sizeInKB = compressedResult.size / 1024;
                    if (sizeInKB > 50) {
                        setError('Image size exceeds 50KB after compression.');
                    } else {
                        setImage(compressedResult);
                        setError('');
                    }
                },
                error: (err) => {
                    setError('Error compressing the image.');
                },
            });
        }
    };

    // Handle product submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !category || !price || !description || !image) {
            setError('All fields are required.');
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            setError('You must be logged in to add products.');
            return;
        }

        setIsLoading(true);

        try {
            // Upload the image to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `products/${image.name}`);
            await uploadBytes(storageRef, image);

            // Get the image URL
            const imageUrl = await getDownloadURL(storageRef);

            // Save product details in Firestore
            await addDoc(collection(db, 'products'), {
                name,
                category,
                price: parseFloat(price),
                description, // Include description in the Firestore document
                imageUrl,
                createdAt: new Date(),
                createdBy: user.uid, // Save the user ID who added the product
            });

            // Reset form
            setName('');
            setCategory('');
            setPrice('');
            setDescription(''); // Reset description
            setImage(null);
            setError('');
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product: ', error);
            setError('Error adding product: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Products</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} required />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProducts;

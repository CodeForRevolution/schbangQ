import React, { useState, useEffect } from 'react';
import './Popular.css';
import { Link } from 'react-router-dom';

export const Popular = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
            .then((response) => response.json())
            .then((data) => {
                setPopularProducts(data.slice(0, 8));
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return ( 
        <div className='popular'>
            <h1>Development</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((book) => { // Removed index, as we should use book.id
                    return (
                        // Apply key prop here
                        <Link to={`/product/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}> 
                        <div className="book-item">
                            <h2>{book.volumeInfo.title}</h2>                         
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                            <p>Author(s): {book.volumeInfo.authors.join(', ')}</p>
                            <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
                        </div>
                        </Link> 
                    );
                })}
            </div>
        </div>
    );
};

export default Popular;

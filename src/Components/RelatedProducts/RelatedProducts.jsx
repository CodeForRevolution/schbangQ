import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RelatedProducts.css';

const RelatedProducts = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json');
        const data = await response.json();
        setBooks(data.slice(40, 45));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='relatedproducts'>
      <h1>Tesla Collection</h1>
      <hr />
      <div className="relatedproducts-item">
        {books.map((book) => (
          <Link to={`/product/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}> {/* Move the key prop here */}
            <div className="book-item">
              <h2>{book.volumeInfo.title}</h2>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <p>Author(s): {book.volumeInfo.authors?.join(', ')}</p>
              <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;

import React, { useState, useEffect } from 'react';
import './CSS/CheckNow.css';
import Check from '../Components/Check/Check';
import { Link } from 'react-router-dom';

export const CheckNow = () => {
  
  const [checkNow, setCheckNow] = useState([]);

  useEffect(() => {
      fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
          .then((response) => response.json())
          .then((data) => {
              // Assuming the fetched data is an array of books
              // Limiting to first 8 products
              setCheckNow(data.slice(21, 38));
          })
          .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Check />
      <div className='check-product'>
        <div className='check-produts'>
        {checkNow.map((book, index) => {
                 return (
                  <Link to={`/product/${book.id}`} style={{ textDecoration: 'none' }}>
                    <div key={index} className="book-item">
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
    </div>
  );
};

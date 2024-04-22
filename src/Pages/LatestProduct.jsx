import React, { useState, useEffect } from 'react';
import './CSS/LatestProduct.css';
// import { ShopContext } from '../Context/ShopContext';
import Latest from '../Components/Latest/Latest';
// import latest_banner from '../Components/Assests/Latest Products/Latest Banner.jpg';
import { Link } from 'react-router-dom';

export const LatestProduct = () => {

  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the fetched data is an array of books
        // Limiting to first 8 products
        setLatestProduct(data.slice(35, 59));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>
      <Latest />
      <div className='latest-product'>
        <div className='latest-produts'>

          {latestProduct.map((book, index) => {
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

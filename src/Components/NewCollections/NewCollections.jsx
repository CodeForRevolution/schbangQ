import React from 'react';
import { useState, useEffect } from 'react';
import '../NewCollections/NewCollections.css';
import { Link } from 'react-router-dom';

const NewCollections = () => {

  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the fetched data is an array of books
        // Limiting to first 8 products
        setNew_Collection(data.slice(50, 58));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((book) => {
          return (
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
  )
}

export default NewCollections;
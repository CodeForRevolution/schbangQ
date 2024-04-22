import React, { useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { Link } from 'react-router-dom';

export const ShopCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
      .then(response => response.json())
      .then(data => {
        setAllProducts(data);
        // Extract all authors and genres
        const allAuthors = [];
        const allGenres = [];
        data.forEach((book) => {
          book.volumeInfo.authors?.forEach((author) => {
            if (!allAuthors.includes(author)) {
              allAuthors.push(author);
            }
          });
          book.volumeInfo.categories?.forEach((category) => {
            if (!allGenres.includes(category)) {
              allGenres.push(category);
            }
          });
        });
        setAuthors(allAuthors.sort());
        setGenres(allGenres.sort());
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (selectedAuthor) {
      filtered = filtered.filter(book => 
        book.volumeInfo.authors?.includes(selectedAuthor));
    }
    if (selectedGenre) {
      filtered = filtered.filter(book => 
        book.volumeInfo.categories?.includes(selectedGenre));
    }
    setFilteredProducts(filtered);
  }, [selectedAuthor, selectedGenre, allProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };
  
  return (
    <div className='shop-category' style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>  {/* Background color and padding */}
      <img className='shopcategory-banner' src={props.banner} alt='banner' />
      <div className='shopcategory-indexSort' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}> {/* Flexbox for layout */}
        <p>
          <span>Showing {filteredProducts.length} Products</span>
        </p>
        <div className='shopcategory-sort'>
          Filter by Author:
          <select onChange={handleAuthorChange} value={selectedAuthor} style={{ marginLeft: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>
        <div className='shopcategory-sort'>
          Filter by Genre:
          <select onChange={handleGenreChange} value={selectedGenre} style={{ marginLeft: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='shopcategory-products' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}> {/* Flexbox for product layout */}
        {filteredProducts.map((book) => (
          <Link to={`/product/${book.id}`} key={book.id} style={{ textDecoration: 'none', width: 'calc(25% - 10px)', margin: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}> {/* Link styles, product layout, hover effect */}
            <div className="book-item" style={{ backgroundColor: '#fff', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '4px', padding: '10px', transition: 'transform 0.2s ease-in-out' }}> {/* Book item styles, hover effect */}
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} style={{ width: '100%', marginBottom: '10px' }} />
              <h2>{book.volumeInfo.title}</h2>
              <p>Author(s): {book.volumeInfo.authors?.join(', ')}</p>
              <p>Genre(s): {book.volumeInfo.categories?.join(', ')}</p>
              <p>Rating: {book.volumeInfo.averageRating || 'N/A'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
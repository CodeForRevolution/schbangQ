import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import { useParams } from 'react-router-dom';
import star_icon from '../Assests/star_icon.png';
import star_dull_icon from '../Assests/star_dull_icon.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://d1krvzwx5oquy1.cloudfront.net/books.json`)
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find(book => book.id === parseInt(productId));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [productId]);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* Display main image */}
          <img src={product.volumeInfo.imageLinks?.thumbnail} alt="img" />
          <img src={product.volumeInfo.imageLinks?.thumbnail} alt="img" />
          <img src={product.volumeInfo.imageLinks?.thumbnail} alt="img" />
          <img src={product.volumeInfo.imageLinks?.thumbnail} alt="img" />
          {/* Display additional images if available */}
          {product.volumeInfo.additionalImageLinks && product.volumeInfo.additionalImageLinks.map((image, index) => (
            <img key={index} src={image} alt={`img${index}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          {/* Display main image */}
          <img className='productdisplay-main-img' src={product.volumeInfo.imageLinks?.thumbnail} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.volumeInfo.title}</h1>
        <p>Author(s): {product.volumeInfo.authors.join(', ')}</p>
        <div className="productdisplay-right-stars">
          {/* Render stars based on rating */}
          {product.volumeInfo.averageRating ? (
            <>
              {Array.from({ length: Math.floor(product.volumeInfo.averageRating) }, (_, index) => (
                <img key={index} src={star_icon} alt="star" />
              ))}
              {Array.from({ length: 5 - Math.floor(product.volumeInfo.averageRating) }, (_, index) => (
                <img key={index} src={star_dull_icon} alt="star" />
              ))}
            </>
          ) : (
            <p>N/A</p>
          )}
          <p>({product.volumeInfo.ratingsCount})</p>
        </div>
        <div className="productdisplay-right-description">
          <p>{product.volumeInfo.description}</p>
        </div>
        {/* Add to cart button */}
      <a href="https://www.schbang-q.com/"><button >SchbangQ</button></a> 
        <ToastContainer style={{marginTop: "77.5px"}} />
      </div>
    </div>
  );
};

export default ProductDisplay;

import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '20px', marginTop: '10px', backgroundColor: '#f0f0f0', textAlign: 'center', position: 'relative', 
        bottom: 0}}>
      <div>
        <p>&copy; {new Date().getFullYear()} Book Assignment App</p>
        <p>
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by{' '}
          <a href="https://example.com" style={{ color: '#000', textDecoration: 'none' }}>
            Mesho254
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Topic cannot be empty');
      return;
    }

    setLoading(true);
    setError('');
    setArticles([]);

    try {
      const response = await axios.post('https://procuzy2-article-scraper.onrender.com/scrape', { topic });
      setArticles(response.data);
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Medium Article Scraper</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={handleInputChange}
          placeholder="Enter a topic"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div className="loading"></div>}
      {error && <div className="error">{error}</div>}
      <div className="articles">
        {articles.map((article) => (
          <div key={article.link} className="article">
            <h2>{article.title}</h2>
            <p>By {article.author}</p>
            <button
              onClick={() => window.open(article.link, '_blank')}
            >
              Read More on Medium
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

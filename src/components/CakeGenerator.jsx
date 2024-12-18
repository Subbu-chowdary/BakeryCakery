import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch images from the backend
  const handleSearch = async () => {
    if (!searchTerm) return; // Prevent empty searches
    setLoading(true);
    setError("");
    setImages([]); // Clear old results

    try {
      const response = await axios.post(
        `http://localhost:5555/image/generate`, // Assuming backend is running on port 5555
        {
          prompt: searchTerm, // Sending prompt in the request body
        },
      );
      // Assuming the backend returns an image URL
      setImages([response.data]); // Storing the image URL in images array
    } catch (err) {
      setError("Error generating image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cake, Your Style</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Display images below the search bar */}
      <div style={styles.imageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Generated Image ${index + 1}`}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  // Main container centers everything
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Adjusted to allow content overflow
    margin: "0",
    textAlign: "center",
    padding: "30px",
  },
  title: {
    color: "#003366",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "300px",
    marginRight: "10px",
    border: "1px solid #003366",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  loading: {
    fontSize: "18px",
    color: "#666",
  },
  error: {
    color: "red",
    fontSize: "16px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px", // Spacing between images
    marginTop: "20px",
    maxWidth: "1000px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover", // Ensures images are properly sized
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

// Main App component
const CakeGenerator = () => {
  return (
    <div style={appStyles}>
      <ImageSearch />
    </div>
  );
};

const appStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  margin: "0",
  backgroundColor: "#e9ecef",
};

export default CakeGenerator;

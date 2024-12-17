import React from "react";
import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs"; // Import NavigationTabs if needed
import Section from "../components/Section";
import "./HomePage.css";

// Import images
import thornAndRoses from "../assets/abstract-elegant-winter-book-cover_23-2148798745.avif";
import mistAndFury from "../assets/atomic-love-wattpad-book-cover_23-2149231553.avif";
import frostAndStarlight from "../assets/images.jpg";
import wingsAndRuins from "../assets/book_cover_34.webp";

const HomePage = () => {
  const popularBooks = [
    { id: 1, title: "Thorn and Roses", image: thornAndRoses, author: "Sarah J. Maas" },
    { id: 2, title: "Mist and Fury", image: mistAndFury, author: "Sarah J. Maas" },
  ];

  const ebooks = [
    { id: 3, title: "Frost and Starlight", image: frostAndStarlight, author: "Sarah J. Maas" },
    { id: 4, title: "Wings and Ruin", image: wingsAndRuins, author: "Sarah J. Maas" },
  ];

  return (
    <div className="homepage-container">
      <Header />
      <NavigationTabs /> {/* Render NavigationTabs here */}
      <div className="sections">
        <Section title="Popular" books={popularBooks} />
        <Section title="eBooks" books={ebooks} />
      </div>
    </div>
  );
};

export default HomePage;

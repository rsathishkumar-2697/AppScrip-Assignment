import React, { useEffect, useState } from "react";
import "./index.css";
import Wishlist from '../../assets/icons/heart.svg'
import Liked from '../../assets/icons/RedHeart.svg'

const AccordionSection = ({ title, isOpen, toggleAccordion }) => {
  return (
    <>
      <p className="accordion-header" onClick={toggleAccordion}>
        {title}
      </p>
      {isOpen && (
        <div className="accordion-content">
          <p>All</p>
          <div className="options">
            <label>
              <input type="checkbox" />
              Option 1
            </label>
            <label>
              <input type="checkbox" />
              Option 2
            </label>
            <label>
              <input type="checkbox" />
              Option 3
            </label>
          </div>
        </div>
      )}
    </>
  );
};

const Home = () => {
  const [accordionVisible, setAccordionVisible] = useState(false);
  const [sections, setSections] = useState([
    { title: "Ideal For", isOpen: false },
    { title: "Occasion", isOpen: false },
    { title: "Work", isOpen: false },
    { title: "Fabric", isOpen: false },
    { title: "Segment", isOpen: false },
    { title: "Suitable For", isOpen: false },
    { title: "Raw Materials", isOpen: false },
    { title: "Pattern", isOpen: false },
  ]);

  const toggleAccordion = () => {
    setAccordionVisible(!accordionVisible);
  };

  const toggleSection = (index) => {
    const newSections = [...sections];
    newSections[index].isOpen = !newSections[index].isOpen;
    setSections(newSections);
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const itemsWithLiked = data.map(item => ({ ...item, isLiked: false }));
        setItems(itemsWithLiked);
      } catch (error) {
        console.error("ERROR!!!", error);
      }
    };
    fetchData();
  }, []);

  const handleWishlist = (index) => {
    const newItems = [...items];
    newItems[index].isLiked = !newItems[index].isLiked; // Toggle the liked state for the specific item
    setItems(newItems);
  };

  return (
    <div className="home">
      <div className="homeBanner">
        <div className="itemsFilter">
          <h6 className="items">3425 ITEMS</h6>
          <div className="filter">
            <div
              className="accordion"
              style={{ display: accordionVisible ? "block" : "none" }}>
              {sections.map((section, index) => (
                <AccordionSection
                  key={index}
                  title={section.title}
                  isOpen={section.isOpen}
                  toggleAccordion={() => toggleSection(index)}
                />
              ))}
            </div>
            <p className="show-filter" onClick={toggleAccordion}>
              {!accordionVisible?'SHOW' :'CLOSE'} FILTER
            </p>
          </div>
        </div>

        <select className="list-items">
          <option>RECOMMENDED</option>
          <option>NEWEST FIRST</option>
          <option>POPULAR</option>
          <option>PRICE : HIGH TO LOW</option>
          <option>PRICE : LOW TO HIGH</option>
        </select>
      </div>
      <hr />
      <div>
        <div className="card-container">
          {items.length > 0 &&
            items.map((item, index) => (
              <div className="card" key={index}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-products"
                />
                <h6 className="product-title">{item.title}</h6>

                <div className="wishlist">
                  <p>
                    <a href="/">Sign</a> or create an account to see price
                  </p>
                  <img src={item.isLiked ? Liked : Wishlist} onClick={() => handleWishlist(index)} alt="wishlist" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

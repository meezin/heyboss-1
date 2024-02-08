import { useState } from 'react';
import AboutData from '../../aboutdb.json'; 

export default function Slide({ slide, onNavClick }) {
  // State to track active navigation item
  const [activeNav, setActiveNav] = useState('');
  const navItems = AboutData.navItems;

  
  // Handle navigation click
  const handleNavClick = (id) => {
    setActiveNav(slide.name);
    onNavClick(id);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row">
      {/* Right Column for Image */}
      <div className="md:w-1/2 md:order-2">
        <div
          className="image bg-cover bg-no-repeat bg-center w-full h-screen"
          style={{ backgroundImage: `url('${slide.img_url}')` }}
          aria-label={slide.name}
        ></div>
      </div>
      {/* Left Column for Text */}
      <div className="md:w-1/2 md:order-1 p-8">
        <div className="space-y-4">
          {/* Navigation */}
          <nav>
          <ul className="flex space-x-4 font-semibold">
              {navItems.map(item => (
                <li
                  key={item.id}
                  className={`hover:text-gray-600 ${activeNav === item.name ? 'border-b-2' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
          {/* Quote */}
          <blockquote className="italic">
            {slide.quote}
          </blockquote>
          {/* Biography Text */}
          <p className="text-sm">
            {slide.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
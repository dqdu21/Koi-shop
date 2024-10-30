import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import '../../styles/contents.css';

interface Heading {
  id: string;
  title: string;
}

interface TocProps {
    headings: Heading[];
    isOpen: boolean; 
    onClose: () => void; 
  }
  

const ModalContents: React.FC<TocProps> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 67; 
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Đóng modal nếu cần
  };
  

  return (
    <div className="toc-container">
      <button
        className="toc-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Mục lục"
        aria-label="Toggle Table of Contents"
      >
        <MenuOutlined className="toc-icon" />
        <span className="toc-label">Mục Lục</span>
      </button>

      {isOpen && (
        <div className="toc-table-of-contents shadow rounded border">
          <div className="toc-header border-b flex justify-between">
            <span>Mục Lục</span>
            <button className="close-button" onClick={() => setIsOpen(false)}>x</button>
            </div>
          <div className="toc-content">
            {/* Thay thế các nút bằng ul + li */}
            <ul>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className="toc-content-item"
                  onClick={() => handleClick(heading.id)}
                >
                  {heading.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalContents;

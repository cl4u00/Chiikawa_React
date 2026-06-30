import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="language-selector-container">
      <button
        className="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Cambiar idioma"
      >
        🌐
      </button>
      
      {isOpen && (
        <div className="language-selector-menu">
          <button onClick={() => changeLanguage('es')}>ES</button>
          <button onClick={() => changeLanguage('ja')}>JA</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
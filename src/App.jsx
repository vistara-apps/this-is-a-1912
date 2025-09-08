import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RightsCard from './components/RightsCard';
import Dashboard from './components/Dashboard';
import { rightsCards, categories } from './data/rightsCards';

function App() {
  const [activeCategory, setActiveCategory] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasedCards, setPurchasedCards] = useState(['basic-rights-overview']); // Free card is pre-purchased

  const handlePurchase = (cardId) => {
    setPurchasedCards(prev => [...prev, cardId]);
  };

  const filteredCards = useMemo(() => {
    let filtered = rightsCards;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (activeCategory && !['home', 'emergency', 'scenarios', 'education', 'premium', 'settings'].includes(activeCategory)) {
      filtered = filtered.filter(card => card.category === activeCategory);
    } else if (activeCategory === 'premium') {
      filtered = filtered.filter(card => card.isPremium);
    } else if (activeCategory === 'emergency') {
      filtered = filtered.filter(card => 
        card.tags.includes('police') || 
        card.category === 'Police Encounters'
      );
    }

    return filtered;
  }, [searchTerm, activeCategory]);

  const renderContent = () => {
    if (activeCategory === 'home') {
      return <Dashboard purchasedCards={purchasedCards} rightsCards={rightsCards} />;
    }

    if (activeCategory === 'settings') {
      return (
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
          <p className="text-gray-600">Settings panel coming soon...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {activeCategory === 'emergency' && 'Emergency Rights Cards'}
              {activeCategory === 'scenarios' && 'Scenario-Specific Guides'}
              {activeCategory === 'education' && 'Rights Education'}
              {activeCategory === 'premium' && 'Premium Content'}
              {!['home', 'emergency', 'scenarios', 'education', 'premium', 'settings'].includes(activeCategory) && activeCategory}
            </h2>
            <p className="text-gray-600">
              {filteredCards.length} {filteredCards.length === 1 ? 'guide' : 'guides'} available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <RightsCard
              key={card.cardId}
              card={card}
              isPurchased={purchasedCards.includes(card.cardId)}
              onPurchase={handlePurchase}
            />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rights guides found</p>
            <p className="text-gray-400">Try adjusting your search or browse different categories</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
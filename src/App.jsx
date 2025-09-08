import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RightsCard from './components/RightsCard';
import Dashboard from './components/Dashboard';
import EscalationGuide from './components/EscalationGuide';
import SubscriptionManager from './components/SubscriptionManager';
import { rightsCards, categories } from './data/rightsCards';
import { useUser } from './contexts/UserContext';

function App() {
  const [activeCategory, setActiveCategory] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use the user context for state management
  const { 
    canAccessCard, 
    addPurchase, 
    viewCard, 
    addSearchTerm,
    subscription,
    setSubscription,
    isPremiumUser
  } = useUser();

  const handlePurchase = (cardId, amount) => {
    addPurchase(cardId, amount);
  };

  const handleCardView = (cardId) => {
    viewCard(cardId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      addSearchTerm(term);
    }
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
      return <Dashboard rightsCards={rightsCards} />;
    }

    if (activeCategory === 'settings') {
      return (
        <div className="space-y-6">
          <SubscriptionManager 
            userSubscription={subscription}
            onSubscriptionChange={setSubscription}
          />
        </div>
      );
    }

    if (activeCategory === 'escalation') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Escalation & Recourse Guidance</h2>
            <p className="text-gray-600 mb-6">
              Step-by-step guidance for escalating rights violations and seeking recourse through proper channels.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {['Police Encounters', 'Workplace Rights', 'Housing Rights'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(`escalation-${category.toLowerCase().replace(' ', '-')}`)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <p className="text-sm text-gray-600 mt-1">View escalation steps</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeCategory.startsWith('escalation-')) {
      const category = activeCategory.replace('escalation-', '').replace('-', ' ');
      const categoryName = category.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      return (
        <div className="space-y-6">
          <button
            onClick={() => setActiveCategory('escalation')}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Escalation Guide
          </button>
          <EscalationGuide category={categoryName} />
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
              isPurchased={canAccessCard(card)}
              onPurchase={(cardId) => handlePurchase(cardId, card.price)}
              onView={() => handleCardView(card.cardId)}
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
        setSearchTerm={handleSearch}
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

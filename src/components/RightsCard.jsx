import React, { useState } from 'react';
import { Lock, DollarSign, Eye, Shield, Clock } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';
import Modal from './Modal';
import ReactMarkdown from 'react-markdown';

const RightsCard = ({ card, isPurchased, onPurchase, onView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { createSession } = usePaymentContext();

  const handleCardClick = () => {
    if (!card.isPremium || isPurchased) {
      setIsModalOpen(true);
      if (onView) onView();
    }
  };

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      await createSession(`$${card.price}`);
      onPurchase(card.cardId);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const canAccess = !card.isPremium || isPurchased;

  return (
    <>
      <div 
        className={`bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg ${
          canAccess ? 'cursor-pointer' : ''
        }`}
        onClick={canAccess ? handleCardClick : undefined}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>{card.category}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>2-3 min read</span>
              </div>
            </div>
            
            {card.isPremium && (
              <div className="flex items-center space-x-2">
                {!isPurchased && <Lock className="w-4 h-4 text-gray-400" />}
                <span className={`text-sm font-medium ${isPurchased ? 'text-green-600' : 'text-gray-500'}`}>
                  {isPurchased ? 'Purchased' : `$${card.price}`}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {card.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            {canAccess ? (
              <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium">
                <Eye className="w-4 h-4" />
                <span>View Rights Guide</span>
              </button>
            ) : (
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>Purchase ${card.price}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={card.title}
        size="large"
      >
        <div className="prose prose-purple max-w-none">
          <ReactMarkdown>{card.contentMarkdown}</ReactMarkdown>
        </div>
      </Modal>
    </>
  );
};

export default RightsCard;

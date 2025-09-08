import React from 'react';
import { TrendingUp, Users, Clock, Star } from 'lucide-react';

const Dashboard = ({ purchasedCards, rightsCards }) => {
  const stats = [
    {
      label: 'Rights Cards',
      value: rightsCards.length,
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Purchased',
      value: purchasedCards.length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Categories',
      value: '8',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Last Updated',
      value: '2h ago',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentCards = rightsCards.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Pocket Rights Pro</h2>
        <p className="text-purple-100 mb-4">
          Your essential guide to understanding and exercising your rights in any situation.
        </p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Explore Rights Cards
        </button>
      </div>

      {/* Recent Cards */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Added</h3>
        <div className="space-y-3">
          {recentCards.map((card) => (
            <div key={card.cardId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{card.title}</h4>
                <p className="text-sm text-gray-600">{card.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {card.isPremium && (
                  <span className="text-sm text-purple-600 font-medium">${card.price}</span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  card.isPremium ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                }`}>
                  {card.isPremium ? 'Premium' : 'Free'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
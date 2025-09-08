import React, { useState } from 'react';
import { Crown, Check, X, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const SubscriptionManager = ({ userSubscription, onSubscriptionChange }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { createSession } = usePaymentContext();

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free Access',
      price: 0,
      period: 'forever',
      features: [
        'Access to basic constitutional rights guide',
        'Limited emergency rights cards',
        'Basic search functionality'
      ],
      limitations: [
        'No premium content access',
        'No escalation guides',
        'No subscription-only features'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Access',
      price: 4.99,
      period: 'month',
      popular: true,
      features: [
        'Access to ALL rights guides and cards',
        'Complete escalation & recourse pathways',
        'Advanced search and filtering',
        'Scenario-specific cheat sheets',
        'Regular content updates',
        'Priority customer support',
        'Offline access (coming soon)',
        'Personalized rights dashboard'
      ],
      limitations: []
    }
  ];

  const handleSubscribe = async (planId) => {
    if (planId === 'free') return;
    
    try {
      setIsProcessing(true);
      const plan = subscriptionPlans.find(p => p.id === planId);
      await createSession(`$${plan.price}`);
      
      // Simulate subscription activation
      onSubscriptionChange({
        plan: planId,
        status: 'active',
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        price: plan.price
      });
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = () => {
    // Simulate subscription cancellation
    onSubscriptionChange({
      plan: 'free',
      status: 'cancelled',
      nextBilling: null,
      price: 0
    });
    setShowCancelConfirm(false);
  };

  const isSubscribed = userSubscription?.plan === 'premium' && userSubscription?.status === 'active';

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      {isSubscribed && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium Subscriber</h3>
                <p className="text-sm text-gray-600">
                  Next billing: {userSubscription.nextBilling?.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">${userSubscription.price}/month</p>
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Cancel subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl border-2 p-6 ${
              plan.popular
                ? 'border-purple-300 shadow-lg'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                {plan.period !== 'forever' && (
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isProcessing || (isSubscribed && plan.id === 'premium')}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                plan.id === 'free'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : isSubscribed && plan.id === 'premium'
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isSubscribed && plan.id === 'premium' ? (
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Current Plan</span>
                </div>
              ) : plan.id === 'free' ? (
                'Current Plan'
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Subscribe Now</span>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Billing Information */}
      {isSubscribed && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Next Billing Date</p>
                <p className="text-sm text-gray-600">
                  {userSubscription.nextBilling?.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Method</p>
                <p className="text-sm text-gray-600">Crypto Wallet</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Cancel Subscription</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your premium subscription? You'll lose access to:
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">All premium rights guides</span>
              </li>
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Escalation & recourse pathways</span>
              </li>
              <li className="flex items-center space-x-2">
                <X className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Advanced features</span>
              </li>
            </ul>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;

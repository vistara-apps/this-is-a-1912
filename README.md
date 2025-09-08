# Pocket Rights Pro

**Your pocket guide to essential rights, instantly accessible.**

Pocket Rights Pro empowers individuals with immediate, easy-to-understand information about their rights during common stressful situations and for specific legal scenarios.

## 🚀 Features

### Core Features Implemented

#### 1. Emergency Rights Snapshot Cards
- **Digital rights cards** with quick-reference information for high-pressure situations
- **Police encounters**, traffic stops, arrest procedures
- **Workplace discrimination** and harassment guidance
- **Housing rights** including tenant protections and eviction defense
- **Healthcare rights** and patient protections
- **Education rights** for students and parents

#### 2. Scenario-Specific Cheat Sheets
- **Detailed guides** for complex legal situations
- **Step-by-step procedures** for common rights scenarios
- **Escalation pathways** for when rights are violated
- **Resource links** and contact information

#### 3. Proactive Rights Education
- **Constitutional rights overview** (free content)
- **Educational modules** on various rights topics
- **Search functionality** to find relevant information quickly
- **Usage tracking** to personalize experience

#### 4. Escalation & Recourse Guidance
- **Interactive escalation guides** for different rights categories
- **Step-by-step processes** for filing complaints and seeking recourse
- **Timeline information** and priority levels
- **Contact information** for relevant agencies and organizations

### Technical Implementation

#### Frontend Architecture
- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** with custom design tokens
- **Lucide React** for consistent iconography

#### State Management
- **UserContext** with React Context API
- **Local storage persistence** for user data
- **Purchase tracking** and subscription management
- **Usage analytics** and search history

#### Payment Integration
- **Crypto wallet integration** with Wagmi and RainbowKit
- **x402-axios** for micro-payments
- **Subscription management** with premium tiers
- **Individual card purchases** for targeted access

#### Design System
- **Custom color palette** with semantic tokens
- **Consistent spacing** and typography scales
- **Responsive grid system** (12-column fluid)
- **Accessible components** with proper ARIA labels

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with crypto wallet support

### Installation
```bash
# Clone the repository
git clone https://github.com/vistara-apps/this-is-a-1912.git
cd this-is-a-1912

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
The app uses RainbowKit for wallet connections. Make sure you have:
- A compatible crypto wallet (MetaMask, WalletConnect, etc.)
- Test tokens for development (use testnets)

## 📱 Usage

### For Users
1. **Browse Rights Cards**: Explore available rights guides by category
2. **Search Content**: Use the search bar to find specific rights information
3. **Purchase Premium Content**: Buy individual cards or subscribe for full access
4. **Access Escalation Guides**: Get step-by-step guidance for rights violations
5. **Track Usage**: View your dashboard for purchase history and usage stats

### For Developers
1. **Add New Rights Cards**: Update `src/data/rightsCards.js`
2. **Customize Design**: Modify `tailwind.config.js` for design tokens
3. **Extend Features**: Add new components in `src/components/`
4. **Update User Context**: Modify `src/contexts/UserContext.jsx` for new user data

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with stats
│   ├── EscalationGuide.jsx    # Step-by-step escalation guidance
│   ├── Header.jsx             # Top navigation bar
│   ├── Modal.jsx              # Reusable modal component
│   ├── RightsCard.jsx         # Individual rights card display
│   ├── Sidebar.jsx            # Left navigation sidebar
│   └── SubscriptionManager.jsx # Premium subscription management
├── contexts/
│   └── UserContext.jsx        # Global user state management
├── data/
│   └── rightsCards.js         # Rights content database
├── hooks/
│   └── usePaymentContext.js   # Payment integration hook
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
```

### Data Models

#### User
```javascript
{
  userId: string,
  email: string,
  walletAddress: string,
  isConnected: boolean
}
```

#### Subscription
```javascript
{
  plan: 'free' | 'premium',
  status: 'active' | 'cancelled',
  nextBilling: Date,
  price: number
}
```

#### RightsCard
```javascript
{
  cardId: string,
  title: string,
  category: string,
  contentMarkdown: string,
  tags: string[],
  price: number,
  isPremium: boolean
}
```

#### Purchase
```javascript
{
  purchaseId: string,
  userId: string,
  cardId: string,
  purchaseDate: Date,
  amount: number
}
```

## 💰 Business Model

### Pricing Strategy
- **Free Tier**: Basic constitutional rights guide and limited content
- **Premium Subscription**: $4.99/month for full access to all content
- **Individual Purchases**: $0.99-$3.49 per specialized guide

### Revenue Streams
1. **Monthly subscriptions** for premium access
2. **Individual card purchases** for targeted needs
3. **Future**: Corporate licensing for organizations

## 🔒 Security & Privacy

### Data Protection
- **Local storage** for user preferences and purchase history
- **No personal data collection** beyond wallet addresses
- **Encrypted payment processing** through crypto wallets

### Content Security
- **Markdown sanitization** for user-generated content
- **XSS protection** in all user inputs
- **Secure payment flows** with x402 protocol

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t pocket-rights-pro .

# Run container
docker run -p 3000:3000 pocket-rights-pro
```

### Environment Variables
- `VITE_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID
- `VITE_PAYMENT_API_URL`: Payment processing endpoint

## 🤝 Contributing

### Development Guidelines
1. **Follow React best practices** and hooks patterns
2. **Use TypeScript** for new components (migration in progress)
3. **Maintain accessibility** standards (WCAG 2.1)
4. **Test thoroughly** before submitting PRs

### Content Guidelines
1. **Accurate legal information** - verify all rights content
2. **Plain language** - avoid legal jargon when possible
3. **Regular updates** - keep content current with law changes
4. **Cite sources** - provide references for legal claims

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### For Users
- **In-app help**: Use the escalation guides for rights violations
- **Legal disclaimer**: This app provides general information, not legal advice
- **Emergency situations**: Contact local authorities or legal aid organizations

### For Developers
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check inline code comments and this README
- **Community**: Join discussions in GitHub Discussions

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core rights cards database
- ✅ Payment integration
- ✅ Escalation guidance system
- ✅ User dashboard and analytics

### Phase 2 (Next)
- [ ] Mobile app (React Native)
- [ ] Offline access for premium users
- [ ] Multi-language support
- [ ] Advanced search with AI

### Phase 3 (Future)
- [ ] Community-contributed content
- [ ] Legal professional verification
- [ ] Integration with legal aid organizations
- [ ] Corporate/organizational licensing

---

**Disclaimer**: Pocket Rights Pro provides general information about legal rights and is not a substitute for professional legal advice. Always consult with qualified legal professionals for specific legal situations.

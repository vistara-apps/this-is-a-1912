export const rightsCards = [
  {
    cardId: "police-encounter-1",
    title: "Police Stop Rights",
    category: "Police Encounters",
    contentMarkdown: `
# Your Rights During a Police Stop

## Key Rights:
- **Right to Remain Silent**: You don't have to answer questions beyond providing identification
- **Right to Refuse Searches**: You can say "I do not consent to searches"
- **Right to Leave**: Ask "Am I free to go?" If yes, you can leave calmly
- **Right to an Attorney**: If arrested, clearly state you want a lawyer

## What to Do:
1. Keep your hands visible
2. Stay calm and polite
3. Don't resist physically
4. Remember details for later

## What NOT to Do:
- Don't run or resist
- Don't lie or provide false information
- Don't consent to searches
- Don't argue about your rights

**Remember**: You can protect your rights while staying safe.
    `,
    tags: ["police", "traffic stop", "arrest", "rights"],
    price: 1.99,
    isPremium: true
  },
  {
    cardId: "workplace-discrimination-1",
    title: "Workplace Discrimination Guide",
    category: "Workplace Rights",
    contentMarkdown: `
# Workplace Discrimination: Know Your Rights

## Protected Classes:
- Race, color, religion, sex, national origin
- Age (40+), disability, pregnancy
- Sexual orientation, gender identity (varies by state)

## Forms of Discrimination:
- **Hiring/Firing**: Based on protected characteristics
- **Harassment**: Creating hostile work environment
- **Retaliation**: Punishment for reporting discrimination
- **Unequal Treatment**: Different standards for similar situations

## Steps to Take:
1. Document everything (dates, witnesses, evidence)
2. Report to HR or management
3. File complaint with EEOC within 180-300 days
4. Consider legal consultation

## Your Rights:
- Right to work free from discrimination
- Right to report without retaliation
- Right to reasonable accommodations (if disabled)
    `,
    tags: ["workplace", "discrimination", "harassment", "EEOC"],
    price: 2.49,
    isPremium: true
  },
  {
    cardId: "tenant-rights-1",
    title: "Tenant Rights Essentials",
    category: "Housing Rights",
    contentMarkdown: `
# Essential Tenant Rights

## Basic Rights:
- **Habitability**: Right to safe, livable conditions
- **Privacy**: Landlord must give notice before entry
- **Security Deposit**: Rules for return and deductions
- **No Retaliation**: Protection from revenge evictions

## Common Issues:
### Repairs and Maintenance
- Landlord responsible for major repairs
- Document all requests in writing
- Know your state's warranty of habitability laws

### Rent and Deposits
- Rent increases must follow local laws
- Security deposits have specific return timelines
- Get receipts for all payments

### Eviction Process
- Landlord must follow legal procedures
- You have right to notice and court hearing
- Know your state's eviction timeline

## Emergency Contacts:
- Local tenant rights organizations
- Housing court self-help centers
- Legal aid societies
    `,
    tags: ["tenant", "landlord", "eviction", "deposit", "repairs"],
    price: 1.99,
    isPremium: true
  },
  {
    cardId: "consumer-rights-digital",
    title: "Digital Consumer Rights",
    category: "Consumer Rights",
    contentMarkdown: `
# Digital Consumer Rights Guide

## Key Rights Online:
- **Privacy**: Control over personal data
- **Refunds**: Right to cancel/return digital purchases
- **Security**: Protection from data breaches
- **Transparency**: Clear terms and pricing

## Common Issues:
### Subscription Services
- Right to cancel subscriptions
- Clear disclosure of auto-renewal
- Easy cancellation process required

### Data Privacy
- Right to know what data is collected
- Right to request data deletion
- Right to data portability

### Online Purchases
- Right to refunds for defective digital products
- Protection from fraudulent charges
- Clear return/exchange policies

## Steps When Rights Are Violated:
1. Contact customer service directly
2. Document all communications
3. File complaints with FTC, state AG
4. Consider chargebacks for credit card purchases
5. Report to relevant regulatory bodies

## Useful Resources:
- FTC Consumer Complaint Assistant
- State Attorney General offices
- Better Business Bureau
    `,
    tags: ["digital", "privacy", "subscriptions", "refunds", "data"],
    price: 2.99,
    isPremium: true
  },
  {
    cardId: "basic-rights-overview",
    title: "Constitutional Rights Overview",
    category: "Basic Rights",
    contentMarkdown: `
# Your Constitutional Rights: Quick Reference

## First Amendment Rights:
- **Freedom of Speech**: Express opinions and ideas
- **Freedom of Religion**: Practice any religion or none
- **Freedom of Press**: Access to information
- **Freedom of Assembly**: Peaceful gatherings
- **Right to Petition**: Address government grievances

## Criminal Justice Rights:
- **Fourth Amendment**: Protection from unreasonable searches
- **Fifth Amendment**: Right to remain silent, due process
- **Sixth Amendment**: Right to attorney, speedy trial
- **Eighth Amendment**: Protection from cruel punishment

## Equal Protection:
- **Fourteenth Amendment**: Equal treatment under law
- **Due Process**: Fair legal procedures
- **Equal Protection Clause**: No discrimination by government

## Voting Rights:
- Right to vote without discrimination
- Right to accessible polling places
- Right to language assistance if needed

## Important Notes:
- Rights apply to government actions primarily
- Private entities have different rules
- Rights may have reasonable limitations
- When in doubt, consult legal professionals
    `,
    tags: ["constitution", "basic rights", "first amendment", "due process"],
    price: 0,
    isPremium: false
  }
];

export const categories = [
  { name: "Police Encounters", icon: "👮", count: 1 },
  { name: "Workplace Rights", icon: "💼", count: 1 },
  { name: "Housing Rights", icon: "🏠", count: 1 },
  { name: "Consumer Rights", icon: "🛒", count: 1 },
  { name: "Basic Rights", icon: "⚖️", count: 1 },
  { name: "Traffic & Transportation", icon: "🚗", count: 0 },
  { name: "Healthcare Rights", icon: "🏥", count: 0 },
  { name: "Education Rights", icon: "🎓", count: 0 }
];
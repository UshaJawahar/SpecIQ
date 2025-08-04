# SpecIQ - AI-Powered Sales Inquiry & Knowledge Management Portal

A comprehensive enterprise-grade AI-powered system built with Next.js and Node.js, focusing on LLM-driven information retrieval, industrial standards mapping, tender analysis, and quotation management.

## 🎯 Core Requirements

### 🔐 Role-Based Access Control
- **Secure authentication** and role-based access for all users across all components
- **Four user roles**: Admin, Sales Engineer, Standards Expert, Electrical Team
- **JWT-based authentication** with role-specific permissions

### 🧠 Component 1: AI-Powered Sales Inquiry Acceleration

**LLM and RAG-Based Information Retrieval:**
- Utilize LLM and Retrieval-Augmented Generation (RAG) to dynamically index and retrieve data from large sets of historical emails and project folders
- Handle flexible, non-linear workflows, allowing the system to loop back and re-identify the correct project or client if mismatches occur

**Data Handling and Scalability:**
- Efficiently manage large data volumes (20-50GB per project folder) and thousands of projects
- Dynamically build and adjust data schemas on the fly

**Dashboard and User Interface:**
- Display all relevant information (emails, quotations, service manuals, knowledge base files) for each query to accelerate response times

### 📘 Component 2: Industrial Standards Knowledge Base

**Standards Mapping and Retrieval:**
- Integrate comprehensive database of industrial manufacturing standards (ISO, IEC, DIN, ASTM, API)
- When a client user makes an inquiry for specification for an item, the chatbot identifies the item in question, asks clarifying questions if needed, and maps the query item to relevant items in different standards documents
- Item-related standards are then retrieved and presented to the user

**LLM-Driven Standards Retrieval:**
- Codify standards within the AI, allowing it to quickly retrieve and present the most accurate specifications for the identified item
- Summarize relevant specifications and present them to the user efficiently

### 📊 Component 3: AI-Driven Tender Specification Comparison

**Automated Tender Analysis:**
- When a customer tender or order document is uploaded, the LLM analyzes the document to identify and categorize specifications under various headings like electrical, hydraulic, mechanical, and safety

**Specification Mapping and Comparison:**
- AI maps identified topic headings and specifications to the client's own topic headings and specifications
- Intelligently identifies "Diffs" in specification between end customer and client standards
- Outlines items where standards are exceeded/met/not met and presents to user to take action

### ⚡ Component 4: Electrical Services Quotation Retrieval

**Document Ingestion and Organization:**
- For the electrical division, the system ingests and codifies documents, including Excel files and PDFs, organized in a multi-level folder structure
- Each folder contains 100s of MBs of data

**Automated Quotation Retrieval:**
- When a user inputs an item, the AI traverses the folder structure, identifies the relevant client and purchase order, and retrieves the latest quotation document
- System extracts the latest price for the service item and displays it, improving both speed and accuracy of preparing proposals for electrical systems

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **JWT** for authentication
- **Joi** for validation
- **Helmet** for security
- **Rate limiting** for API protection
- **Multer** for file uploads

## 📁 Project Structure

```
SpecIQ/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   │   ├── page.tsx         # Login & Role-Based Access
│   │   ├── sales-inquiry/   # AI-Powered Sales Inquiry
│   │   ├── knowledge-base/  # Industrial Standards KB
│   │   ├── tender-analysis/ # AI-Driven Tender Analysis
│   │   └── quotation-retrieval/ # Electrical Quotation Retrieval
│   ├── components/          # Reusable components
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   │   ├── auth.js      # Authentication
│   │   │   ├── sales-inquiry.js # Sales inquiry & RAG
│   │   │   ├── knowledge.js # Standards knowledge base
│   │   │   ├── tenders.js   # Tender analysis
│   │   │   └── quotations.js # Quotation retrieval
│   │   └── index.js         # Main server file
│   └── package.json         # Backend dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
```

## 🔐 Demo Login Credentials

For testing purposes, use these demo credentials:

| Role | Company ID | Password | Access |
|------|------------|----------|---------|
| Admin | `admin` | any | Full system access |
| Sales Engineer | `sales` | any | Sales Inquiry & Tender Analysis |
| Standards Expert | `standards` | any | Knowledge Base |
| Electrical Team | `electrical` | any | Quotation Retrieval |

## 📱 Core Components Overview

1. **Login Page** (`/`) - Role-based authentication
2. **Sales Inquiry** (`/sales-inquiry`) - LLM & RAG-based information retrieval
3. **Knowledge Base** (`/knowledge-base`) - Industrial standards mapping & retrieval
4. **Tender Analysis** (`/tender-analysis`) - AI-driven specification comparison
5. **Quotation Retrieval** (`/quotation-retrieval`) - Electrical document search & pricing

## 🎯 Key AI Features

### LLM & RAG Integration
- **Dynamic indexing** of project folders (20-50GB each)
- **Semantic search** across emails, quotations, manuals
- **Relevance scoring** for retrieved information
- **Context-aware responses** based on historical data

### Standards Mapping
- **AI-powered item identification** with clarifying questions
- **Multi-standard database** (ISO, IEC, DIN, ASTM, API)
- **Intelligent specification matching** and retrieval
- **Automated summary generation**

### Tender Analysis
- **Document upload** and AI analysis
- **Specification categorization** (Electrical, Mechanical, Hydraulic, Safety)
- **Diff identification** between customer and client standards
- **Action item recommendations**

### Quotation Retrieval
- **Multi-level folder navigation** (100s of MBs per folder)
- **AI-powered document traversal** and search
- **Price extraction** and history tracking
- **Client and PO filtering**

## 🔧 Development

### Adding New Features
1. Create new page in `frontend/app/`
2. Add route to sidebar navigation
3. Update role permissions if needed
4. Create corresponding backend route in `backend/src/routes/`

### API Integration
- All API endpoints follow RESTful conventions
- JWT authentication required for protected routes
- Rate limiting applied to prevent abuse
- Comprehensive error handling and validation

### Data Management
- Demo data provided for all components
- Scalable architecture for large data volumes
- Efficient indexing and retrieval mechanisms
- Real-time processing capabilities

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository. 
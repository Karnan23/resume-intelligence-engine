# 🚀 Role-Aware Resume Intelligence Engine

A deterministic, role-aware resume evaluation engine built with **Next.js 16 (App Router)** that analyzes resume bullets against real-world job role expectations.

This system evaluates:

- Core skill alignment
- Optional skill coverage
- Action verb strength
- Impact vocabulary usage
- Measurable metrics presence
- Overall weighted scoring

Unlike generic resume checkers, this engine adapts scoring logic based on the selected job role.

---

## 🎯 Problem Statement

Most resume tools:

- Treat all roles the same  
- Provide vague feedback  
- Lack measurable evaluation logic  
- Depend entirely on AI APIs  

This project solves that by implementing a **heuristic-driven, deterministic scoring system** that:

- Uses structured role-based configurations  
- Applies weighted scoring logic  
- Separates core vs optional skills  
- Generates improvement suggestions  
- Remains explainable and interview-safe  

---

## 🧠 System Architecture

### 1️⃣ Role Configuration Layer

```
lib/roles/
  frontend.js
  backend.js
  fullstack.js
  ai.js
  devops.js
```

Each role defines:

- `coreSkills`
- `optionalSkills`
- `strongVerbs`
- `impactWords`

This makes the system modular and easily extensible.

---

### 2️⃣ Analyzer Engine (Business Logic)

Location:

```
lib/analyzer.js
```

Core logic includes:

- Regex-based word-boundary skill detection
- Core & optional alignment percentage calculation
- Weighted scoring model
- Score normalization (max 10)
- Suggestion generation
- Rewrite template output

The scoring is deterministic and explainable.

---

### 3️⃣ API Layer

Location:

```
app/api/analyze/route.js
```

Responsibilities:

- Validates input (including whitespace protection)
- Calls analyzer engine
- Returns structured evaluation result

Backend validation ensures data integrity and security.

---

### 4️⃣ Frontend Layer (Next.js App Router)

Location:

```
app/page.js
```

Features:

- Role dropdown selector
- Resume bullet input
- Client-side validation
- Structured result rendering
- Defensive rendering with optional chaining

---

## 📊 Scoring Model

Total Score: **/10**

| Component | Weight |
|------------|--------|
| Core Skills | 3 pts |
| Optional Skills | 1 pt |
| Strong Verbs | 2 pts |
| Impact Words | 2 pts |
| Metrics Presence | 2 pts |

This weighted system reflects hiring priorities:

- Core stack is more important than optional tools  
- Measurable impact significantly increases resume strength  

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- React
- JavaScript
- Tailwind CSS
- REST API routes
- Regex-based keyword detection

No external AI APIs used.

This ensures:

- Deterministic behavior
- Fast response time
- No external dependency cost
- Full explainability in interviews

---

## 📁 Folder Structure

```
ai-text-insight/
│
├── app/
│   ├── api/analyze/route.js
│   ├── page.js
│   ├── layout.js
│
├── lib/
│   ├── analyzer.js
│   └── roles/
│       ├── frontend.js
│       ├── backend.js
│       ├── fullstack.js
│       ├── ai.js
│       └── devops.js
│
├── public/
├── package.json
└── README.md
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📈 Example Output

The engine provides:

- Overall score
- Core alignment percentage
- Optional alignment percentage
- Missing core skills
- Missing optional skills
- Metrics detection
- Action verb detection
- Impact word detection
- Improvement suggestions
- Rewrite template

---

## 🧩 Extending The System

To add a new role:

1. Create a new role config inside `lib/roles`
2. Add it to `roleMap` in `analyzer.js`
3. Add dropdown option in `page.js`

No change required in core scoring logic.

---

## ⚠ Limitations

- Rule-based detection (no NLP parsing)
- Exact keyword matching
- Rewrite template is heuristic-based
- Does not perform semantic understanding

---

## 🔮 Possible Future Improvements

- Semantic embedding matching
- Resume STAR-format detection
- Grammar quality scoring
- Dynamic job description ingestion
- Hybrid AI + rule-based rewrite engine

---

## 👨‍💻 Author

**Karnan G**  
“Code like a scientist, debug like a detective, and deploy like a boss.” 
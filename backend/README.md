# SigTrans

## Backend

### Project setup

### Installation

#### Local Setup

```bash
1. python -m venv venv
2. source venv/bin/activate for linux || venv\Scripts\activate for windows
3. pip install -r requirements.txt
4. uvicorn main:app --reload
```

#### Docker Setup

```bash
1. docker build -t backend .
2. docker run -p 8000:8000 backend
```
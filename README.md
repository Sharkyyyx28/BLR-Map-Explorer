# BLR Map Explorer

A full-stack web application to explore areas, pincodes, and municipal zones of Bangalore (Bengaluru) on an interactive map. It features a sleek "Noir City" dark theme, dynamic map markers, and quick search capabilities.

## Key Features

- **Interactive Cartography**: Explore Bangalore on a full-screen, dark-themed interactive map powered by Leaflet and CartoDB Dark Matter tiles.
- **Smart Search**: Quickly find locations by searching for either a specific Area Name (e.g., "Indiranagar") or a 6-digit Pincode (e.g., "560038").
- **Dynamic Filtering**: A live-updating sidebar allows you to filter through all available areas in real-time.
- **Visual Data Categorization**: Map markers are color-coded based on their municipal corporation zone (e.g., Bengaluru South, Bengaluru Central), with a floating legend for easy reference.
- **Interactive Details**: Clicking on any area or map marker brings up a detailed information panel, complete with a quick link to open the location in Google Maps.

## Architecture
The project is split into two separate components:
1. **Frontend**: A React application built with Vite and Tailwind CSS.
2. **Backend**: A Python API built with FastAPI.

---

## 1. Backend Setup (FastAPI)

The backend provides the geographical data and search capabilities via REST API endpoints.

### Prerequisites
- Python 3.8+

### Installation & Running Locally
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
3. Start the local server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

---

## 2. Frontend Setup (React / Vite)

The frontend uses Leaflet for mapping and communicates with the backend to display areas and pincodes.

### Prerequisites
- Node.js
- npm or yarn

### Installation & Running Locally
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Ensure there is a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:5173`.

---

## Deployment Configuration

This project is configured to be deployed on platforms like **Vercel** (Frontend) and **Render / Railway** (Backend).

### Frontend Deployment
- Ensure `VITE_API_URL` is set in your hosting provider's dashboard to point to your live backend URL (e.g., `https://your-backend.onrender.com`).

### Backend Deployment
- Ensure the `ALLOWED_ORIGINS` environment variable is set in your hosting provider's dashboard to allow requests from your live frontend URL (e.g., `https://your-frontend.vercel.app`). This prevents CORS errors.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<ItemListContainer greeting="Bienvenido a MotoStore 🏍️" />} 
            />
            <Route 
              path="/category/:categoryId" 
              element={<ItemListContainer />} 
            />
            <Route 
              path="/item/:id" 
              element={<ItemDetailContainer />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

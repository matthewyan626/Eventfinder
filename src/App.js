import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import SearchPage from './pages/SearchPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FavoritesPage from './pages/FavoritesPage'



function App() {


return (
   <BrowserRouter>
        <Routes>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Routes>
   </BrowserRouter>
  )
}
export default App;

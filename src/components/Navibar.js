import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useLocation } from 'react-router-dom'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { Container, Col } from 'react-bootstrap'


const Navibar = () => {

   const location = useLocation();

   return (
      <Navbar className='justify-content-end' bg='clear' style={{marginRight:'10px'}}>
      <NavbarToggle aria-controls='basic-navbar-nav'/>
         <Nav className='justify-content-end' activeKey='/search'>
               <Nav.Item>
                  <Nav.Link 
                     href='/search' 
                     style={{ 
                        border: location.pathname === '/search' ? '1px solid white' : 'none', 
                        borderRadius: '16px',
                        color:'white !important',
                        padding: '10px'
                     }}>Search
                  </Nav.Link>
               </Nav.Item>
            <Nav.Item>
               <Nav.Link 
                  href='/favorites'
                  style={{ 
                     border: location.pathname === '/favorites' ? '1px solid white' : 'none', 
                     borderRadius: '16px',
                     color:'white !important',
                     padding:'10px'
                  }}>Favorites
               </Nav.Link>
            </Nav.Item>
         </Nav>
      </Navbar>   
   )
}

export default Navibar

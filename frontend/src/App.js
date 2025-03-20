import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar';
import Header from './header'
import Map from './Map/Map'

class App extends Component{
  render(){
    return(
        // <div>
        //     <Navbar/>
        //     <Routes>
        //         <Route path="/" element={<ProductAll/>}/>
        //         <Route path="/login" element={<Login/>}/>
        //         <Route path="/product/:id" element={<ProductDetail/>}/>
        //     </Routes>
        // </div>
      <div className="App">
        {/*<Header />*/}
          <Navbar />
        <Map />

      </div>
  );
  }
}
export default App;

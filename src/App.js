import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import Banner from './components/Banner'; 
import About from './components/About'; 
import Cta from './components/Cta'; 

const SnapParent = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} {...props} className="snap-parent-y-mandatory">
    {props.children}
  </div>
));

const Container = ({ children }) => {
  const ref = useRef();

  return (

      <SnapParent ref={ref}>
        {children}
      </SnapParent>
  );
};

function App() {

  return (
    <div id="views" style={{height: '100vh', overflow: 'auto'}}>
      <Container>
        <Banner/>
        <About/>
        <Cta/>
      </Container>
    </div>
  );
}

export default App;
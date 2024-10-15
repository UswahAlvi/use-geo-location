import { useState } from "react";
import { useGeoLocation } from './useGeoLocation';
import './App.css'

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const { position, error, isLoading, getLocation } = useGeoLocation();

  function handleGetPosition() {
    setCountClicks((count) => count + 1);
    getLocation();
  }

  return (
    <div style={{display:'flex', flexDirection:'column', width:'100vw', height:'100vh', backgroundColor:'#76a1a1', justifyContent:'center', alignItems:'center'}}>
      <button className='on-hover' style={{border:'0px', paddingBlock:'2rem',paddingInline:'5rem', MarginBlockEnd:'1rem', fontSize:'20px', cursor: isLoading ? 'not-allowed' : "pointer"}}
      onClick={handleGetPosition} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p style={{paddingBlock:'2rem', fontSize:'20px'}}>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && position.lat && position.lng && (
        <p style={{paddingBlockStart:'2rem', fontSize:'20px'}}>
          Your GPS position: 
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
          >
            {position.lat}, {position.lng}
          </a>
        </p>
      )}

      <p style={{paddingBlockStart:'2rem',fontSize:'20px'}}>You requested your Position {countClicks} {countClicks==1?'time':'times'}.</p>
    </div>
  );
}

import React, {useState, useEffect} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({})
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    zoom: 0
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();    
  }, [])

  return (
    <ReactMapGL 
      {...viewport}
      mapStyle="mapbox://styles/unoits6f0/ck88s1hjc1i231jp7xgpiglzv"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker latitude={entry.latitude} 
                    longitude={entry.longitude} 
                    // offsetLeft={-12}
                    // offsetTop={-24}
                    key={entry._id}>
            <div onClick={() => setShowPopup({
                    ...showPopup,
                    [entry._id]: true,
            })}>
              <img src="https://i.imgur.com/y0G5YTX.png"
                    style={{
                      height: `${8 * viewport.zoom}px`,
                      width: `${8 * viewport.zoom}px`
                    }}
                    alt="marker"
                    className="marker" />
            </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup 
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => this.setState({showPopup: false})}
                  anchor="top" >
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      
    </ReactMapGL>
  )
}

export default App;
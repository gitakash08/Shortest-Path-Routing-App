
import { useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'
import './App.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [Longitude, setLongitude] = useState(77.2194182082579)
  const [Latitude, setLatitude] = useState(28.63290834971705)

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng
      }
    }
  }

  const drawRoute = (geoJson, map) => {
    if (map.getLayer('route')) {
      map.removeLayer('route')
      map.removeSource('route')
    }
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJson
      },
      paint: {
        'line-color': 'red',
        'line-width': 6

      }
    })
  }

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
      .setLngLat(lngLat)
      .addTo(map)
  }
  useEffect(() => {
    const origin = {
      lng: Longitude,
      lat: Latitude,
    }
    const destinations = []

    let map = tt.map({
      key: 'VAhWBJwOyBc78n9BQ7kz4NqCFKjVoIW9',
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [Longitude, Latitude],
      zoom: 15
    });
    map.addControl(new tt.NavigationControl());
    map.addControl(new tt.FullscreenControl());
    setMap(map)
    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25]
      }
      const popup = new tt.Popup({ offset: popupOffset }).setHTML('Akash Tripathi')
      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        draggable: true,
        element: element
      })
        .setLngLat([Longitude, Latitude])
        .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })

      marker.setPopup(popup).togglePopup()
    }
    addMarker()

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
      })
      const callParameters = {
        key: 'VAhWBJwOyBc78n9BQ7kz4NqCFKjVoIW9',
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      }
      return new Promise((resolve, reject) => {
        ttapi.services.matrixRouting(callParameters).then((matrixApiResults) => {
          const results = matrixApiResults.matrix[0]
          const resultsArray = results.map((result, index) => {
            return {
              location: locations[index],
              drivingtime: result.response.routeSummary.travelTimeInSeconds,
            }
          })
          resultsArray.sort((a, b) => {
            return a.drivingtime - b.drivingtime
          })
          const sortedLocations = resultsArray.map((result) => {
            return result.location
          })
          resolve(sortedLocations)
        })
      })
    }


    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin)

        ttapi.services
          .calculateRoute({
            key: 'VAhWBJwOyBc78n9BQ7kz4NqCFKjVoIW9',
            locations: sorted,
          })
          .then((routeData) => {
            const geoJson = routeData.toGeoJson()
            drawRoute(geoJson, map)
          })
      })
    }

    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
      recalculateRoutes()
    })

    return () => {
      map.remove();
    };
  }, [Longitude, Latitude])

  return (
    <>
      <nav class="navbar">
        <h1>Shortest Path</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="about.jsx">About</a></li>
        </ul>
      </nav>
      {map && <div className='app'>
        <div className='search-bar'>
          <h1>Where to?</h1>
          <input type='text'
            id='longitude'
            className='longitude'
            placeholder='Put in Longitude'
            onClick={(e) => { setLongitude(e.target.value) }}
          />

          <input type='text'
            id='latitude'
            className='latitude'
            placeholder='Put in Latitude'
            onChange={(e) => { setLatitude(e.target.value) }}
          />
          <div class="instructions">
            <h2>How to use:</h2>
            <ul>
              <li>First enter Latitude and Longitude of your choice to see on Map.</li>
              <li>Click on the map to select the destination of your choice.</li>
              <li>A route has been created from the source to the destination in the most optimized way.</li>
              <li>Follow the shortest path algorithm.</li>
              <li>You can change the source by dragging the source icon and choose the destination by just clicking on the map.</li>
            </ul>
          </div>
        </div>
        <div ref={mapElement} className='map' />
      </div>}
    </>
  );
}

export default App;

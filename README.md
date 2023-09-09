# Shortest Path Finder using TomTom Maps - README

This repository contains a JavaScript-based web application that allows users to find the shortest path from a source point to multiple destination points using TomTom Maps. The application lets users interactively select destinations on the map and calculates the optimal route in real-time.

## Features

- Interactive map interface for selecting source and destination points.
- Real-time route calculation using the TomTom Maps API.
- Display of the shortest route on the map.
- Ability to change the source point by dragging the source icon.

## Getting Started

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/gitakash08/shortest-path-Routing-App.git
   ```

2. Navigate to the project directory:

   ```
   cd shortest-path-finder
   ```

3. Install the necessary dependencies:

   ```
   npm install
   ```

4. Obtain a TomTom Maps API key by signing up at [TomTom Developer Portal](https://developer.tomtom.com/).

5. Replace the placeholder API key in the code with your own API key. You can find the key replacement in the `useEffect` section of the `App.js` file.

6. Start the development server:

   ```
   npm start
   ```

7. Open your web browser and access the application at `http://localhost:3000`.

## How to Use

1. Enter the initial source point's Longitude and Latitude in the input fields.
2. Click on the map to select destination points. The application will calculate and display the shortest route in real-time.
3. The route will be displayed on the map as a red line.
4. You can change the source point by dragging the source icon to a new location on the map.
5. Follow the most optimized path to reach your destinations.

## Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [TomTom Maps SDK](https://developer.tomtom.com/maps-sdk-web) - Used for map rendering and route calculation.
- [TomTom Maps API](https://developer.tomtom.com/maps-sdk-web) - Used for location-based services.
- [ttapi](https://developer.tomtom.com/maps-sdk-web/ttapi) - JavaScript library for interacting with TomTom APIs.

## Author

- [Akash Tripathi]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TomTom Developer Portal](https://developer.tomtom.com/) for providing the Maps API and SDK for this project.

Feel free to modify and enhance this application according to your needs. If you have any questions or need further assistance, please don't hesitate to reach out.

Enjoy exploring and finding the shortest paths using TomTom Maps!


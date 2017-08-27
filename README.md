# weather_app
Basic weather app in plain HTML, CSS and Javascript.

## HTML
Basic html for displaying
- Weather information
- Server Announcements about the location. (Can be used as emergency broadcast or warning for unexpected weather changes.)
- UV Index (Beta: No API connection, only static example html)
- Suggestions for clothes to wear for current location weather. (Beta: No API connection, only static example html)
- Switch for temperature unit (celsius / fahrenheit)

## Javascript

### SocketsClass
Connect to remote server running node server. Listens for the broadcasts(polling, websocket).
- Subscribes to common announcement and location announcement rooms.
### GeoOperationAPI
Get user's geo position from remote API.
### WeatherAPI
Get weather data from remote API for the location.

## CSS
Bare minumum CSS for the html.

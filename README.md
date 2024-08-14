# marquee effect integrated with spotify API

Created a marquee that plays the song title on spotify when clicked.

1. marquee component.
2. integrating API
3. hide client credentials
4. handle authentication using a serverless function
   you don't need user-specific data, stick with the Client Credentials Flow and use a serverless function to handle authentication securely

spotify api->

1. get request using h1 text to get track ID
2. get request with track ID grab all metadata about track
3. Display the relevant data (album cover and redirecting url)

4. animation using framer motion

# Marquee effect integrated with Spotify API

Created a marquee that plays the song title on spotify when clicked.

Based on the marquee component by [white-coffee](https://white-coffee.com/)
![white-coffee](https://github.com/user-attachments/assets/1b725970-8ae0-4f51-9de7-90c1e43a0c3a)

## Tech Used
- React
- Vite (Build tool)
- CSS for styling
- Spotify API

## Other features 
- Mobile responsive
- Animation using framer motion

## Integrating Spotify API
The working of the app with respect to the API is as:

Spotify gives out client-id and client-secret credentials for accessing the API.
1. Authentication- App fetches access tokens to facilitate incoming requests.
2. Requests- Once auth phase is completed, client can send out requests.
3. Response- Metadata is received and relevant information can be used.

This app doesn't require user-specific spotify data. It uses Client Credentials Flow and a serverless function to handle authentication and secure credentials. It was made on a browser environment with no server/backend setup, therefore it was necessary to ensure that spotify client id and secret are protected.

Read Spotify documentation [here.](https://developer.spotify.com/documentation/web-api)

### Fonts used

1. Editorial new
2. Tiempos italic

Hosted on [Vercel](https://vercel.com)

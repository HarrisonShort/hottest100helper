# Hottest 100 Helper

Hottest 100 Helper is a web-app that allows users to search through their Spotify data (including playlists and saved music) to assist in selecting songs they want to vote for in the Triple J Hottest 100. The app collates tracks from the current year that the user has listened to, saved, or added to playlists, and allows them to add these tracks to a shortlist, which is automatically added as a playlist to their Spotify account.

This project was started to provide a platform for learning web development in React.

## Access
The tool can be accessed through the deployed [Hottest 100 Helper website](https://harrisonshort.github.io/hottest100helper/). To use it, you'll need to have a Spotify account in order to authorize the app to access your Spotify data. Currently the website is only set up for tracks released in 2022.

## Features
Hottest 100 Helper uses the Spotify Web API to interface with your Spotify account. Here are the main ways it accesses your data:

- **Top Tracks:** Collates your "short term," "medium term" and "long term" top tracks, as designated by Spotify, and grabs any from the current year.
- **Saved Tracks:** Searches through your saved tracks and finds any that are from the current year.
- **Saved Albums:** Searches through your saved albums and finds tracks from the current year.
- **Playlist Dropdown:** Selecting a playlist will let the Hottest 100 Helper search through the specific playlist for tracks from the current year.

Users can then easily build a shortlist that appears as a Spotify playlist on their account after desired tracks are found.

## Technologies Used
Hottest 100 Helper was developed using React, a popular JavaScript library for building user interfaces. The app also uses the Spotify Web API, which was made easier by the [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) package. The [react-table](https://react-table-v7.tanstack.com/) package was used in order to build tables more easily.

## Roadmap
Here are some potential improvements for the future:

- **Scrub through entire Spotify profile ("Give Me Everything" Button):** Early on, Hottest 100 Helper was planned to automatically scrub through a user's entire Spotify profile and create a monolith playlist with everything it could find from the current year. This would still be a convenient option, but due to Spotify's rate limits, it could not be implemented at this time.
- **Last.fm support:** Adding support for last.fm would make it easier to find your actual top tracks, due to the way Spotify presents this data.

Please note that development on this project has ended and is unlikely to restart in future.

## Asana Board
[Here](https://imgur.com/2SDGARw) is a screenshot of the final state of the Asana board. It was set up to track later steps of the project.

## Special Thanks
- This README file was written with the assistance of ChatGPT.
- The list of most popular tracks present on the home page of the Hottest 100 Helper was obtained from Reddit user [pulsivesilver](https://www.reddit.com/user/pulsivesilver). You can view their "Top 100 Tracks of 2022" [here](https://www.reddit.com/r/triplej/comments/zzhbb7/triple_j_top_100_tracks_of_2022_final_playlist/). 

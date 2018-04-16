const clientId = "82afdc07735c49c184d803cb620cb167";
const redirectUri = "http://TimYCAReact.surge.sh";

let accessToken;

const SpotifyUtil = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireTimeMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch && expireTimeMatch){
      accessToken = accessTokenMatch[1];
      const expireTime = Number(expireTimeMatch[1]);
      window.setTimeout(() => accessToken = "", expireTime * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    }else{
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = redirectUrl;
    }
  },

  search(searchTerm){
    const accessToken = SpotifyUtil.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, trackUris){
    const accessToken = SpotifyUtil.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;

    return fetch("https://api.spotify.com/v1/me", 
    {
      headers: headers
    }).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default SpotifyUtil;
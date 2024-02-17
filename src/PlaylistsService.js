const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const playlistQuery = {
      text: "select playlists.id, playlists.name from playlists where playlists.id = $1",
      values: [playlistId],
    };
    const result = await this.pool.query(playlistQuery);
    const { id, name } = result.rows[0];
    const songsQuery = {
      text: `select songs.id, songs.title, songs.performer
      from playlist_songs
      left join songs on songs.id = playlist_songs.song_id
      where playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const songs = await this.pool.query(songsQuery);
    const playlist = {
      id,
      name,
      songs: songs.rows,
    };
    return { playlist };
  }
}

module.exports = PlaylistsService;

import React, { useEffect, useState } from 'react';
import { listSongTables} from '../../graphql/queries';
import { updateSongTable} from '../../graphql/mutations';

import ReactPlayer from 'react-player';

import { API, Storage } from 'aws-amplify';


import AddSong from '../AddSong';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Favorite from "@mui/icons-material/Favorite";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";


const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [songPlaying, setSongPlaying] = useState('');
    const [audioURL, setAudioURL] = useState('');
    const [showAddSong, setShowAddSong] = useState(false);

    useEffect(() => {
        fetchSongs();
    }, []);

    const toggleSong = async idx => {
        if (songPlaying === idx) {
            setSongPlaying('');
            return;
        }

        const songFilePath = songs[idx].filePath;
        try {
            const fileAccessURL = await Storage.get(songFilePath, { expires: 60 });
            console.log('access url', fileAccessURL);
            setSongPlaying(idx);
            setAudioURL(fileAccessURL);
            return;
        } catch (error) {
            console.error('error accessing the file from s3', error);
            setAudioURL('');
            setSongPlaying('');
        }
    };

    const fetchSongs = async () => {
        try {
            const songData = await API.graphql({
                query: listSongTables,
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            });
            const songList = songData.data.listSongTables.items;
            console.log('song list', songList);
            setSongs(songList);
        } catch (error) {
            console.log('error on fetching songs', error);
        }
    };

    const addLike = async idx => {
        try {
            const song = { ...songs[idx] };
            song.like = song.like + 1;
            delete song.createdAt;
            delete song.updatedAt;
            delete song.owner;

            const songData = await API.graphql({
                query: updateSongTable,
                variables: { input: song },
                authMode: 'AMAZON_COGNITO_USER_POOLS',
            });
            const songList = [...songs];
            songList[idx] = songData.data.updateSongTable;
            setSongs(songList);
        } catch (error) {
            console.log('error on adding Like to song', error);
        }
    };

    return (
      <div className="songList">
          {songs.map((song, idx) => {
              return (
                  <Paper elevation={2} key={`song${idx}`}>
                      <div className="songCard">
                          <IconButton aria-label="play" onClick={() => toggleSong(idx)}>
                              {songPlaying === idx ? <PauseIcon /> : <PlayArrowIcon />}
                          </IconButton>
                          <div>
                              <div className="songTitle">{song.title}</div>
                              <div className="songAuthor">{song.author}</div>
                          </div>
                          <div>
                              <IconButton aria-label="like" onClick={() => addLike(idx)}>
                                  <Favorite />
                              </IconButton>
                              {song.like}
                          </div>
                          <div className="songDescription">{song.description}</div>
                      </div>
                      {songPlaying === idx ? (
                          <div className="ourAudioPlayer">
                              <ReactPlayer
                                  url={audioURL}
                                  controls
                                  playing
                                  height="50px"
                                  onPause={() => toggleSong(idx)}
                              />
                          </div>
                      ) : null}
                  </Paper>
              );
          })}
          {showAddSong ? (
              <AddSong
                  onUpload={() => {
                      setShowAddSong(false);
                      fetchSongs();
                  }}
              />
          ) : (
              <IconButton onClick={() => setShowAddSong(true)}>
                  <AddIcon />
              </IconButton>
          )}
      </div>
  );
};

export default SongList;

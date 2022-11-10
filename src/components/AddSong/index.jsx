import React, { useState } from 'react';

import { createSongTable } from '../../graphql/mutations';
import { v4 as uuid } from 'uuid';

import { API,Storage } from 'aws-amplify';

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import PublishIcon from "@mui/icons-material/Publish";

const AddSong = ({ onUpload }) => {
  const [songData, setSongData] = useState({});
  const [mp3Data, setMp3Data] = useState();

  const uploadSong = async () => {
    console.log("songData", songData);
    const { title, description, author } = songData;

    const { key } = await Storage.put(`${uuid()}.mp3`, mp3Data, {
      contentType: "audio/mp3",
    });

    const createSongInput = {
      id: uuid(),
      title,
      description,
      author,
      filePath: key,
      like: 0,
    };
    await API.graphql({
      query: createSongTable,
      variables: { input: createSongInput },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    onUpload();
  };

  return (
    <div className="newSong">
      <TextField
        label="Title"
        value={songData.title}
        onChange={(e) => setSongData({ ...songData, title: e.target.value })}
      />
      <TextField
        label="Artist"
        value={songData.author}
        onChange={(e) => setSongData({ ...songData, author: e.target.value })}
      />
      <TextField
        label="Description"
        value={songData.description}
        onChange={(e) =>
          setSongData({ ...songData, description: e.target.value })
        }
      />
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setMp3Data(e.target.files[0])}
      />
      <IconButton onClick={uploadSong}>
        <PublishIcon />
      </IconButton>
    </div>
  );
};

  
export default AddSong;

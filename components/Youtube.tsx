import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import YoutubeV from "react-native-youtube-iframe";
const Youtube = ({ query_search }) => {
  const [videoId, setVideoId] = useState("");
  useEffect(() => {
    const obtenerIdPrimerVideo = async () => {
      try {
        const respuesta = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: query_search + " trailer",
              type: "video",
              key: "AIzaSyA4etg-iBGL-ZNljGjxwaBvucM939UCNuI", // Reemplaza con tu clave de API de YouTube
            },
          }
        );
        const primerVideoId = respuesta.data.items[0].id.videoId;

        // console.log("ID del primer video:", primerVideoId);
        // console.log("query_search:", query_search);
        // console.log("Respuesta:", respuesta.data.items[0].snippet.title);
        setVideoId(primerVideoId);
      } catch (error) {
        console.error("Error al obtener el ID del video:", error);
      }
    };

    obtenerIdPrimerVideo();
  }, [query_search]);
  if (!videoId) {
    return null;
  } else if (videoId) {
    return (
      <View style={{ width: "100%" }}>
        <YoutubeV
          height={300}
          play={true}
          videoId={videoId}
          onChangeState={(event) => console.log(event)}
          onReady={() => console.log("ready")}
          onError={(e) => console.log(e)}
          onPlaybackQualityChange={(q) => console.log(q)}
          volume={50}
          playbackRate={1}
          initialPlayerParams={{
            cc_lang_pref: "us",
            showClosedCaptions: true,
          }}
          //ocultar controles de youtube
        />
      </View>
    );
  }
};

export default Youtube;

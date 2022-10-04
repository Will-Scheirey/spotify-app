import { api } from "../../spotify"
import { InfoCard } from "../InfoCard";

export const renderMe = async () => {
    let topArtists = {};
    let topTracks = {};
    let error = null;
    return (
      api
        .getMyTopArtists({ time_range: "short_term" })
          .then(data => {
            topArtists.short = data.body.items[0];
            return api.getMyTopTracks({time_range: "short_term"});
          }, err => {
          error = err;
          return <h1>{`${err.body.error.status} Error: ${err.body.error.message}`}</h1>
          })
          .then(data => {
            if (error !== null) {
              return data;
            }
          
            topTracks.short = data.body.items[0];

            return api.getMyTopTracks({time_range: "long_term"});
          })
          .then (data => {
            if (error !== null) {
              return data;
            }
            topTracks.long = data.body.items[0];
            return api.getMyTopArtists({ time_range: "long_term" })
          })
          .then (data => {
            if (error !== null) {
              return data;
            }
            topArtists.long = data.body.items[0];

            const content = (
            <div className="object-info">
              <div className="object-info-container">
                <InfoCard type="me" me={true}></InfoCard>
              </div>
                <div className="secondary-object-info">
                  <InfoCard type="artist" id={topArtists.short.id} isTopArtist={true} timeFrame={"short"}></InfoCard>
                  <InfoCard type="track" id={topTracks.short.id} isTopTrack={true} timeFrame={"short"}></InfoCard>
                  <InfoCard type="artist" id={topArtists.long.id} isTopArtist={true} timeFrame={"long"}></InfoCard>
                  <InfoCard type="track" id={topTracks.long.id} isTopTrack={true} timeFrame={"long"}></InfoCard>
                </div>
            </div>
           
            );
            return content;
          })
    );
}
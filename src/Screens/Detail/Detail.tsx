import React from "react";
import {
  NavigateFunction,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { ButtonMaxSize, MainStack, TitlePage, StyledMap } from "./DetailStyles";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";


type LocationProps = {
  lat: number;
  lng: number;
};

const Detail = () => {
  const { infoID } = useParams();
  let navigate: NavigateFunction = useNavigate();
  let markerPosition: LatLngExpression = [0, 0];

  const location = useLocation();
  if (location.state) {
    let infoLocation: LocationProps = location.state as LocationProps;
    console.log(infoLocation);
    markerPosition = [infoLocation.lat, infoLocation.lng];
  }

  const onBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <MainStack spacing={2}>
        <TitlePage gutterBottom variant="h3" color="primary.main">
          Detail = {infoID}
        </TitlePage>
        <ButtonMaxSize variant="primary" onClick={() => onBackButton()}>
          Voltar
        </ButtonMaxSize>
      </MainStack>
      <StyledMap>
        <MapContainer
          center={markerPosition}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={markerPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </StyledMap>
    </>
  );
};

export default Detail;

import React from "react";
import {
  NavigateFunction,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { IPersons } from "../../Interfaces/IPerson";
import { Button, Typography, Grid } from "@mui/material";
import { MainGrid, StyledMap } from "./DetailStyles";

type LocationProps = {
  lat: number;
  lng: number;
  personStr: string;
};

const Detail = () => {
  const { infoID } = useParams();
  let navigate: NavigateFunction = useNavigate();
  let markerPosition: LatLngExpression = [0, 0];
  
  let person: IPersons | null = null;

  const location = useLocation();
  if (location.state) {
    let infoLocation: LocationProps = location.state as LocationProps;
    person = JSON.parse(infoLocation!.personStr) as IPersons;
    console.log(person);
    markerPosition = [infoLocation.lat, infoLocation.lng];
  }

  const onBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <MainGrid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom variant="h2" color="primary.main">
            Detalhe do Colaborador
          </Typography>
          <div>
            <img src={person!.image} alt="Person" />
          </div>
          <div>
            <Typography gutterBottom variant="body1" color="primary.main">
              Nome: {person!.firstName} {person!.lastName}
            </Typography>
          </div>
          <div>
            <Typography gutterBottom variant="body1" color="primary.main">
              Nome: {person!.firstName} {person!.lastName}
            </Typography>
          </div>
          <div>
            <Typography gutterBottom variant="body1" color="primary.main">
              Telefone: {person!.phone}
            </Typography>
          </div>
          <div>
            <Typography gutterBottom variant="body1" color="primary.main">
              Endereço: {person!.address}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledMap>
            <MapContainer
              center={markerPosition}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%" }}
            >
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => onBackButton()}>
            Voltar
          </Button>
        </Grid>
      </MainGrid>
    </>
  );
};

export default Detail;

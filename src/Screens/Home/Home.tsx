import React, { useState, useEffect, } from "react";
import { allPersons, IPersons } from "../../Interfaces/IPerson";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Title, TableHeaderStyle, TableRowStyle, TableSearchFieldStyle } from "./HomeStyles";

import useAPI from "../../Services/APIs/Common/useAPI";
import Person from "../../Services/APIs/Persons/Persons";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";
import MaterialTable, { QueryResult } from "material-table";

import { useContext } from "react";
import Header from "../../Components/Header/Header";
import UserInfoContext, {
  UserInfoContextType,
} from "../../Store/UserInfo/UserInfoContext";

export default function Home() {  
  const getPersonAPI = useAPI(Person.getAllPersons);
  let userCoordinates: GeolocationCoordinates | null = null;
  const navigate: NavigateFunction = useNavigate();
  const context = useContext<UserInfoContextType>(UserInfoContext);

  const columns = [
    { title: "SobreNome", field: "lastName" },
    { title: "Nome", field: "firstName" },
    { title: "Telefone", field: "phone" },
  ];

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    console.log(coords.latitude + " - " + coords.longitude);
    userCoordinates = coords;
  }

  const getData = (query: any): Promise<QueryResult<{ [x: string]: {} }>> => {
    return new Promise((resolve, reject) => {
      console.log(query);

      let page = query.page + 1;
      let info = `page=${page}&perPage=${query.pageSize}`;
      if (query.orderBy !== undefined && query.orderBy !== "") {
        info += `&orderBy=${query.orderBy.field}`;
      }
      if (query.orderDirection !== undefined && query.orderDirection !== "") {
        info += `&orderDirection=${query.orderDirection}`;
      }
      if (query.search !== undefined && query.search !== "") {
        info += `&search=${query.search}`;
      }
      console.log(info);
      getPersonAPI
        .requestPromise(info)
        .then((info: any) => {
          console.log(info);
          resolve({
            data: info.persons,
            page: info.page - 1,
            totalCount: info.totalItems,
          });
        })
        .catch((error: string) => {
          console.log(error);
        });
    });
  };

  const onChangePage = (person: IPersons) => {
    navigate("Detail/" + person._id, {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
        personStr: JSON.stringify(person),
      },
    });
  };

  const onAddPage = () => {
    navigate("add/", {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
      },
    });
  };
  
return (
  <>
    <Header />
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="left"
      alignItems="left"
    >
      <Grid item xs={12}>
        <Title gutterBottom variant="h1" color="primary.dark">
          Lista de Colaboradores, {context.userInfo.userName}
        </Title>
      </Grid>
      <Grid item xs={12}>
        <Button variant="primary" onClick={() => onAddPage()}>
          Adicionar Colaborador
        </Button>
      </Grid>
      <Grid item lg={12}>
        <MaterialTable
          columns={columns}
          data={getData}
          actions={[
            {
              icon: "visibility",
              tooltip: "See Detail",
              onClick: (event, rowData) => {
                onChangePage(rowData as unknown as IPersons);
              },
            },
          ]}
          options={{
            showTitle: false,
            search: true,
            actionsColumnIndex: -1,
            headerStyle: TableHeaderStyle,
            rowStyle: TableRowStyle,
            searchFieldStyle: TableSearchFieldStyle,
          }}
        />
      </Grid>
    </Grid>
  </>
);
}

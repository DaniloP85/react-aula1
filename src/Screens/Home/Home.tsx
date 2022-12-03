import { useState, useEffect } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MaterialTable, { QueryResult } from "material-table";
import { CustomLink, Main, Title } from "./HomeStyles";
import useAPI from "../../Services/APIs/Common/useAPI";
import Persons from "../../Services/APIs/Persons/Persons";
import { allPersons, IPersons } from "../../Interfaces/IPerson";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { useGeolocated } from "react-geolocated";
import { NavigateFunction, useNavigate } from "react-router-dom";



function App() {
  // const [currentPersons, setCurrentPersons] = useState<IPersons | null>(null)
  const [allPersons, setAllPersons] = useState<IPersons[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const getPersonAPI = useAPI(Persons.getAllPersons);
  const navigate:NavigateFunction = useNavigate();

  let userCoordinates:GeolocationCoordinates |null =  null

  const {coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  })

  if(isGeolocationAvailable && isGeolocationEnabled && coords){
    console.log(coords);    
    userCoordinates = coords;
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   getPersonAPI.requestPromise()
  //   .then((allPersons: allPersons) => {
  //     setIsLoading(false);
  //     setAllPersons(allPersons.persons);
  //   })
  //   .catch((info: any) => {
  //     console.log(info);
  //     setIsLoading(false);      
  //   })
  // },[])

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

  const columns = [
    { title: "SobreNome", field: "lastName" },
    { title: "Nome", field: "firstName" },
    { title: "Telefone", field: "phone" },
  ];
  
  return (
    <Main>
      <MaterialTable
          columns={columns}
          data={getData}
          isLoading={isLoading}
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
          }}
        />
    </Main>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { AllPersons, IPerson } from "../../Interfaces/IPerson";

import Grid from "@mui/material/Grid";
import { Title, Main, CustomLink } from "./HomeStyles";

import useAPI from "../../Service/APIs/Common/useAPI";
import Person from "../../Service/APIs/Persons/Persons";

export default function Home() {
  const [currentPerson, setCurrentPerson] = useState<IPerson|null>(null)
  const getPersonAPI = useAPI(Person.getPersons);

  useEffect(() => {
    getPersonAPI
      .requestPromise()
      .then((info: AllPersons) => {
        setCurrentPerson(info.persons[0])
      })
      .catch((info: any) => {
        console.log(info);
      });
  }, []);
  
  let name = "";
  if (currentPerson) {
    name = currentPerson?.firstName + " " + currentPerson?.lastName;
  }  
  return (
    <Main>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Title gutterBottom variant="h1" color="primary.dark">
          Person {name}
        </Title>

        <CustomLink to="detail/1" >
          Detail 1
        </CustomLink>
        <CustomLink to="detail/2" >
          Detail 2
        </CustomLink>
      </Grid>
    </Main>
  );
};
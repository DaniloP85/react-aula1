import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CustomCard, TitleTopPage } from "./HomeStyles";
import useAPI from '../../Service/APIs/Common/useAPI';
import Person from '../../Service/APIs/Persons/Persons'
import { AllPersons, IPerson } from "../../Interfaces/IPerson";

function App() {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const getPersonAPI = useAPI(Person.getPersons);

  useEffect(() => {
    getPersonAPI.requestPromise()
      .then((AllPersons: AllPersons) => {
        let mountCards: JSX.Element[] = [];
        AllPersons.persons.forEach((person: IPerson)=>{
          mountCards.push(
            <Grid key={person._id} item lg={4} md={6} sm={12}>
              <CustomCard >
                <CardMedia
                  component="img"
                  height="140"
                  image={person.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {person.firstName} {person.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.jobTitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CustomCard>
            </Grid>

          )
        })
        setCards(mountCards)
      })
      .catch((info: any) => {
        console.log(info);
      });
  }, []);
  
  return (
    <Container>
      <TitleTopPage>
        <Typography variant="h1" color="primary">Usuários</Typography>
      </TitleTopPage>
      <Grid container>{cards}</Grid>
    </Container>
  );
}

export default App;

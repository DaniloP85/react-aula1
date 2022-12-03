import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Title, Box, AcUnitIconCustom, CustomBox } from "./HomeStyles";

function App() {
  const [count, setCount] = useState<number>(0);

  const addCount = () => {
    setCount((count) => count + 1);
  };
  
  useEffect(() => {
    console.log("chamando apos a renderizacao na inicializacao do componente")
    const interval = setInterval(()=>{
      setCount((count) => count + 1);
    }, 1000)
    return () => {
      console.log("chamando no remocao do componente");
      clearInterval(interval);
    }
  },[]);
  
  return (
    <Box>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="container"
      >
        <AcUnitIconCustom />
        <Title gutterBottom variant="h1" color="primary.dark">
          Info {count}
        </Title>
        <Title gutterBottom variant="h1" color="secondary.dark">
          Info {count}
        </Title>
        <CustomBox color="#fff000"></CustomBox>
        <Button onClick={() => addCount()} variant="primary">
          {" "}
          Primary{" "}
        </Button>
        <Button color="secondary"> Secondary </Button>
        <Button color="success"> Success </Button>
      </Grid>
    </Box>
  );
}

export default App;

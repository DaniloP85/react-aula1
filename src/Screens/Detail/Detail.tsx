import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ButtonMaxSize, MainStack, TitlePage } from "./DetailStyles";

const Detail = () => {
  const { infoID } = useParams();
  let navigate: NavigateFunction = useNavigate();
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
    </>
  );
};

export default Detail;
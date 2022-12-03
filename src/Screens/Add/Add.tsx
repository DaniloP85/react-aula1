import React, { useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  AlertProps,
  AlertColor,
  Button,
} from "@mui/material";

import useAPI from "../../Services/APIs/Common/useAPI";
import persons from "../../Services/APIs/Persons/Persons";

import { useNavigate, useLocation } from "react-router-dom";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import * as Yup from "yup";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";

import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import InputMask from "react-input-mask";
import { If, Then } from "react-if";

import { MainGrid, CustomErrorMessage, CircularProgressDiv } from "./AddStyles";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";

type LocationProps = {
  lat: number;
  lng: number;
};

type FormDataType = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};
export default function Add() {
  const addPersonsAPI = useAPI(persons.addPersons);

  const [connectMessage, setConnectMessage] = useState("");
  const [connectCode, setConnectCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  let infoLocation: LocationProps;
  if (location.state) {
    infoLocation = location.state as LocationProps;
  }

  let navigate = useNavigate();

  const onBackButton = () => {
    navigate(-1);
  };

  const personSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  > = Yup.object().shape({
    firstName: Yup.string().required("O nome é obrigatório"),
    lastName: Yup.string().required("O sobrenome é obrigatório"),
    phone: Yup.string().required("Telefone é obrigatório"),

    address: Yup.string()
      .required("Endereço é obrigatório")
      .min(10, "Endereço é muito curto"),
  });

  const onSubmit = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    // navigate(-1);
    console.log(values);

    let info = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
      latitude: infoLocation.lat,
      longitude: infoLocation.lng,
      image: "https://reqres.in/img/faces/1-image.jpg",
    };

    setIsLoading(true);
    addPersonsAPI
      .requestPromise(info)
      .then((info: any) => {
        console.log(info);
        setIsLoading(false);
        setConnectCode(1);
        setConnectMessage("Colaborador adicionado com sucesso");
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setConnectCode(-1);
        setConnectMessage(
          "O servidor retornou um erro= " + error.response.status
        );
      });
  };

    let message: JSX.Element | null = null;
    console.log(connectMessage);
    if (connectMessage !== "") {
      let severity: AlertColor = "success";
      if (connectCode !== 1) {
        severity = "error";
      }
      message = (
        <Alert severity={severity} variant="filled">
          {connectMessage}
        </Alert>
      );
    }

  let initialDataForm: FormDataType = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  };
  return (
    <Formik
      initialValues={initialDataForm}
      onSubmit={onSubmit}
      validationSchema={personSchema}
    >
      {(formik) => {
        const { values, setFieldValue, submitForm } = formik;
        return (
          <Form>
            <MainGrid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h2" color="secondary.main">
                  Adicionar novo Colaborador
                </Typography>
                {message}
                <div>
                  <CustomTextField
                    label="Nome"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("firstName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage name="firstName" component="span" />
                </div>
                <div>
                  <CustomTextField
                    label="Sobrenome"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("lastName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage name="lastName" component="span" />
                </div>
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    disabled={false}
                    value={values.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("phone", e.target.value);
                    }}
                  >
                    <CustomTextField label="Telefone" />
                  </InputMask>
                </div>
                <div>
                  <CustomErrorMessage name="phone" component="span" />
                </div>
                <div>
                  <CustomTextField
                    label="Endereco"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("address", e.target.value)
                    }
                  />
                </div>
                <div>
                  <CustomErrorMessage name="address" component="span" />
                </div>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={5}
                >
                  <If condition={isLoading}>
                    <Then>
                      <CircularProgressDiv>
                        <CircularProgress />
                      </CircularProgressDiv>
                    </Then>
                  </If>
                  <If condition={!isLoading && connectCode !== 1}>
                    <Then>
                      <>
                        <Button
                          variant="secondary"
                          type="submit"
                          onClick={submitForm}
                        >
                          Adicionar
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => onBackButton()}
                        >
                          Voltar
                        </Button>
                      </>
                    </Then>
                  </If>
                </Stack>
              </Grid>
            </MainGrid>
          </Form>
        );
      }}
    </Formik>
  );
}

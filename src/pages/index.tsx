import {
  Avatar,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

interface DetailsProps {
  first: string;
  last: string;
  gender: string;
  picture: string;
  email: string;
  phone: string;
  cell: string;
  city: string;
  state: string;
  country: string;
  birthdate: string;
  age: string | number;
}
const RANDOM_API: string = "https://randomuser.me/api";
const Home: NextPage = () => {
  const [details, setDetails] = useState<DetailsProps>({
    first: "",
    last: "",
    gender: "",
    picture: "",
    email: "",
    phone: "",
    cell: "",
    city: "",
    state: "",
    country: "",
    birthdate: "",
    age: "",
  });

  const fetchRandom = async () => {
    try {
      const res = await axios.get(RANDOM_API);
      const { first, last } = res.data.results[0].name;
      const { gender, phone, cell, email } = res.data.results[0];
      const { large } = res.data.results[0].picture;
      const { city, state, country } = res.data.results[0].location;
      const { date, age } = res.data.results[0].dob;
      setDetails({
        first,
        last,
        gender,
        phone,
        cell,
        email,
        city,
        state,
        country,
        birthdate: date,
        age,
        picture: large,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  useEffect(() => {
    fetchRandom();
  }, []);
  return (
    <Box>
      <Head>
        <title>Exam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        component="main"
        display="flex"
        justifyContent="center"
        height="100vh"
      >
        <Card raised sx={{ width: { sm: "70%", lg: "50%" } }}>
          <Grid
            container
            direction="row-reverse"
            position="relative"
            paddingX={2}
            sx={{
              height: "10rem",
              backgroundColor: "#6addeb",
            }}
          >
            <Grid
              item
              xs={8}
              container
              justifyContent="flex-end"
              direction="column"
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                onClick={fetchRandom}
                variant="text"
                sx={{ width: "fit-content", fontSize: { xs: 10, md: 15 } }}
              >
                Fetch Random User
              </Button>
              <Typography
                fontWeight={600}
                textAlign="center"
                color="white"
                sx={{
                  fontSize: { xs: 23, md: 30 },
                }}
              >
                {details.first} {details.last}
              </Typography>
            </Grid>
            <Grid item xs={4} container justifyContent="center">
              <Avatar
                sx={{
                  width: { xs: 75, lg: 180 },
                  height: { xs: 75, lg: 180 },
                  position: "absolute",
                  bottom: { xs: -30, lg: -70 },
                }}
                alt={details.first}
                src={details.picture}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              width: { sm: "70%", lg: "100%" },
              paddingX: 5,
              marginTop: { xs: 5, md: 10 },
            }}
          >
            <Grid item lg={6} container direction="column">
              <Typography fontWeight={600} fontSize={25}>
                GET IN CONTACT
              </Typography>
              <Typography fontWeight={600}>
                EMAIL: <Typography component="span">{details.email}</Typography>
              </Typography>
              <Typography fontWeight={600}>
                CELL: <Typography component="span">{details.cell}</Typography>
              </Typography>
              <Typography fontWeight={600}>
                PHONE: <Typography component="span">{details.phone}</Typography>
              </Typography>
              <Typography fontWeight={600}>
                LOCATION:{" "}
                <Typography component="span">
                  {details.city}, {details.state}, {details.country}
                </Typography>
              </Typography>
            </Grid>
            <Grid item lg={6} container direction="column">
              <Typography fontWeight={600} fontSize={25}>
                PERSONAL DETAILS
              </Typography>
              <Typography fontWeight={600}>
                Birthdate:{" "}
                <Typography component="span">
                  {moment(details.birthdate).format("MMMM DD, YYYY")}
                </Typography>
              </Typography>
              <Typography fontWeight={600}>
                AGE: <Typography component="span">{details.age}</Typography>
              </Typography>
            </Grid>
          </Grid>

          <Divider flexItem sx={{ marginTop: "35rem" }}>
            <Typography>Made by Vincent P. Dizon</Typography>
          </Divider>
        </Card>
      </Box>
    </Box>
  );
};

export default Home;

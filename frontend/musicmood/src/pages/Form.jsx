import React, { useState } from "react";
import "./styles.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Form = () => {
  const [textInput, setTextInput] = useState();
  const [mood, setMood] = useState("");
  const [info, setInfo] = useState([]);
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const moodMap = {
    Happy: "Happy_Small",
    Sad: "Sad_Small",
    Angry: "Energrtic_Small",
    Fear: "Calm_Small",
  };

  const Fetchdata = async () => {
    setInfo(() => []); //clear the previous data
    console.log(moodMap[mood]);
    const querySnapshot = await getDocs(collection(db, moodMap[mood]));
    querySnapshot.forEach((element) => {
      var data = element.data();
      //   console.log(`The data fetched is: ${data.Name}`);
      setInfo((arr) => [
        ...arr,
        { Name: data.Name, Album: data.Album, Artist: data.Artist },
      ]);
    });
    console.log(`The data fetched is: ${info}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("/getmood?input=" + textInput)
      .then((res) => res.json())
      .then((data) => {
        setMood(data.mood);
        console.log(data);
      })
      .then(async () => await Fetchdata());
  };

  return (
    <div className="outside">
      <form onSubmit={handleSubmit}>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter your current mood in 10-20 words "
          type="textarea"
          name="Mood"
          rows={3}
          cols={4}
          //   required
        />
        <h2 className="moodOutput">{mood}</h2>
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
      {info.length !== 0 ? (
        <TableContainer
          sx={{ maxHeight: 500 }}
          //   className={CcartItems}
        >
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="cartHeading" align="left">
                  Song
                </TableCell>
                <TableCell className="cartHeading" align="center">
                  Artist
                </TableCell>
                <TableCell className="cartHeading" align="center">
                  Album
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ typography: "body1" }}>
              {info.map((item) => {
                return (
                  <StyledTableRow key={item} className="itemRow">
                    <TableCell component="th" scope="row" className="itemText">
                      {item.Name}
                    </TableCell>
                    <TableCell align="center" className="itemText">
                      {item.Artist}
                    </TableCell>
                    <TableCell align="center" className="itemText">
                      {item.Album}
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Form;

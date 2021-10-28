import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Checkbox,
  Button,
} from "@material-ui/core";
import CSVReader from "react-csv-reader";
import { useState } from "react";
import { CSVLink } from "react-csv";

function createData(id, firstname, lastname, contactNumber, timeZone) {
  return {
    id,
    firstname,
    lastname,
    contactNumber,
    timeZone,
  };
}

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [rowData, setRowData] = useState([
    createData(1, "Louise", "Smith", "9874563210", 3.7),
    createData(2, "James", "Johnson", "8974563210", 452),
    createData(3, "Mary", "Williams", "7894563210", 262),
    createData(4, "Deborah", "Brown", "6789543210", 159),
    createData(5, "William", "Jones", "5678943210", 356),
    createData(6, "Elizabeth", "Garcia", "4567893210", 408),
    createData(7, "Richard", "Miller", "345678910", 237),
    createData(8, "Susan", "Davis", "2345678910", 375),
    createData(9, "Thomas", "Rodriguez", "1234567890", 518),
    createData(10, "Karen", "Martinez", "2134567890", 392),
  ]);

  const handleForce = (data, fileInfo) => {
    let temp = [];
    console.log("data====", data);
    console.log("fileInfo=====", fileInfo);
    data.map((eachSheetData) => {
      console.log("eachSheetData===", eachSheetData);
      temp = rowData.push(eachSheetData);
      console.log("temp===", temp);
      setRowData((prevValue) => [...prevValue, temp]);
    });
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <div className="demoApp">
      <div className="table-header">
        <div className="export-btn">
          <CSVLink data={rowData}>
            <Button variant="contained" className="expbtn-style">
              Export
            </Button>
          </CSVLink>
        </div>
        <div className="import-btn">
          <CSVReader
            cssClass="csv-reader-input"
            label="Select CSV"
            onFileLoaded={handleForce}
            // onError={this.handleDarkSideForce}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputName="ObiWan"
            inputStyle={{ color: "red" }}
          />
        </div>
      </div>
      <TableContainer component={Paper} className={classes.VendorTable}>
        <Table size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <strong>First Name</strong>
              </TableCell>
              <TableCell>
                <strong>Last Name</strong>
              </TableCell>
              <TableCell>
                <strong>Contact Number</strong>
              </TableCell>
              <TableCell>
                <strong>Time Zone </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((eachRow, index) => {
              console.log("row: " + eachRow);
              return (
                <TableRow key={eachRow}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"

                      // inputProps={{
                      //   "aria-labelledby": labelId,
                      // }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {eachRow?.firstname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {eachRow?.lastname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {eachRow?.contactNumber}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {eachRow?.timeZone}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default App;

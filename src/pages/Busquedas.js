
import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"],
];

function Busquedas(props) {
  return (
    <div>
      <CSVLink data={csvData}>Download me</CSVLink>;

<CSVDownload data={csvData} target="_blank" />;
    </div>
  );
}

export default Busquedas;
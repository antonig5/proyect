import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Constants from '../utils/Constants';

const Vehiculos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${Constants.URL}/api/vehiculos?populate=*`
      );
      const data = await response.json();
      const vehiculo = [];
      data.data.map((datos) => {
        console.log(datos.attributes.placa);
        vehiculo.push({
          id: datos.id,
          placas: datos.attributes.placa,
          marcas: datos.attributes.marca.data.attributes.marca,
          tipos: datos.attributes.tipos_de_vehiculo.data.attributes.tipo,
        });
      });
      setData(vehiculo);
    }
    fetchData();
  }, []);
  console.log(data);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Placa",
      dataIndex: "placas",
      key: "placas",
    },
    {
      title: "Marca",
      dataIndex: "marcas",
      key: "marcas",
    },
    {
      title: "Tipo",
      key: "tipos",
      dataIndex: "tipos",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default Vehiculos;

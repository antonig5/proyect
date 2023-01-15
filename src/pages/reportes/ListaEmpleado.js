import React, { useEffect, useState } from "react";
import { Button, Table, Select, DatePicker } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
const { Option } = Select;
const ListaEmpleado = () => {
  const [data, setData] = useState([]);

  const datos = (value) => {
    if (value == "moto") {
      fetch(
        `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=parqueadero&populate[1]=vehiculo.user&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia&filters[vehiculo][topvehiculo]=${value}`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          const user = [];
          r.data.map((datos) => {
            user.push({
              seccion: datos.id,
              entrada: datos.attributes.createdAt,
              salida: datos.attributes.updatedAt,
              vehiculos: datos.attributes.vehiculo.data.attributes.placa,
              topvehiculos:
                datos.attributes.vehiculo.data.attributes.topvehiculo,
              parqueaderos:
                datos.attributes.parqueaderomoto.data.attributes.nombre,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    } else if (value == "carro") {
      fetch(
        `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&populate[1]=parqueadero&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia&filters[vehiculo][topvehiculo]=${value}`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          const user = [];
          r.data.map((datos) => {
            user.push({
              seccion: datos.id,
              entrada: datos.attributes.createdAt,
              salida: datos.attributes.updatedAt,
              vehiculos: datos.attributes.vehiculo.data.attributes.placa,
              topvehiculos:
                datos.attributes.vehiculo.data.attributes.topvehiculo,
              parqueaderos: datos.attributes.parqueadero.data.attributes.nombre,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&populate[1]=parqueadero&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const user = [];
        r.data.map((datos) => {
          user.push({
            seccion: datos.id,
            entrada: datos.attributes.createdAt,
            salida: datos.attributes.updatedAt,
            vehiculos: datos.attributes.vehiculo.data.attributes.placa,
            topvehiculos: datos.attributes.vehiculo.data.attributes.topvehiculo,

            // elementos: datos.elementos.data[0].attributes.nombre,
          });
        });

        setData(user);
      });
  };

  useEffect(() => {
   // datos();
    GetEmpleados();
  }, []);
 const headers = [
   { label: "Seccion", key: "seccion" },
   { label: "Vehiculo", key: "vehiculos" },
   { label: "Tipo", key: "topvehiculos" },
   { label: "Fecha Entrada", key: "entrada" },
   { label: "Fecha salida", key: "salida" },
 ];

  const columns = [
    {
      title: "Seccion",
      dataIndex: "seccion",
      key: "seccion",
    },
    {
      title: "Vehiculo",
      dataIndex: "vehiculos",
      key: "vehiculos",
    },
    {
      title: "Tipo",
      dataIndex: "topvehiculos",
      key: "topvehiculos",
    },
    {
      title: "Parqueadero",
      dataIndex: "parqueaderos",
      key: "parqueaderos",
    },
    {
      title: "Fecha Entrada",
      dataIndex: "entrada",
      key: "entrada",
    },
    {
      title: "Fecha Salida",
      dataIndex: "salida",
      key: "salida",
    },
  ];
  const onSearch = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&filters[vehiculo][visitante]&populate[1]=vehiculo.user.dependencia&filters[createdAt][$contains]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((r) => {
          const user = [];
          r.data.map((datos) => {
            user.push({
              seccion: datos.id,
              entrada: datos.attributes.createdAt,
              salida: datos.attributes.updatedAt,
              vehiculos: datos.attributes.vehiculo.data.attributes.placa,
              topvehiculos:
                datos.attributes.vehiculo.data.attributes.topvehiculo,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  const onExit = (value) => {
    if (value == null) {
      GetEmpleados();
    } else {
      fetch(
        `${
          Constants.URL
        }/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&filters[vehiculo][visitante]&populate[1]=vehiculo.user.dependencia&filters[createdAt][$contains]=${moment(
          new Date(value)
        ).format("YYYY-MM-DD")}`
      )
        .then((res) => res.json())
        .then((r) => {
          const user = [];
          r.data.map((datos) => {
            user.push({
              seccion: datos.id,
              entrada: datos.attributes.createdAt,
              salida: datos.attributes.updatedAt,
              vehiculos: datos.attributes.vehiculo.data.attributes.placa,
              topvehiculos:
                datos.attributes.vehiculo.data.attributes.topvehiculo,
              // elementos: datos.elementos.data[0].attributes.nombre,
            });
          });

          setData(user);
        });
    }
  };

  return (
    <>
      <NavLink to="/reportes">
        <Button icon={<LeftOutlined />}>Regresar</Button>
      </NavLink>

      <Select placeholder="Tipo de vehiculos" onChange={datos}>
        <Option value="moto" key={1}>
          Motos
        </Option>
        <Option value="carro" key={2}>
          Carros
        </Option>
      </Select>
      <DatePicker placeholder="Fecha entrada" onChange={onSearch} />
      <DatePicker placeholder="Fecha salida" onChange={onExit} />
      <CSVLink
        className="ant-btn css-dev-only-do-not-override-9ntgx0 ant-btn-default"
        data={data}
        headers={headers}
      >
        Descargar Excel
      </CSVLink>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ListaEmpleado;

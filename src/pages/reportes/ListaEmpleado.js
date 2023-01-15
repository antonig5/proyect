import React, { useEffect, useState } from "react";
import { Button, Table, Select, DatePicker } from "antd";
import Constants from "../../utils/Constants";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { CSVLink } from "react-csv";
const { Option } = Select;
const ListaEmpleado = () => {
  // Estado para almacenar los datos de los empleados
  const [data, setData] = useState([]);

  // Función para obtener los datos de los empleados en base a un valor recibido
  const datos = (value) => {
    // Si el valor recibido es "moto" hace una petición fetch a una URL específica
    if (value == "moto") {
      fetch(
        `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=parqueadero&populate[1]=vehiculo.user&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia&filters[vehiculo][topvehiculo]=${value}`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          const user = [];
          // Recorre los datos obtenidos y los almacena en el estado "data"
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
          // Actualiza el estado "data" con los datos obtenidos
          setData(user);
        });
    } else if (value == "carro") {
      // Si el valor recibido es "carro" hace una petición fetch a una URL específica
      fetch(
        `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&populate[1]=parqueadero&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia&filters[vehiculo][topvehiculo]=${value}`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          const user = [];
          // Recorre los datos obtenidos y los almacena en el estado "data"
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
          // Actualiza el estado "data" con los datos obtenidos
          setData(user);
        });
    }
  };
  // Función para obtener los datos de los empleados
  const GetEmpleados = () => {
    fetch(
      `${Constants.URL}/api/ingresovehiculos?populate=*&populate[0]=vehiculo.user&populate[1]=parqueadero&populate[2]=parqueaderomoto&filters[vehiculo][visitante]&populate[3]=vehiculo.user.dependencia`
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        const user = [];
        // Recorre los datos obtenidos y los almacena en el estado "data"
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
        // Actualiza el estado "data" con los datos obtenidos
        setData(user);
      });
  };

  useEffect(() => {
    // datos();
    GetEmpleados();
  }, []);
  // Columnas que se mostrarán en la tabla
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
  // onSearch y onExit son funciones que se ejecutan al seleccionar una fecha en los componentes de fecha.
  // ambas funciones reciben un valor que es la fecha seleccionada.
  // ambas funciones hacen una petición a la api para obtener los datos de ingresos de vehículos, y filtran los datos según la fecha seleccionada.
  // si no hay fecha seleccionada, ambas funciones llaman a la función GetEmpleados para obtener todos los datos sin filtrar.
  // los datos obtenidos son almacenados en el estado data y luego se actualiza la tabla con esta información.
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

import React from 'react';

import { Button, Space, Table, Tag, message } from "antd";
import { useState } from 'react';
import Constants from '../utils/Constants';
import { useEffect } from 'react';

function AprobarVisitas(props) {


    const [visitas, setVisitas] = useState([])
    

    const getVisitas = () => {
        fetch(
          `${Constants.URL}/api/visitas?filters[estado]=No Aprobada&populate=*&populate[0]=visitante.dependencia`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        ).then((res) => res.json())
            .then((res) => {
                
                  const array = [];
                  res.data.map((visita) => {
                    array.push({
                      nombre:
                        visita.attributes.visitante.data.attributes.nombre,
                      email: visita.attributes.visitante.data.attributes.email,
                      estado: visita.attributes.estado,
                        dependencia: visita.attributes.visitante.data.attributes.dependencia.data.attributes.dependencia,
                      id: visita.id
                    });
                  });

                  setVisitas(array);
                
                console.log(res);

                
                
         });
    }


    const aprobarVisita = (ev) => {
        console.log(ev.id);
        fetch(`${Constants.URL}/api/visitas/${ev.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify({
                data: {
                  estado: "Aprobada"
              }
          })
        }).then((res) => res.json())
            .then((res) => {
                console.log(res);

                if (res.data.id > 0) {
                    message.success("Visita Aprobada con Exito")
                    getVisitas()
                }
                
                
          });
    };

    useEffect(() => {
        getVisitas()
    },[])
const columns = [
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
    
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
  },
  {
    title: "Dependencia",
    dataIndex: "dependencia",
    key: "dependencia",
  },
 
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
            <Button onClick={() => {
                aprobarVisita(record);
       }}>Aprobar</Button>
      </Space>
    ),
  },
];


    return (
      <div>
        <Table columns={columns} dataSource={visitas} />
      </div>
    );
}

export default AprobarVisitas;
import React, { useState } from "react";
import "../../estilos/ConfiguracionUsuario.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ConfiguracionUsuario = () => {
    const [datos, setDatos] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"))

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const actualizarDatos = async (e) => { e.preventDefault();
        const { value: confirmar } = await Swal.fire({ // le pedimos que confirme los cambios 
            title: "Confirmar sus cambios",
            input: "text",
            inputLabel: "Ingresá CONFIRMAR en mayusculas para confirmar los cambios",
            inputPlaceholder: "Ingrese aqui...",
            inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmar) return; // si cancela, no escribe nada no hacemos nada
        if(confirmar !== "CONFIRMAR"){ // si escribe otra cosa que no sea confirmar decimos que no es correcta
            Swal.fire({
            text: 'Los cambios no se realizaron por falta de confirmacion.',
            icon: 'error',
        });
        }else{
            try {
                const user = JSON.parse(localStorage.getItem("user"))// agarramos el usuario en sesion

                const body = { idUser: user.id };

                if (datos.email) body.email = datos.email;
                if (datos.firstname) body.firstname = datos.firstname;
                if (datos.lastname) body.lastname = datos.lastname;
                if (datos.password) body.password = datos.password;
        
            const response = await fetch(`http://localhost:4002/users/${user.id}`, { 
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(body),
                    });
        
                if (!response.ok) throw new Error("Error al crear la orden");
                Swal.fire({
                    title: 'Cambios guardados ✅',
                    text: 'Sus cambios se procesaron correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Salir',
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleLogout()
                    }
                });
                
            }
            catch(error)
                {Swal.fire({
                title: 'Error',
                text: 'No se pudo modificar los datos.',
                icon: 'error',
            });}
        }
    }
    
    return (
        <div className="account-container">
            <h1 className="account-title">Configuracion de Usuario</h1>
            <div className="account-tabs">
                <p className="tab active">Cuenta resgistrada como {`${user.role}`}</p>
            </div>

        <form className="account-form" onSubmit={actualizarDatos}>
            <div className="form-group">
            <label>Nombre</label>
            <input name="firstname" value={datos.firstname} className= "text" placeholder={`${user.firstname}`}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Apellido</label>
            <input name="lastname" value={datos.lastname} className= "text" placeholder={`${user.lastname}`}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Correo Electronico</label>
            <input name="email" className= "text" value={datos.email} placeholder={`${user.email}`}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Contraseña</label>
            <input name="password" className= "text" value={datos.password} placeholder={"Contraseña"}
                onChange={handleChange}
            />
            </div>

            <button type="submit" className="save-button"disabled={!datos.password && !datos.email && !datos.lastname && !datos.firstname 
                // si no hay datos no deshabilitamos el boton
            }>
            Guardar cambios
            </button>
        </form>
        </div>
);
};

export default ConfiguracionUsuario;


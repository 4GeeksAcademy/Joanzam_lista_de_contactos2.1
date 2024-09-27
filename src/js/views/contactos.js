import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/contactos.css";
import "../../styles/home.css";

export const Contactos = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = () => {
        fetch("https://playground.4geeks.com/contact/agendas/Joanzam")
            .then((response) => response.json())
            .then((data) => setContacts(data.contacts));
    };

    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/Joanzam/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al eliminar el contacto. Status code: ${response.status}`);
                }
                // Verificar si la respuesta tiene contenido
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => {
                console.log("Contacto eliminado con éxito:", data);
                getContacts()
                // Aquí puedes actualizar tu estado si es necesario
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    const handleEdit = (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/Joanzam/contacts/${id}`, {
            method: "PUT", // Usar el método put
            headers: {
                "Content-Type": "application/json" // Especificar el tipo de contenido
            },
            // body: JSON.stringify(newContact) // Convertir el objeto a JSON para enviarlo
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                // Redirigir a la lista de contactos después de crear el contacto
                navigate("/contactos"); // Usar navigate para redireccionar
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="home">
            <div className="container-form">
                <div className="d-flex justify-content-end">
                    <Link to="/addcontact" className="btn btn-success">Add a new contact</Link>
                </div>
                <div className="contact-list">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="contact-card">
                            <div className="contact-info">
                                <p><strong>{contact.name}</strong></p>
                                <p>{contact.phone}</p>
                                <p>{contact.address}</p>
                                <p>{contact.email}</p>
                            </div>
                            <div className="contact-actions">
                                {/* Icono de editar */}

                                <Link to={`/editcontact/${contact.id}`}>
                                    <i
                                        className="fas fa-edit"
                                        onClick={() => handleEdit(contact.id)}
                                        title="Edit"
                                    >
                                    </i>
                                </Link>
                                {/* Icono de borrar */}
                                <i
                                    className="fas fa-trash-alt"
                                    onClick={() => handleDelete(contact.id)}
                                    title="Delete"
                                ></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
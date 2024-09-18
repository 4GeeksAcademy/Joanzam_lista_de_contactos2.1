import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/contactos.css";
import "../../styles/home.css";


export const Contactos = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getContacts()
    }, [])
    const getContacts = () => {
        fetch("https://playground.4geeks.com/contact/agendas/joanzam")
            .then(response => response.json())
            .then(data => setContacts(data.contacts));

    }
    return (
        <div className="home">
            <div className="contactos">
                {contacts.map(contact => (
                    <div>
                        <p>{contact.name}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.address}</p>
                        <p>{contact.email}</p>
                    </div>
                ))}

            </div>
        </div>

    );
};


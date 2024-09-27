import React, { useState } from "react";
import "../../styles/Form.css";
import { Link, useNavigate, useParams } from "react-router-dom"; // Ya no necesitas useParams

export const FormEdit = () => {
  // Definir estados para cada campo del formulario
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { id } = useParams()
  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar página)

    // Crear objeto con los datos a enviar
    const newContact = {
      name: Name, // Asegúrate de que este nombre coincida con lo que espera la API
      email: email,
      phone: phone,
      address: address
    };

    // Enviar una solicitud POST a la API para crear un nuevo contacto
    fetch(`https://playground.4geeks.com/contact/agendas/Joanzam/contacts/${id}`, {
      method: "PUT", // Usar el método put
      headers: {
        "Content-Type": "application/json" // Especificar el tipo de contenido
      },
      body: JSON.stringify(newContact) // Convertir el objeto a JSON para enviarlo
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
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h1>Add a new contact</h1>

        {/* Campo para el nombre completo */}
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="Name"
            placeholder="Full Name"
            value={Name}
            onChange={(e) => setName(e.target.value)} // Actualiza el estado
          />
        </div>

        {/* Campo para el email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
          />
        </div>

        {/* Campo para el teléfono */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Actualiza el estado
          />
        </div>

        {/* Campo para la dirección */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Actualiza el estado
          />
        </div>

        {/* Botón de guardar */}
        <button type="submit" className="btn btn-primary">
          Save
        </button>

        {/* Enlace para volver a la lista de contactos */}
        <div className="mt-3">
          <Link to="/contactos">or get back to contacts</Link>
        </div>
      </form>
    </div>
  );
};

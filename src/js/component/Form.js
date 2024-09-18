import React, { useState } from "react";
import "../../styles/Form.css";
import { Link, useNavigate } from "react-router-dom"; // Cambiar useHistory por useNavigate

export const Form = () => {
  // Definir estados para cada campo del formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); // Cambiar useHistory por useNavigate

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar página)

    // Crear objeto con los datos a enviar
    const updatedContact = {
      full_name: fullName,
      email: email,
      phone: phone,
      address: address,
      agenda_slug: "joanzam" // Si tu API requiere este campo
    };

    // Enviar una solicitud PUT a la API
    fetch("https://playground.4geeks.com/contact/{1}", {
      method: "PUT", // Usar el método PUT
      headers: {
        "Content-Type": "application/json" // Especificar el tipo de contenido
      },
      body: JSON.stringify(updatedContact) // Convertir el objeto a JSON para enviarlo
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        // Redirigir a la lista de contactos después de guardar
        navigate("/contactos"); // Usar navigate en lugar de history.push
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
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Actualiza el estado
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

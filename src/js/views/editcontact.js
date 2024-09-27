import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form } from '../component/Form';
import "../../styles/addcontact.css"

export const Editcontact = () => {
    return (
        <div className="container-main">
            <Form />
        </div>
    )

};

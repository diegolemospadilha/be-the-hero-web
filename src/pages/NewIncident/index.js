import React, { useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  if (ongId === null) {
    history.push("/");
  }
  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastrar incidente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Valor em reais(R$)"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;

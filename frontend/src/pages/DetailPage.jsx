import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../services/api";

export default function DetailPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(["record", id], () =>
    api.get(`/records/${id}`).then(res => res.data)
  );

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar registro</p>;

  const r = data.data;

  return (
    <div className="detail-container">
      <h1>Detalhes do Usuário</h1>
      <p><strong>ID:</strong> {r.id}</p>
      <p><strong>Nome:</strong> {r.name}</p>
      <p><strong>Email:</strong> {r.email}</p>
      <p><strong>Idade:</strong> {r.age}</p>
      <p><strong>Data de Nascimento:</strong> {r.birth_date}</p>
      <p><strong>Função:</strong> {r.role}</p>
      <p><strong>Aceitou termos:</strong> {r.agree_terms ? "Sim" : "Não"}</p>
      <p><strong>Criado em:</strong> {r.created_at}</p>
      <Link to="/list" style={{ insetBlockStart: "12px", display: "inline-block", color: "#00a8ff" }}>
        Voltar à lista
      </Link>
    </div>
  );
}



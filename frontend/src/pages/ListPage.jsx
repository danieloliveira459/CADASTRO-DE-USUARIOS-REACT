import React, { useState } from "react";
import { useQuery } from "react-query";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ListPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useQuery(
    ["records", page],
    () => api.get(`/records?page=${page}&limit=${limit}`).then(res => res.data),
    { keepPreviousData: true }
  );

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar registros</p>;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="page-center">
      <div className="list-container">
        <h1>Lista de Usuários</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Função</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <Link to={`/detail/${u.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}


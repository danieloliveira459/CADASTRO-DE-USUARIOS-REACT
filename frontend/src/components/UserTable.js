import React, { useState } from "react";
import { useQuery } from "react-query";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const limit = 5; // número de registros por página

  //  Buscar dados com React Query
  const { data, isLoading, isError } = useQuery(
    ["records", page],
    async () => {
      const res = await api.get(`/records?page=${page}&limit=${limit}`);
      return res.data;
    },
    { keepPreviousData: true }
  );

  if (isLoading) return <p>Carregando registros...</p>;
  if (isError) return <p>Erro ao carregar registros</p>;

  const records = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", display: "inline-block", inlineSize: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Função</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.age ?? "-"}</td>
                <td>{r.role ?? "-"}</td>
                <td>
                  <Link to={`/detail/${r.id}`}>Ver</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      <div style={{ insetBlockStart: "16px", display: "flex", gap: "8px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}


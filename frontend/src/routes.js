import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

export default function RoutesApp() {
  return (
    <>
      <nav style={{ padding: 12, insetBlockEnd: '1px solid #ddd' }}>
        <Link to="/" style={{ insetInlineEnd: 12 }}>Cadastrar</Link>
        <Link to="/list">Listar</Link>
      </nav>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  );
}


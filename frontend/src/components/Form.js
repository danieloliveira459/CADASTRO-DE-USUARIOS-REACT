import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { toast } from "react-toastify";

// Validação com Yup
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(3, "Mínimo 3 letras"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  age: yup.number().typeError("Idade deve ser um número").required("Idade é obrigatória").min(1, "Idade mínima é 1"),
  birth_date: yup.date().required("Data de nascimento é obrigatória"),
  role: yup.string().required("Selecione uma função"),
  agree_terms: yup.boolean().oneOf([true], "Aceite os termos"),
});

const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const res = await api.get("/users");
        setUsuarios(res.data);
        localStorage.setItem("usuarios", JSON.stringify(res.data));
      } catch (err) {
        console.warn("Erro no backend, carregando localStorage");
        const registros = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsuarios(registros);
      }
    };
    carregarUsuarios();
  }, []);

  const salvarLocalStorage = (registros) => {
    localStorage.setItem("usuarios", JSON.stringify(registros));
    setUsuarios(registros);
  };

  const handleEdit = (user) => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("age", user.age);
    setValue("birth_date", formatDateForInput(user.birth_date));
    setValue("role", user.role);
    setValue("agree_terms", user.terms_accepted);
    setEditUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (user) => {
    if (!window.confirm("Tem certeza que deseja excluir este registro?")) return;

    try {
      await api.delete(`/users/${user.id}`);
      const registros = usuarios.filter((u) => u.id !== user.id);
      salvarLocalStorage(registros);
      toast.info("Registro excluído!");
      if (editUser?.id === user.id) {
        reset();
        setEditUser(null);
      }
    } catch (err) {
      const registros = usuarios.filter((u) => u.id !== user.id);
      salvarLocalStorage(registros);
      toast.info("Registro excluído localmente (backend indisponível).");
      if (editUser?.id === user.id) {
        reset();
        setEditUser(null);
      }
      console.error("Erro ao excluir no backend:", err);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      age: data.age === "" ? null : Number(data.age),
      terms_accepted: Boolean(data.agree_terms),
      birth_date: data.birth_date,
    };

    try {
      let registros = [];
      if (editUser) {
        try {
          const res = await api.put(`/users/${editUser.id}`, payload);
          registros = usuarios.map((u) => (u.id === editUser.id ? res.data : u));
          toast.success("Registro atualizado!");
        } catch (err) {
          const localUpdated = { ...editUser, ...payload };
          registros = usuarios.map((u) => (u.id === editUser.id ? localUpdated : u));
          toast.success("Registro atualizado localmente (backend indisponível).");
          console.warn("PUT falhou, atualizado localmente:", err.message);
        }
        setEditUser(null);
      } else {
        try {
          const res = await api.post("/users", payload);
          registros = [...usuarios, res.data];
          toast.success("Registro salvo!");
        } catch (err) {
          const localRecord = { id: Date.now(), ...payload };
          registros = [...usuarios, localRecord];
          toast.success("Registro salvo localmente (backend indisponível).");
          console.warn("POST falhou, salvo localmente:", err.message);
        }
      }

      salvarLocalStorage(registros);
      reset();
    } catch (err) {
      console.error("Erro inesperado ao salvar:", err);
      toast.error(err.response?.data?.error || "Erro ao salvar");
    }
  };

  return (
    <div className="detail-container">
      <h1>Cadastro de Usuários</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input type="text" {...register("name")} />
          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>

        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div>
          <label>Idade:</label>
          <input type="number" {...register("age")} />
          <p style={{ color: "red" }}>{errors.age?.message}</p>
        </div>

        <div>
          <label>Data de Nascimento:</label>
          <input type="date" {...register("birth_date")} />
          <p style={{ color: "red" }}>{errors.birth_date?.message}</p>
        </div>

        <div>
          <label>Função:</label>
          <select {...register("role")}>
            <option value="">Selecione</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuário">Usuário</option>
            <option value="Convidado">Convidado</option>
          </select>
          <p style={{ color: "red" }}>{errors.role?.message}</p>
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("agree_terms")} />
            Aceito os termos
          </label>
          <p style={{ color: "red" }}>{errors.agree_terms?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : editUser ? "Atualizar" : "Salvar"}
        </button>

        {editUser && (
          <button type="button" onClick={() => { reset(); setEditUser(null); }} style={{ marginTop: 8 }}>
            Cancelar edição
          </button>
        )}
      </form>

      <h2>Registros salvos</h2>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário salvo ainda.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>
              <th>Data Nascimento</th>
              <th>Função</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{formatDateForInput(user.birth_date)}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user)} style={{ marginLeft: "10px" }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


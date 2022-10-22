import { FormEvent, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { api } from "../../service/api";

import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { IError } from "../../interfaces/IError";

interface ILoginForm {
  email: string;
  password: string;
}

const initialFormState: ILoginForm = {
  email: "",
  password: "",
};

function reducer(
  state: ILoginForm,
  action: { type: string; key: string; value: string }
) {
  switch (action.type) {
    case "UPDATE INPUT":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

export function Login() {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [errorMessage, setErrorMessage] = useState<null | IError>(null);
  const { setAccessToken } = useAuth();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signin", {
        email: formState.email,
        password: formState.password,
      });

      setAccessToken(res.data.access_token);
    } catch (err: any) {
      setErrorMessage({
        error: err.response.data.error,
        status: err.response.data.statusCode,
        message: err.response.data.message,
      });
    }
  }

  return (
    <div className={styles.login}>
      <Logo />

      {/* <div>
        <p
          style={{
            color: "white",
          }}
        >
          {errorMessage?.error}: {errorMessage?.status}
        </p>

        <p
          style={{
            color: "white",
          }}
        >
          {errorMessage?.message}
        </p>
      </div> */}

      <form onSubmit={handleLogin}>
        <div className={styles.inputField}>
          <Input
            type="email"
            placeholder="Email"
            value={formState.email}
            autoFocus
            onChange={(e) =>
              dispatch({
                type: "UPDATE INPUT",
                key: "email",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.inputField}>
          <Input
            type="password"
            placeholder="Password"
            value={formState.password}
            onChange={(e) =>
              dispatch({
                type: "UPDATE INPUT",
                key: "password",
                value: e.target.value,
              })
            }
          />
        </div>

        <Link to="/register">Don't have an account yet? Create one</Link>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import { FormEvent, useReducer, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../service/api";
import { IError } from "../../interfaces/IError";

import styles from "./styles.module.scss";
import { Input } from "../../components/Input";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialFormState: IRegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function reducer(
  state: IRegisterForm,
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

export function Register() {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [errorMessage, setErrorMessage] = useState<null | IError>(null);

  const { currentUser, handleSetToken } = useAuth();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      });

      handleSetToken(res.data.access_token);
    } catch (err: any) {
      setErrorMessage({
        error: err.response.data.error,
        status: err.response.data.statusCode,
        message: err.response.data.message,
      });
    }
  }

  return (
    <>
      {currentUser ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.register}>
          <Logo />

          <form onSubmit={handleRegister}>
            <div className={styles.inputField}>
              <Input
                type="text"
                placeholder="First name"
                value={formState.firstName}
                autoFocus
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE INPUT",
                    key: "firstName",
                    value: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputField}>
              <Input
                type="text"
                placeholder="Last name"
                value={formState.lastName}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE INPUT",
                    key: "lastName",
                    value: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputField}>
              <Input
                type="email"
                value={formState.email}
                placeholder="Email"
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
                value={formState.password}
                placeholder="Password"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE INPUT",
                    key: "password",
                    value: e.target.value,
                  })
                }
              />
            </div>

            <Link to="/login">Already have an account? Login</Link>

            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </>
  );
}

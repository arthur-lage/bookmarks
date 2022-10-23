import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { At, Bookmarks, SignOut } from "phosphor-react";

import styles from "./styles.module.scss";

type HeaderProps = {
  setIsModalActive: (state: boolean) => void;
  setModalType: (state: string) => void;
};

export function Header({ setIsModalActive, setModalType }: HeaderProps) {
  const { currentUser, logout } = useAuth();

  function handleLogout() {
    setIsModalActive(true);
    setModalType("logout");
  }

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <Bookmarks weight="fill" />
        <span>Bookmarks</span>
      </Link>

      <div className={styles.right}>
        <p className={styles.email}>
          <At />
          <span>{currentUser?.email}</span>
        </p>

        <button onClick={handleLogout} className={styles.logout}>
          <SignOut weight="bold" />
          <span>Log out</span>
        </button>
      </div>
    </header>
  );
}

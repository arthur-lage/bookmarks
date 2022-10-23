import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { At, Bookmarks, SignOut } from "phosphor-react";

import styles from "./styles.module.scss";
import { useState } from "react";

type HeaderProps = {
  setIsModalActive: (state: boolean) => void;
  setModalType: (state: string) => void;
};

export function Header({ setIsModalActive, setModalType }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();

  function handleLogout() {
    setIsModalActive(true);
    setModalType("logout");
  }

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.active : ""}`}>
      <Link className={styles.logo} to="/">
        <Bookmarks weight="fill" />
        <span>Bookmarks</span>
      </Link>

      <button
        onClick={handleMenu}
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
      >
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </button>

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

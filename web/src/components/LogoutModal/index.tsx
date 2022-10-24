import { useAuth } from "../../hooks/useAuth";
import { IModalProps } from "../../interfaces/IModalProps";

import styles from "./styles.module.scss"

export function LogoutModal({
  setIsModalActive,
  setModalType,
}: IModalProps) {
  const { logout } = useAuth();

  function closeModal() {
    setIsModalActive(false);
    setModalType("");
  }

  return (
    <div className={styles.logoutModal}>
      <h2>Are you sure you want to logout?</h2>

      <div className={styles.actions}>
        <button className={styles.cancel} onClick={closeModal}>Cancel</button>
        <button className={styles.logout} onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss"

type LogoutModalProps = {
  setIsModalActive: (state: boolean) => void;
  setModalType: (state: string) => void;
};

export function LogoutModal({
  setIsModalActive,
  setModalType,
}: LogoutModalProps) {
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

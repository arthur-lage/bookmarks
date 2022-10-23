import { ReactNode } from "react";

import styles from "./styles.module.scss";

type ModalWrapperProps = {
  children: ReactNode;
  isActive: boolean;
};

export function ModalWrapper({ children, isActive }: ModalWrapperProps) {
  return (
    <div className={`${styles.modalWrapper} ${isActive ? styles.active : ""}`}>
      {children}
    </div>
  );
}

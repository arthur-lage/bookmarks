import { ReactNode, useEffect } from "react";

import styles from "./styles.module.scss";

type ModalWrapperProps = {
  children: ReactNode;
  isActive: boolean;
};

export function ModalWrapper({ children, isActive }: ModalWrapperProps) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isActive]);

  return (
    <div className={`${styles.modalWrapper} ${isActive ? styles.active : ""}`}>
      {children}
    </div>
  );
}

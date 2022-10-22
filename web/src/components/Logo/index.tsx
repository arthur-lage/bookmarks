import { Bookmarks } from "phosphor-react";

import styles from "./styles.module.scss";

export function Logo() {
  return (
    <div className={styles.logo}>
      <Bookmarks weight="fill" />
      <span>Bookmarks</span>
    </div>
  );
}

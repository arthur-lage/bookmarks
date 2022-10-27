import { CircleNotch } from "phosphor-react";
import styles from './styles.module.scss'

export function Loading () {
  return (
    <div className={styles.loadingWrapper}>
      <CircleNotch weight="bold" />
    </div>
  )
}
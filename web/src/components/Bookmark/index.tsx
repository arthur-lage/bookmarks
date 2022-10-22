import { BookmarkSimple, Link } from "phosphor-react";
import { IBookmark } from "../../interfaces/IBookmark";
import styles from "./styles.module.scss";
export interface BookmarkProps {
  bookmark: IBookmark;
}

export function Bookmark({ bookmark }: BookmarkProps) {
  return (
    <div className={styles.bookmark} key={bookmark.id}>
      <p className={styles.title}>
        <BookmarkSimple weight="fill" />
        <span>{bookmark.title}</span>
      </p>

      <div className={styles.description}>{bookmark.description}</div>

      <a target={"_blank"} href={bookmark.link} className={styles.link}>
        <Link />
        <span>{bookmark.link}</span>
      </a>

      <button className={styles.moreDetailsButton}>More Details</button>
    </div>
  );
}

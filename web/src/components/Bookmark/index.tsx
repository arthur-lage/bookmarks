import { BookmarkSimple, Link } from "phosphor-react";
import { IBookmark } from "../../interfaces/IBookmark";
import styles from "./styles.module.scss";
export interface BookmarkProps {
  bookmark: IBookmark;
  handleMoreDetails: () => void;
  setMoreDetailsBookmarkId: (state: string | null) => void;
}

export function Bookmark({
  bookmark,
  handleMoreDetails,
  setMoreDetailsBookmarkId,
}: BookmarkProps) {
  function handleMoreDetailsButton() {
    setMoreDetailsBookmarkId(bookmark.id);
    handleMoreDetails();
  }

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

      <button
        onClick={handleMoreDetailsButton}
        className={styles.moreDetailsButton}
      >
        More Details
      </button>
    </div>
  );
}

import { IBookmark } from "../../interfaces/IBookmark";
import { Bookmark } from "../Bookmark";

import styles from "./styles.module.scss";

export interface BookmarkListProps {
  bookmarks: IBookmark[];
  search: string;
}

export function BookmarkList({ bookmarks, search }: BookmarkListProps) {
  return (
    <section className={styles.bookmarkList}>
      {bookmarks
        .filter((bookmark) => bookmark.title.match(new RegExp(search, "i")))
        .map((bookmark) => (
          <Bookmark key={bookmark.id} bookmark={bookmark} />
        ))}
    </section>
  );
}

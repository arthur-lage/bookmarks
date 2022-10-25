import { IBookmark } from "../../interfaces/IBookmark";
import { Bookmark } from "../Bookmark";

import styles from "./styles.module.scss";

export interface BookmarkListProps {
  bookmarks: IBookmark[];
  search: string;
  handleMoreDetails: () => void;
  setMoreDetailsBookmarkId: (state: string | null) => void
}

export function BookmarkList({ setMoreDetailsBookmarkId, handleMoreDetails, bookmarks, search }: BookmarkListProps) {
  return (
    <div className={styles.bookmarkListWrapper}>
      {bookmarks.length > 0 ? (
        <section className={styles.bookmarkList}>
          {bookmarks
            .filter((bookmark) => bookmark.title.match(new RegExp(search, "i")))
            .map((bookmark) => (
              <Bookmark setMoreDetailsBookmarkId={setMoreDetailsBookmarkId} handleMoreDetails={handleMoreDetails} key={bookmark.id} bookmark={bookmark} />
            ))}
        </section>
      ) : (
        <div className={styles.noBookmarksWrapper}>
          <h3>You haven't created a bookmark yet</h3>
        </div>
      )}
    </div>
  );
}

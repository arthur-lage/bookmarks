import { IBookmark } from "../../interfaces/IBookmark";
import { Bookmark } from "../Bookmark";

export interface BookmarkListProps {
  bookmarks: IBookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <section>
      {bookmarks.map((bookmark) => (
        <Bookmark key={bookmark.id} bookmark={bookmark} />
      ))}
    </section>
  );
}

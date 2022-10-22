import { IBookmark } from "../../interfaces/IBookmark";

export interface BookmarkProps {
  bookmark: IBookmark;
}

export function Bookmark({ bookmark }: BookmarkProps) {
  return (
    <div key={bookmark.id}>
      <p>{bookmark.title}</p>
      <p>{bookmark.description}</p>
      <p>{bookmark.link}</p>
    </div>
  );
}

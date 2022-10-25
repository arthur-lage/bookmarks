import { useEffect, useState } from "react";
import { IBookmark } from "../../interfaces/IBookmark";
import { IModalProps } from "../../interfaces/IModalProps";
import { api } from "../../service/api";

interface MoreDetailsModalProps extends IModalProps {
  setBookmarkId: (state: string | null) => void;
  bookmarkId: string | null;
}

export function MoreDetailsModal({
  setBookmarkId,
  bookmarkId,
  setIsModalActive,
  setModalType,
}: MoreDetailsModalProps) {
  const [bookmarkInfo, setBookmarkInfo] = useState<IBookmark | null>(null);

  async function fetchBookmarkById() {
    const res = await api.get("/bookmarks/" + bookmarkId);

    setBookmarkInfo(res.data);
  }

  useEffect(() => {
    fetchBookmarkById();
  }, []);

  function closeModal() {
    setModalType("");
    setIsModalActive(false);
    setBookmarkId(null);
  }

  return (
    <div>
      <div style={{ color: "white", fontSize: 32 }}>
        {bookmarkInfo && (
          <>
            <p>{bookmarkInfo.id}</p>
            <p>{bookmarkInfo.title}</p>
            <p>{bookmarkInfo?.description}</p>
            <p>{bookmarkInfo.link}</p>
          </>
        )}
      </div>
      <button onClick={closeModal} className={"styles.cancel"}>
        Cancel
      </button>
    </div>
  );
}

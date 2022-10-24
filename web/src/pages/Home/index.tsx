import { useEffect, useState } from "react";

import { BookmarkList } from "../../components/BookmarkList";
import { Header } from "../../components/Header";

import { IBookmark } from "../../interfaces/IBookmark";

import { api } from "../../service/api";

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";

import { Input } from "../../components/Input";
import { ModalWrapper } from "../../components/ModalWrapper";
import { LogoutModal } from "../../components/LogoutModal";
import { CreateBookmarkModal } from "../../components/CreateBookmarkModal";

export function Home() {
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<[] | IBookmark[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalType, setModalType] = useState("");
  const { accessToken } = useAuth();

  function handleNewBookmark() {
    setModalType("create-bookmark");
    setIsModalActive(true);
  }

  async function fetchBookmarks() {
    const res = await api.get("/bookmarks");

    setBookmarks(res.data);
  }

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("bookmarks::access_token") as string
    )}`;

    fetchBookmarks();
  }, [accessToken]);

  return (
    <div className={styles.home}>
      <Header setModalType={setModalType} setIsModalActive={setIsModalActive} />

      <ModalWrapper isActive={isModalActive}>
        {modalType === "logout" && (
          <LogoutModal
            setModalType={setModalType}
            setIsModalActive={setIsModalActive}
          />
        )}

        {modalType === "create-bookmark" && (
          <CreateBookmarkModal
            fetchBookmarks={fetchBookmarks}
            setModalType={setModalType}
            setIsModalActive={setIsModalActive}
          />
        )}
      </ModalWrapper>

      <main>
        <section className={styles.searchAndCreateBookmark}>
          <h2>Bookmarks</h2>

          <div className={styles.right}>
            <div className={styles.inputField}>
              <Input
                type="text"
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search for a bookmark..."
              />
            </div>

            <button
              onClick={handleNewBookmark}
              className={styles.newBookmarkButton}
            >
              New Bookmark
            </button>
          </div>
        </section>

        <BookmarkList search={search} bookmarks={bookmarks} />
      </main>
    </div>
  );
}

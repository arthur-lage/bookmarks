import { useEffect, useState } from "react";

import { BookmarkList } from "../../components/BookmarkList";
import { Header } from "../../components/Header";

import { IBookmark } from "../../interfaces/IBookmark";

import { api } from "../../service/api";

import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";
import { Input } from "../../components/Input";

export function Home() {
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<[] | IBookmark[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

    async function fetchBookmarks() {
      const res = await api.get("/bookmarks");

      setBookmarks(res.data);
    }

    fetchBookmarks();
  }, []);

  return (
    <div className={styles.home}>
      <Header />

      <main>
        <section className={styles.searchAndCreateBookmark}>
          <h2>Bookmarks</h2>

          <div className={styles.right}>
            <Input
              className={styles.searchInput}
              type="text"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search for a bookmark..."
            />

            <button className={styles.newBookmarkButton}>New Bookmark</button>
          </div>
        </section>

        <BookmarkList search={search} bookmarks={bookmarks} />
      </main>
    </div>
  );
}

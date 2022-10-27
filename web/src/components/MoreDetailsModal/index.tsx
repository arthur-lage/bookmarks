import { Check, Pencil, Trash } from "phosphor-react";
import { useEffect, useState, useReducer, FormEvent } from "react";

import { IBookmark } from "../../interfaces/IBookmark";
import { IModalProps } from "../../interfaces/IModalProps";
import { IReducerAction } from "../../interfaces/IReducerAction";

import { api } from "../../service/api";

import { Input } from "../Input";

import styles from "./styles.module.scss";

interface MoreDetailsModalProps extends IModalProps {
  setBookmarkId: (state: string | null) => void;
  bookmarkId: string | null;
  fetchBookmarks: () => void;
}

const initialFormState: Omit<IBookmark, "id"> = {
  title: "",
  description: "",
  link: "",
};

function reducer(state: Omit<IBookmark, "id">, action: IReducerAction) {
  switch (action.type) {
    case "UPDATE INPUT":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

export function MoreDetailsModal({
  setBookmarkId,
  bookmarkId,
  setIsModalActive,
  setModalType,
  fetchBookmarks,
}: MoreDetailsModalProps) {
  const [bookmarkInfo, setBookmarkInfo] = useState<IBookmark | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  async function fetchBookmarkById() {
    const res = await api.get("/bookmarks/" + bookmarkId);

    setBookmarkInfo(res.data);

    dispatch({
      key: "title",
      type: "UPDATE INPUT",
      value: res.data.title,
    });

    dispatch({
      key: "description",
      type: "UPDATE INPUT",
      value: res.data.description,
    });

    dispatch({
      key: "link",
      type: "UPDATE INPUT",
      value: res.data.link,
    });
  }

  useEffect(() => {
    fetchBookmarkById();
  }, []);

  function closeModal() {
    setModalType("");
    setIsModalActive(false);
    setBookmarkId(null);
  }

  async function updateBookmark(e: FormEvent) {
    e.preventDefault();

    console.log("tututut");

    const res = await api.patch("/bookmarks/" + bookmarkId, {
      title: formState.title,
      description: formState.description,
      link: formState.link,
    });

    console.log(res);

    closeModal();
    fetchBookmarks();
  }

  async function deleteBookmark() {
    const res = await api.delete("/bookmarks/" + bookmarkId);

    console.log(res);

    closeModal();

    fetchBookmarks();
  }

  return (
    <div className={styles.moreDetailsModal}>
      {!isEditing ? (
        <>
          <div className={styles.header}>
            <button className={styles.deleteButton} onClick={deleteBookmark}>
              <Trash weight="fill" />
              <span>Delete</span>
            </button>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <Pencil weight="fill" />
              <span>Edit</span>
            </button>
          </div>
          <>
            {bookmarkInfo && (
              <div className={styles.bookmarkInformation}>
                <span>
                  <b>Title</b>
                  <span>{bookmarkInfo.title}</span>
                </span>
                <div className={styles.divisor}></div>
                <span>
                  <b>Description</b>
                  <span>{bookmarkInfo?.description}</span>
                </span>
                <div className={styles.divisor}></div>
                <span>
                  <b>Link</b>
                  <span>{bookmarkInfo.link}</span>
                </span>
              </div>
            )}
          </>
          <button onClick={closeModal} className={styles.cancel}>
            Cancel
          </button>
        </>
      ) : (
        <div>
          <form onSubmit={updateBookmark}>
            <div className={styles.inputField}>
              <Input
                type="text"
                placeholder="Bookmark title"
                onChange={(e) =>
                  dispatch({
                    key: "title",
                    value: e.target.value,
                    type: "UPDATE INPUT",
                  })
                }
                value={formState.title}
              />
            </div>

            <div className={styles.textareaField}>
              <textarea
                placeholder="Bookmark description (OPTIONAL)"
                onChange={(e) =>
                  dispatch({
                    key: "description",
                    value: e.target.value,
                    type: "UPDATE INPUT",
                  })
                }
                value={formState.description}
              ></textarea>
            </div>

            <div className={styles.inputField}>
              <Input
                type="text"
                placeholder="Bookmark link"
                onChange={(e) =>
                  dispatch({
                    key: "link",
                    value: e.target.value,
                    type: "UPDATE INPUT",
                  })
                }
                value={formState.link}
              />
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setIsEditing(false)}
                className={styles.cancel}
              >
                Cancel
              </button>
              <button className={styles.save} type="submit">
                <span>Save</span>
                <Check />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

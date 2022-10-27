import { FormEvent, useReducer } from "react";
import { ICreateBookmark } from "../../interfaces/ICreateBookmark";
import { IModalProps } from "../../interfaces/IModalProps";
import { IReducerAction } from "../../interfaces/IReducerAction";
import { api } from "../../service/api";
import { Input } from "../Input";

import styles from "./styles.module.scss";

const initialFormState: ICreateBookmark = {
  title: "",
  description: null,
  link: "",
};

function reducer(state: ICreateBookmark, action: IReducerAction) {
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

interface ICreateBookmarkProps extends IModalProps {
  fetchBookmarks: () => void
}

export function CreateBookmarkModal({
  setIsModalActive,
  setModalType,
  fetchBookmarks
}: ICreateBookmarkProps) {
  const [formState, dispatch] = useReducer(reducer, initialFormState);

  function closeModal() {
    setIsModalActive(false);
    setModalType("");
  }

  async function handleCreateBookmark(e: FormEvent) {
    e.preventDefault();

    try {
      let description = formState.description ? formState.description : null;

      await api.post("/bookmarks", {
        title: formState.title,
        description,
        link: formState.link,
      });

      fetchBookmarks()

      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.createBookmarkModal}>
      <h2>Create a new bookmark</h2>

      <form onSubmit={handleCreateBookmark}>
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
          >
            {formState.description}
          </textarea>
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
          <button onClick={closeModal} className={styles.cancel}>
            Cancel
          </button>
          <button type="submit" className={styles.create}>Create</button>
        </div>
      </form>
    </div>
  );
}

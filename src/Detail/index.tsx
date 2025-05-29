import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import style from "../global.module.css";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div style={{ padding: 24 }}>No article selected.</div>;

  return (
    <div className={style.container}>
      <Button onClick={() => navigate(-1)} className={style.btn_back}>
        Back
      </Button>
      <div>
        <h1 className={style.title}>{state.title}</h1>
        <img alt="thumbnail" src={state.urlToImage} className={style.image_card} />
        <div className={style.text_cover}>
          <p className={style.text_content}>
            <strong>Author:</strong> {state.author || "Unknown"}
          </p>
          <p className={style.text_content}>
            <strong>Published At:</strong> {new Date(state.publishedAt).toLocaleString()}
          </p>
          <p className={style.text_content}>
            <strong>Description:</strong> {state.description}
          </p>
          <p className={style.text_content}>
            <strong>Content:</strong> {state.content || "No content available."}
          </p>
          <a href={state.url} target="_blank" rel="noopener noreferrer">
            Read full article
          </a>
        </div>
      </div>
    </div>
  );
};

export default Detail;

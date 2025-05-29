import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import style from "./card.module.css";

interface Props {
  article: {
    title: string;
    author: string;
    publishedAt: string;
    url: string;
    urlToImage: string;
    description: string;
    content?: string;
  };
}

const NewsCard: React.FC<Props> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className={style.card_wrapper}
      onClick={() => navigate(`/detail`, { state: article })}
      cover={article.urlToImage ? <img alt="thumbnail" src={article.urlToImage} className={style.image_card} /> : null}>
      <div style={{ flex: 1 }}>
        <Card.Meta
          title={<div className={style.title}>{article.title}</div>}
          description={
            <div>
              <div className={style.author}>{article.author || "Unknown Author"}</div>
              <div className={style.author}>{new Date(article.publishedAt).toLocaleString()}</div>
              <div className={style.description}>{article.description}</div>
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default NewsCard;

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Spin, Space } from "antd";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import style from "../global.module.css";

interface Article {
  title: string;
  author: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  description: string;
  content?: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: "us",
          category: "business",
          pageSize,
          page: currentPage,
          apiKey,
        },
      });

      setArticles(res.data.articles);
      setTotalResults(res.data.totalResults);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <>
      <div className={style.container}>
        {loading ? (
          <div className={style.loading}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {articles.map((article, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <NewsCard article={article} />
                </Col>
              ))}
            </Row>

            <div className={style.pagination}>
              <Space>
                <Button disabled={currentPage === 1 || loading} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button disabled={currentPage === totalPages || loading} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                  Next
                </Button>
              </Space>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { PageHeader, List, Card, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const { Meta } = Card;

export const Gallery = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const NasaURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=JfjGqw1yOKJZGp2MspTyXJR91g2Q6VvLsC7Pg8ph`;

  useEffect(() => {
    fetch(NasaURL)
      .then((response) => response.json())
      .then(
        (result) => {
          setData(data.concat(result.photos));
          setLoading(false);
          setInitLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [NasaURL]);

  const onLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const handleLike = (item, index) => {
    item.like = !(item.like ?? false);
    setData(Object.assign([], data, { [index]: item }));
  };

  return (
    <div>
      <PageHeader
        title="Spacestagram"
        subTitle="Brought to you by NASA's image API"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          dataSource={data}
          loading={initLoading}
          loadMore={loadMore}
          renderItem={(photo, index) => (
            <List.Item>
              <Card
                style={{ width: "80vw" }}
                cover={<img alt={photo.camera.full_name} src={photo.img_src} />}
                actions={[
                  <LikeOutlined
                    key="like"
                    style={{ color: photo.like ? "#eb2f96" : "grey" }}
                    onClick={() => handleLike(photo, index)}
                  />,
                ]}
              >
                <Meta
                  title={photo.camera.name}
                  description={photo.earth_date}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

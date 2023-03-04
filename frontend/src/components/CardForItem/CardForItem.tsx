import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../constants";

interface Props {
  image: string;
  title: string;
  price: number;
  id: string;
}

const CardForItem: React.FC<Props> = ({ id, image, title, price }) => {
  const navigate = useNavigate();

  const navigateTo = (id: string) => {
    navigate("/" + id);
  };
  const cardImage = BaseUrl + "/" + image;
  return (
    <div>
      <Card
        sx={{ width: 200, my: 4, height: 250 }}
        onClick={() => navigateTo(id)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {price}$
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardForItem;

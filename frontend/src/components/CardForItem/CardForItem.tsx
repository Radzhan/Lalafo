import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { BaseUrl } from "../../constants";

interface Props {
  image: string;
  title: string;
  price: number;
}

const CardForItem: React.FC<Props> = ({ image, title, price }) => {
  const cardImage = BaseUrl + "/" + image;
  return (
    <div>
      <Card sx={{ width: 200 , my: 4, height: 250}}>
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

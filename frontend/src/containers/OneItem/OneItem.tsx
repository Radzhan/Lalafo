import { Button, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import { BaseUrl } from "../../constants";
import { selectUser } from "../../features/user/userSlice";
import {
  deleteItem,
  getOneItem,
  item,
  oneItemBoolean,
} from "../../store/lalafoSlice";

const OneItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const itemFrom = useAppSelector(getOneItem);
  const user = useAppSelector(selectUser);
  const forSpinner = useAppSelector(oneItemBoolean);

  const getOne = useCallback(async () => {
    await dispatch(item(id!));
  }, [dispatch, id]);

  useEffect(() => {
    getOne().catch(console.error);
  }, [getOne]);

  const cardImage = BaseUrl + "/" + itemFrom.image;

  const deleteOne = async (id: string) => {
    await dispatch(deleteItem(id));
    navigate("/");
  };

  return forSpinner ? (
    <Spinner />
  ) : (
    <div>
      <CardMedia
        component="img"
        height="300"
        image={cardImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {itemFrom.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Category: {itemFrom.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Name: {itemFrom.displayname}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          phone: {itemFrom.number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {itemFrom.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {itemFrom.description}
        </Typography>
      </CardContent>
      {user?._id === itemFrom.user ? (
        <Button variant="contained" onClick={() => deleteOne(id!)}>
          Delete
        </Button>
      ) : null}
    </div>
  );
};

export default OneItem;

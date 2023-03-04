import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { ItemMutation } from "../../types";
import ItemForm from "../../components/ItemForm/ItemForm";
import { createItem, forCreating } from "../../store/lalafoSlice";
import Spinner from "../../components/Spinner/Spinner";
const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getBoolean = useAppSelector(forCreating);

  const onFormSubmit = async (productMutation: ItemMutation) => {
    try {
      await dispatch(createItem(productMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e)
    }
  };

  return getBoolean ? (
    <Spinner />
  ) : (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        New product
      </Typography>
      <ItemForm onSubmit={onFormSubmit} />
    </div>
  );
};

export default AddNewItem;

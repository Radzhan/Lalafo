import { Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ProductMutation } from '../../types';import ItemForm from '../../components/ItemForm/ItemForm';
import { createItem } from '../../store/lalafoSlice';
;

const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createItem(productMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New product</Typography>
      <ItemForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default AddNewItem;
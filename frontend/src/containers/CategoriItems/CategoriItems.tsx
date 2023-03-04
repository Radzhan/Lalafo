import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForItem from "../../components/CardForItem/CardForItem";
import Spinner from "../../components/Spinner/Spinner";
import {
  arrayCategories,
  categoriItems,
  categoryArray,
  getByItemGategory,
} from "../../store/lalafoSlice";

const CategoriItems = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
  const Categories = useAppSelector(arrayCategories);
  const getBy = useAppSelector(categoryArray);
  const oneBoolean = useAppSelector(categoriItems);
  const navigate = useNavigate();

  const getAllItemFromCategory = useCallback(async () => {
    await dispatch(getByItemGategory(name!));
  }, [dispatch, name]);

  useEffect(() => {
    getAllItemFromCategory().catch(console.error);
  }, [getAllItemFromCategory]);

  const navigateTo = (name: string) => {
    if (name === "/") {
      navigate("/");
    } else {
      navigate("/category/" + name);
    }
  };

  const createCard = getBy.map((element) => {
    return (
      <CardForItem
        image={element.image}
        title={element.title}
        price={element.price}
        id={element._id}
        key={element._id}
      />
    );
  });
  return oneBoolean ? (
    <Spinner />
  ) : (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <div>
          <ul>
            <li onClick={() => navigateTo("/")}>All items</li>
            {Categories.map((element) => {
              return (
                <li onClick={() => navigateTo(element.title)} key={element._id}>
                  {element.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
            flexWrap: "wrap",
            width: "50%",
            gap: "3%",
          }}
        >
          {createCard}
        </div>
      </div>
    </div>
  );
};

export default CategoriItems;

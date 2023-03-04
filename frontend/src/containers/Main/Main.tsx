import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForItem from "../../components/CardForItem/CardForItem";
import Spinner from "../../components/Spinner/Spinner";
import {
  arrayCategories,
  arrayItems,
  forItem,
  getAllItems,
  getCategories,
} from "../../store/lalafoSlice";

const Main = () => {
  const navigate = useNavigate();
  const Items = useAppSelector(arrayItems);
  const Categories = useAppSelector(arrayCategories);
  const forSpinner = useAppSelector(forItem);
  const dispatch = useAppDispatch();

  const getAll = useCallback(async () => {
    await dispatch(getAllItems());
    await dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    getAll().catch(console.error);
  }, [getAll]);

  const createCard = Items.map((element) => {
    return (
      <CardForItem
        id={element._id}
        key={element._id}
        image={element.image}
        title={element.title}
        price={element.price}
      />
    );
  });

  const navigateTo = (name: string) => {
    navigate("/category/" + name);
  };

  return forSpinner ? (
    <Spinner />
  ) : (
    <div
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        display: "flex",
      }}
    >
      <div>
        <ul>
          <li>All items</li>
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
  );
};

export default Main;

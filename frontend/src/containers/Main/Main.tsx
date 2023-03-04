import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForItem from "../../components/CardForItem/CardForItem";
import {
  arrayCategories,
  arrayItems,
  getAllItems,
  getCategories,
} from "../../store/lalafoSlice";

const Main = () => {
  const Items = useAppSelector(arrayItems);
  const Categories = useAppSelector(arrayCategories);
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
        key={element._id}
        image={element.image}
        title={element.title}
        price={element.price}
      />
    );
  });

  return (
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
            return <li key={element._id}>{element.title}</li>;
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

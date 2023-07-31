import { useState } from "react";

const initialItems = [
  {
    id: 1,
    itemName: "Banana",
    quantity: 2,
    price: 24.0,
  },
  {
    id: 2,
    itemName: "Eggs",
    quantity: 12,
    price: 16.0,
  },
  {
    id: 3,
    itemName: "Sardines",
    quantity: 4,
    price: 32.0,
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(id) {
    setSelectedId((selectedId) => id);
    console.log(selectedId);
  }

  function handleUpdatedItem(id, updatedName, updatedQuantity, updatedPrice) {
    setItems((curItems) =>
      curItems.map((curItem) =>
        curItem.id === id
          ? {
              ...curItem,
              itemName: updatedName,
              quantity: updatedQuantity,
              price: updatedPrice,
            }
          : curItem
      )
    );
  }

  function handleDelete(id) {
    setItems((curItems) => curItems.filter((curItem) => curItem.id !== id));
  }

  return (
    <div className="main-container">
      <Header />
      <Form onSetItems={setItems} />
      <LeftContainer
        data={items}
        onSelectedId={handleSelectedId}
        onDelete={handleDelete}
      />
      <RightContainer
        data={items}
        selectedId={selectedId}
        onUpdateItem={handleUpdatedItem}
      />
      <Footer data={items} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1 className="title-header">SHOPPING LIST</h1>
    </div>
  );
}

function Form({ onSetItems }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      itemName: itemName,
      quantity: quantity,
      price: itemPrice,
    };

    onSetItems((curItems) => [...curItems, newItem]);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="price per unit"
        value={itemPrice}
        onChange={(e) => setItemPrice(Number(e.target.value))}
      />
      <button className="btn-add">ADD PRODUCT</button>
    </form>
  );
}

function LeftContainer({ data, onSelectedId, onDelete }) {
  return (
    <div className="left-container">
      {data.map((item) => (
        <ItemBox
          item={item}
          key={item.id}
          onSelectedId={onSelectedId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function RightContainer({ data, selectedId, onUpdateItem }) {
  return (
    <div className="right-container">
      <UpdateForm
        data={data}
        selectedId={selectedId}
        onUpdateItem={onUpdateItem}
      />
    </div>
  );
}

function ItemBox({ item, onSelectedId, onDelete }) {
  return (
    <div className="item-box">
      <p className="item-name">{item.itemName}</p>
      <p>{item.quantity}</p>
      <p>Php {item.price}.00</p>
      <div className="buttons">
        <button className="btn-update" onClick={() => onSelectedId(item.id)}>
          UPDATE
        </button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          DELETE
        </button>
      </div>
    </div>
  );
}

function UpdateForm({ data, selectedId, onUpdateItem }) {
  const [updatedItemName, setUpdatedItemName] = useState("");
  const [updateQuantity, setUpdatedQuantity] = useState(1);
  const [updatedItemPrice, setUpdatedItemPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleCancel() {
    setUpdatedItemName("");
    setUpdatedQuantity(1);
    setUpdatedItemPrice("");
  }

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      {data.map((item) =>
        item.id === selectedId ? (
          <>
            <input
              key={item.id}
              type="text"
              placeholder={item.itemName}
              value={updatedItemName}
              onChange={(e) => setUpdatedItemName(e.target.value)}
            />
            <select
              value={updateQuantity}
              onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={item.quantity}
              value={updatedItemPrice}
              onChange={(e) => setUpdatedItemPrice(Number(e.target.value))}
            />
            <div className="buttons">
              <button
                className="btn-save"
                onClick={() =>
                  onUpdateItem(
                    selectedId,
                    updatedItemName,
                    updateQuantity,
                    updatedItemPrice
                  )
                }
              >
                SAVE
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                CANCEL
              </button>
            </div>
          </>
        ) : null
      )}
    </form>
  );
}

function Footer({ data }) {
  const total_amount = data.reduce((acc, cur) => cur.price + acc, 0);

  return (
    <div className="footer">
      <p>TOTAL ITEMS: {data.length}</p>
      <p>TOTAL AMOUNT: PHP {total_amount}.00</p>
    </div>
  );
}

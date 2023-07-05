import { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");

  const onAddTask = () => {
    const task = {
      text: value,
      description: desc,
      isCompleted: false, // Добавил  свойство isCompleted со значением false
      isEditing: false, // Добавил  свойство isEditing со значением false
    };
    setState([...state, task]);
    console.log(state);
  };

  const onDelete = (item) => {
    setState(state.filter((el) => el.text !== item.text));
    console.log(state);
  };

  const onToggleComplete = (item) => {
    setState(
      state.map((el) => {
        if (el.text === item.text) {
          return { ...el, isCompleted: !el.isCompleted };
        }
        return el;
      })
    );
  };

  const onEdit = (item) => {
    setState(
      state.map((el) => {
        if (el.text === item.text) {
          return { ...el, isEditing: true };
        }
        return el;
      })
    );
  };

  const onSaveEdit = (item, newText) => {
    setState(
      state.map((el) => {
        if (el.text === item.text) {
          return { ...el, text: newText, isEditing: false };
        }
        return el;
      })
    );
  };

  return (
    <div className="App">
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="title"
        />
        <input
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
        />
      </div>
      <input onClick={onAddTask} type="submit" />
      <div>
        {state.map((item, i) => {
          return (
            <div key={i}>
              {item.isEditing ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => onSaveEdit(item, e.target.value)}
                />
              ) : (
                <div style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
                  {item.text}
                </div>
              )}
              <div>{item.description}</div>
              <input
                onClick={() => onDelete(item)}
                type="submit"
                value={"delete"}
              />
              {item.isEditing ? (
                <input type="submit" value="save" onClick={() => onSaveEdit(item, item.text)} />
              ) : (
                <input type="submit" value="edit" onClick={() => onEdit(item)} />
              )}
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => onToggleComplete(item)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

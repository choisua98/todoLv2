import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../redux/modules/todos";
import { useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const StLayout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  min-width: 800px;
`;
const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border: 1px solid #ddd;
  padding: 0 20px;
`;
const StInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  background-color: rgb(216, 223, 223);
  margin: 0 auto;
  padding: 30px;
`;
const StLabel = styled.label`
  font-size: 17px;
  font-weight: bold;
`;
const StInputBox = styled.input`
  height: 40px;
  width: 240px;
  border: 1px solid teal;
  border-radius: 10px;
  padding: 0 12px;
`;
const StWorking = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StTitle = styled.div`
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
const StComponentStyle = styled.div`
  width: 270px;
  border: 4px solid teal;
  border-radius: 10px;
  padding: 20px;
  margin: 0px 8px 8px 8px;
`;
const StAddbtn = styled.button`
  height: 40px;
  width: 140px;
  cursor: pointer;
  color: #fff;
  background-color: teal;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  margin-left: 280px;
`;
const StBtns = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 15px;
`;
const StRemovebtn = styled.button`
  border: 2px solid red;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  width: 50%;
  background-color: #fff;
`;
const StDonebtn = styled.button`
  border: 2px solid green;
  border-radius: 8px;
  cursor: pointer;
  height: 40px;
  width: 50%;
  background-color: #fff;
`;
const StH2 = styled.h2`
  display: block;
  font-weight: bold;
`;

const Home = () => {
  // return <Router />;
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  //제목 변경
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  //내용변경
  const contentsChangeHandler = (event) => {
    setContents(event.target.value);
  };

  //추가버튼 클릭
  const clickAddButtonHandler = () => {
    //새로운 todo생성
    const newTodo = {
      id: uuid(),
      title: title,
      contents: contents,
      isDone: false,
    };
    dispatch(addTodo(newTodo));

    //버튼클릭 후 인풋창 비우기
    setTitle("");
    setContents("");
  };

  //삭제버튼 클릭(x)
  const clickRemoveButtonHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  //완료취소버튼 클릭
  const clickDoneButtonHandler = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <StLayout>
      <StContainer>
        <div>📌My Todo List📌</div>
        <div>React</div>
      </StContainer>

      <StInput>
        <StLabel>제목&nbsp;{""}</StLabel>
        <StInputBox value={title} onChange={titleChangeHandler} />
        <br />
        <StLabel>내용&nbsp;{""}</StLabel>
        <StInputBox value={contents} onChange={contentsChangeHandler} />
        <br />
        <StAddbtn onClick={clickAddButtonHandler}>추가하기</StAddbtn>
      </StInput>
      {/* <TodoList /> */}
      <div className="list-container">
        <StH2>Working.. 🔥</StH2>
        <StWorking>
          {todos
            .filter((item) => !item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo
                  item={item}
                  completeFunction={clickDoneButtonHandler}
                  clickRemoveButtonHandler={clickRemoveButtonHandler}
                />
              </div>
            ))}
        </StWorking>

        <StH2>Done..! 🎉</StH2>
        <StWorking>
          {todos
            .filter((item) => item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo
                  item={item}
                  completeFunction={clickDoneButtonHandler}
                  clickRemoveButtonHandler={clickRemoveButtonHandler}
                />
              </div>
            ))}
        </StWorking>
      </div>
    </StLayout>
  );
};

//todo카드 부분
const Todo = ({ item, clickRemoveButtonHandler, completeFunction }) => {
  const { id, title, contents, isDone } = item;

  const clickDoneButtonHandler = () => {
    completeFunction(id);
  };
  return (
    <StComponentStyle key={item.id}>
      <div className="todocontents">
        <StTitle>{title}</StTitle>
        <div className="contents">{contents}</div>
      </div>

      <StBtns>
        {/* 삭제버튼 랜더링 */}
        <StRemovebtn onClick={() => clickRemoveButtonHandler(id)}>
          삭제하기
        </StRemovebtn>
        {/* 완료/취소버튼 렌더링*/}
        <StDonebtn onClick={clickDoneButtonHandler}>
          {isDone ? "취소" : "완료"}
        </StDonebtn>
      </StBtns>
    </StComponentStyle>
  );
};

export default Home;

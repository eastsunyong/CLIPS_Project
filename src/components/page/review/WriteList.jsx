import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { Btn, Card } from "components/common";
import { CalendarI, Location, My } from "assets/icons";
import { __getPromiseList } from "store/modules/promiseSlice";
import { startWriteReview, typeToggle } from "store/modules/reviewSlice";

const WriteList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId);
  const list = useSelector((state) => state.promise.promiseList);

  // 마운트 시 리스트 호출
  useEffect(() => {
    if (!list.length) {
      dispatch(__getPromiseList());
    }
  }, []);

  return (
    <>
      {list.map((promise) => {
        if (promise.userId === userId) {
          return (
            <Card key={promise.promiseId}>
              <div className="cardTitle">{promise.title}</div>

              <div>
                <div className="contentIcon">
                  <My className="sm" />
                </div>
                {promise.countFriend !== 0 ? `회원님 외 ${promise.countFriend}명` : "자신과의 약속"}
              </div>

              <div>
                <div className="contentIcon">
                  <CalendarI className="sm" />
                </div>
                {dayjs(promise.date).format("YYYY.MM.DD HH:mm")}
              </div>

              <div>
                <div className="contentIcon">
                  <Location className="sm" />
                </div>
                {promise.location ? promise.location : "장소를 불러올 수 없습니다."}
              </div>

              <Btn
                outLine={promise.done}
                onClick={() => {
                  promise.done ? dispatch(typeToggle()) : dispatch(startWriteReview(promise));
                }}
              >
                {promise.done ? "후기 작성 완료" : "후기 쓰기"}
              </Btn>
            </Card>
          );
        }
      })}
    </>
  );
};

export default memo(WriteList);

import { useState } from "react";
import { useForm } from "react-hook-form";

const useSearch = () => {
  const { register, unregister, setValue, getValues, handleSubmit, reset } = useForm();
  // input 타겟 설정
  const [target, setTarget] = useState(null);
  // 검색 모달창 토글
  const [toggle, setToggle] = useState(null);
  // 주소관련 데이터
  const [location, setLocation] = useState({ address: null, coord: { x: null, y: null } });

  const selectTarget = (name) => {
    setTarget(name);
    setToggle(!toggle);
  };

  const selectLocation = (data) => {
    setLocation(data);
    setValue(target, data.address);
    setTarget(null);
    setToggle(!toggle);
  };

  return { register, unregister, getValues, handleSubmit, reset, selectTarget, location, selectLocation, toggle };
};

export default useSearch;

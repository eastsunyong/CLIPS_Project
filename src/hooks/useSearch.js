import { useState } from "react";
import { useForm } from "react-hook-form";

const useSearch = () => {
  const {
    register,
    unregister,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const setTargetData = (data) => {
    setValue(target, data);
    setTarget(null);
    setToggle(!toggle);
  };

  const selectLocation = (data) => {
    setLocation(data);
    setTargetData(data.address);
  };

  return {
    register,
    unregister,
    getValues,
    setValue,
    handleSubmit,
    reset,
    selectTarget,
    setTargetData,
    location,
    selectLocation,
    toggle,
    errors,
  };
};

export default useSearch;

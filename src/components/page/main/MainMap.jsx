import React, { memo, useEffect, useRef, useState } from "react";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { Map } from "components/map";
import { kakaoMap } from "utils";
import { caffeImg, beerImg, centerImg, foodImg, healthImg, playImg } from "assets/img/marker";
import { setPlaceInfo, __setPlaceImg } from "store/modules/mainSlice";

const MainMap = ({ location }) => {
  const categoryList = useSelector((state) => state.main.categoryList);
  const selectedCg = useSelector((state) => state.main.selectedCg);
  const isCenter = useSelector((state) => state.main.isCenter);
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const places = kakaoMap.createPlaceSearch();

  // 마커 이미지 맵핑
  const markerImg = {
    음식점: foodImg,
    술집: beerImg,
    카페: caffeImg,
    운동장: playImg,
    헬스장: healthImg,
  };

  // 마커 사이즈
  const markerSize = { width: 36, height: 41 };

  // 클러스터 스타일
  const clusterSize = 40;
  const clusterStyle = {
    common: {
      background: "radial-gradient(50% 50% at 50% 50%, rgba(94, 237, 95, 0.6) 66.15%, rgba(128, 250, 160, 0) 100%)",
      color: "black",
      textAlign: "center",
      fontSize: "20px",
    },
    sm: {
      width: `${clusterSize}px`,
      height: `${clusterSize}px`,
      lineHeight: `${clusterSize}px`,
      borderRadius: `${clusterSize}px`,
    },
    md: {
      width: `${clusterSize * 2}px`,
      height: `${clusterSize * 2}px`,
      lineHeight: `${clusterSize * 2}px`,
      borderRadius: `${clusterSize * 2}px`,
    },
    lg: {
      width: `${clusterSize * 3}px`,
      height: `${clusterSize * 3}px`,
      lineHeight: `${clusterSize * 3}px`,
      borderRadius: `${clusterSize * 3}px`,
    },
  };

  // 객체 필요한 정보 추출
  const getPlaceInfo = (place, category) => {
    return {
      category,
      coord: {
        x: Number(place.x),
        y: Number(place.y),
      },
      name: place.place_name,
      phone: place.phone,
      detailCategory: place.category_name,
      address: place.address_name,
      road_address: place.road_address_name,
      placeUrl: place.place_url,
    };
  };

  // 마커 세팅
  useEffect(() => {
    if (location.address) {
      // 마커 초기화
      if (markers.length) {
        dispatch(setPlaceInfo(null));
        setMarkers([]);
      }

      // 카테고리 검색
      const placesOpt = { radius: 1500, x: location.coord.x, y: location.coord.y };
      categoryList.forEach((category) => {
        places.keywordSearch(
          category,
          (data, status) => {
            if (status === "OK") {
              const placeList = _.map(data, (place) => {
                return getPlaceInfo(place, category);
              });

              setMarkers((markers) => [...markers, ...placeList]);
            }
          },
          placesOpt
        );
      });
      mapRef.current.panTo(kakaoMap.xy2latlng(location.coord.x, location.coord.y));
    }
  }, [location]);

  // 마커에 따른 지도 레벨 재조정
  useEffect(() => {
    if (markers.length) {
      const bounds = kakaoMap.createBounds();
      _.forEach(markers, (marker) => {
        bounds.extend(kakaoMap.xy2latlng(marker.coord.x, marker.coord.y));
      });
      mapRef.current.setBounds(bounds);
    }
  }, [markers]);

  // 센터 이동
  useEffect(() => {
    if (location.address) {
      mapRef.current.panTo(kakaoMap.xy2latlng(location.coord.x, location.coord.y));
    }
  }, [isCenter]);

  return (
    <Map ref={mapRef} id="mainMap">
      {location.address && <MapMarker image={{ src: centerImg, size: markerSize }} position={{ lng: location.coord.x, lat: location.coord.y }} />}
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={5} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정
        calculator={[5, 10, 15]}
        // calculator 각 사이 값 마다 적용될 스타일
        styles={[
          {
            ...clusterStyle.common,
            ...clusterStyle.sm,
          },
          {
            ...clusterStyle.common,
            ...clusterStyle.md,
          },
          {
            ...clusterStyle.common,
            ...clusterStyle.lg,
          },
        ]}
      >
        {markers.map((marker, i) => {
          if (selectedCg.find((e) => e === marker.category)) {
            return (
              <MapMarker
                key={`${marker.coord.x}-${marker.coord.y}-${i}`}
                image={{ src: markerImg[marker.category], size: markerSize }}
                position={{ lng: marker.coord.x, lat: marker.coord.y }}
                clickable={true}
                onClick={() => {
                  dispatch(__setPlaceImg(marker));
                }}
              />
            );
          }
        })}
      </MarkerClusterer>
    </Map>
  );
};

export default memo(MainMap);

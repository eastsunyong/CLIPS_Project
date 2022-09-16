import React, { memo, useEffect, useRef, useState } from "react";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import { Map } from "components/map";
import { caffeImg, beerImg, centerImg, foodImg, healthImg, playImg } from "assets/img/marker";

const MainMap = (props) => {
  const { kakao } = window;
  const mapRef = useRef(null);
  const geocoder = new kakao.maps.services.Geocoder();
  const places = new kakao.maps.services.Places();

  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);

  const markerImg = {
    음식점: foodImg,
    술집: beerImg,
    카페: caffeImg,
    운동장: playImg,
    헬스장: healthImg,
  };

  useEffect(() => {
    props.setPlaceInfo(null);
    if (props.address) {
      if (markers.length !== 0) {
        markers.forEach((marker) => {
          const deleteMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(marker.coord.y, marker.coord.x),
          });
          deleteMarker.setMap(null);
        });
      }

      // 주소로 좌표를 검색
      geocoder.addressSearch(props.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setCenter({ lat: result[0].y, lng: result[0].x });

          // 센터기준 카테고리 검색
          const placesOpt = { radius: 1500, x: result[0].x, y: result[0].y };
          props.categoryList.forEach((category) => {
            places.keywordSearch(
              category,
              (data, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const bounds = new kakao.maps.LatLngBounds();

                  let placeList = [];
                  data.forEach((place) => {
                    placeList.push({
                      category,
                      coord: {
                        lat: place.y,
                        lng: place.x,
                      },
                      name: place.place_name,
                      phone: place.phone,
                      detailCategory: place.category_name,
                      address: place.address_name,
                      road_address: place.road_address_name,
                      placeUrl: place.place_url,
                    });
                    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
                  });

                  setMarkers((markers) => [...markers, ...placeList]);
                  mapRef.current.setBounds(bounds);
                }
              },
              placesOpt
            );
          });
        }
      });
    }
  }, [props.address]);

  // 센터 이동
  useEffect(() => {
    if (mapRef.current && props.address) {
      geocoder.addressSearch(props.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          mapRef.current.panTo(new kakao.maps.LatLng(result[0].y, result[0].x));
        }
      });
    }
  }, [props.isCenter]);

  //   마커 클릭 이벤트
  const markerClickHandler = (info) => {
    props.setPlaceInfo(info);
  };

  return (
    <Map ref={mapRef} id="mainMap">
      {center ? <MapMarker image={{ src: centerImg, size: { width: 32, height: 32 } }} position={center} /> : null}
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={4} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        calculator={[5, 10, 15]}
        styles={[
          {
            // calculator 각 사이 값 마다 적용될 스타일을 지정한다
            width: "40px",
            height: "40px",
            background: "rgba(251, 139, 37, 0.9)",
            borderRadius: "40px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            lineHeight: "40px",
          },
          {
            width: "80px",
            height: "80px",
            background: "rgba(251, 139, 37, 0.9)",
            borderRadius: "80px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            lineHeight: "80px",
          },
          {
            width: "120px",
            height: "120px",
            background: "rgba(251, 139, 37, 0.9)",
            borderRadius: "120px",
            color: "white",
            textAlign: "center",
            fontSize: "20px",
            lineHeight: "120px",
          },
        ]}
      >
        {markers.map((marker, i) => {
          if (props.selectedCategory.find((e) => e === marker.category)) {
            return (
              <MapMarker
                key={`${marker.coord.lat}-${marker.coord.lng}-${i}`}
                image={{ src: markerImg[marker.category], size: { width: 36, height: 41 } }}
                position={marker.coord}
                clickable={true}
                onClick={() => {
                  markerClickHandler(marker);
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

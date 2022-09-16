import React, { memo, useEffect, useRef, useState } from "react";

import { Map } from "components/map";
import { middleImg, middleMemberImg } from "assets/img/marker";

const MiddleMap = (props) => {
  const { kakao } = window;
  const mapRef = useRef(null);

  const [middle, setMiddle] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);

  // useEffect(() => {
  //   if (props.locationList) {
  //     setCenter(props.locationList.middleLocation.coord);
  //     setMarkers(props.locationList.list);

  //     const bounds = new kakao.maps.LatLngBounds();
  //     props.locationList.list.forEach((marker) => {
  //       bounds.extend(new kakao.maps.LatLng(marker.y, marker.x));
  //     });
  //     mapRef.current.setBounds(bounds);
  //   }
  // }, [props.locationList]);

  useEffect(() => {
    if (props.locationList) {
      if (middle) {
        middle.setMap(null);
        markers.forEach((m) => {
          m.setMap(null);
        });
        lines.forEach((l) => {
          l.setMap(null);
        });
      }
      let centerPosition = new kakao.maps.LatLng(props.locationList.middleLocation.coord.y, props.locationList.middleLocation.coord.x);
      let centerMarkerImg = new kakao.maps.MarkerImage(middleImg, new kakao.maps.Size(36, 36), { offset: new kakao.maps.Point(20, 20) });
      let center = new kakao.maps.Marker({
        position: centerPosition,
        image: centerMarkerImg,
      });
      center.setMap(mapRef.current);
      setMiddle(center);

      let bounds = new kakao.maps.LatLngBounds();
      props.locationList.list.forEach((coord) => {
        let position = new kakao.maps.LatLng(coord.y, coord.x);
        let markerImg = new kakao.maps.MarkerImage(middleMemberImg, new kakao.maps.Size(36, 36), { offset: new kakao.maps.Point(20, 20) });
        let marker = new kakao.maps.Marker({
          position,
          image: markerImg,
        });
        let polyline = new kakao.maps.Polyline({
          path: [position, centerPosition], // 선을 구성하는 좌표배열 입니다
          strokeWeight: 3, // 선의 두께 입니다
          strokeColor: "#0099FF", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다,
        });
        setMarkers((markers) => [...markers, marker]);
        setLines((lines) => [...lines, polyline]);
        bounds.extend(position);
        polyline.setMap(mapRef.current);
        marker.setMap(mapRef.current);
      });
      mapRef.current.setBounds(bounds);
    }
  }, [props.locationList]);

  // useEffect(() => {
  //   if (markers.length !== 0) {
  //     const bounds = new kakao.maps.LatLngBounds();
  //     markers.forEach((marker) => {
  //       bounds.extend(new kakao.maps.LatLng(marker.y, marker.x));
  //     });
  //     mapRef.current.setBounds(bounds);
  //   }
  // }, [markers]);

  // 정확한 폴리라인용 => 작업예정
  // useEffect(() => {
  //   if (center) {
  //     console.log(markers);
  //     markers.forEach((marker) => {
  //       axios.kakaoAxios
  //         .get(`https://apis-navi.kakaomobility.com/v1/directions?origin=${marker.lng},${marker.lat}&destination=${center.lng},${center.lat}`)
  //         .then((res) => {
  //           const guides = res.data.routes[0].sections[0].guides;
  //           let guidesXY = [];
  //           guides.forEach((lngLat) => {
  //             guidesXY.push({ lng: lngLat.y, lat: lngLat.x });
  //           });
  //           setPolyline((polyline) => [polyline, guidesXY]);
  //         });
  //     });
  //   }
  // }, [markers]);

  return <Map ref={mapRef} id="subMap"></Map>;
};

export default memo(MiddleMap);

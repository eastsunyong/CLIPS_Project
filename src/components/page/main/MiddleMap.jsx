import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { CustomOverlayMap, Polygon } from "react-kakao-maps-sdk";

import { Map } from "components/map";
import { Heart } from "assets/icons";
import { kakaoMap } from "utils";

const MiddleMap = ({ locationList }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (locationList.middle.address) {
      const bounds = kakaoMap.createBounds();
      locationList.list.forEach((location) => {
        bounds.extend(kakaoMap.xy2latlng(location.coord.x, location.coord.y));
      });
      mapRef.current.setBounds(bounds);
    }
  }, [locationList.middle.address]);

  return (
    <Map ref={mapRef} id="subMap">
      {locationList.middle.address && (
        // 중간 장소 오버레이
        <CustomOverlayMap position={{ lng: locationList.middle.coord.x, lat: locationList.middle.coord.y }}>
          <CenterOverlay>
            <Heart className="sm" />
          </CenterOverlay>
        </CustomOverlayMap>
      )}

      {locationList.middle.address &&
        locationList.list.map((location, i) => {
          // 출발지점들 오버레이, 폴리라인
          return (
            <React.Fragment key={`${location.coord.x}-${location.coord.y}-${i}`}>
              <CustomOverlayMap position={{ lng: location.coord.x, lat: location.coord.y }}>
                <PointOverlay>{i + 1}</PointOverlay>
              </CustomOverlayMap>
              <Polygon
                path={[
                  { lng: locationList.middle.coord.x, lat: locationList.middle.coord.y },
                  { lng: location.coord.x, lat: location.coord.y },
                ]}
                strokeWeight={3} // 선의 두께
                strokeColor={"#00D685"} // 선의 색깔
                strokeOpacity={0.8} // 선의 불투명도
                strokeStyle={"solid"} // 선의 스타일
                fillColor={"#00D685"} // 채우기 색깔
                fillOpacity={0.7} // 채우기 불투명도
              />
            </React.Fragment>
          );
        })}
    </Map>
  );
};

export default memo(MiddleMap);

const CenterOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.2rem;
  height: 3.2rem;

  border: 0.2rem solid ${(props) => props.theme.color.brand};
  border-radius: 50%;
  background: ${(props) => props.theme.color.brand};

  color: white;
`;

const PointOverlay = styled(CenterOverlay)`
  border: 0.2rem solid white;
  font-size: 1.2rem;
  font-weight: bold;
`;

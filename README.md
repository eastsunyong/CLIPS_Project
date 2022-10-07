# CLIPs (Chronically Late Insane Person)

* 서로간의 중간 거리를 구해서 위치를 나타내 주는 서비스
* 만나는 장소 주변에 유명장소 추천 서비스

## 👭 팀 멤버

<table>
   <tr>
      <td align="center"><b><a href="">박신영</a></b></td>
    <td align="center"><b><a href="https://github.com/codeing999">이재철</a></b></td>
     <td align="center"><b><a href="https://github.com/Rumaro122">신용의</a></b></td>
    <td align="center"><b><a href="https://github.com/Minsun91">김민선</a></b></td>
    <td align="center"><b><a href="https://github.com/somfist">박정우</a></b></td>
    <td align="center"><b><a href="https://github.com/eastsunyong">윤선용</a></b></td>
  </tr>
  <tr>
     <td align="center"><a href=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qM0573umw5n32xmTgtsU4BAMGwDHuk99EA&usqp=CAU" width="100px" /></a></td>
     <td align="center"><a href="https://github.com/codeing999"><img src="https://avatars.githubusercontent.com/u/109027875?v=4" width="100px" /></a></td>
     <td align="center"><a href="https://github.com/Rumaro122"><img src="https://avatars.githubusercontent.com/u/107511994?v=4" width="100px" /></a></td>
     <td align="center"><a href="https://github.com/Minsun91"><img src="https://avatars.githubusercontent.com/u/92393851?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/somfist"><img src="https://avatars.githubusercontent.com/u/89966037?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/eastsunyong"><img src="https://avatars.githubusercontent.com/u/108984141?v=4" width="100px" /></a></td
  </tr>
  <tr>
     <td align="center"><b>Designer</b></td>
    <td align="center"><b>(L)Backend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>(VL)Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
  </tr>
</table>

## 📆 프로젝트 기간 
* 2022/08/26 ~ 2022/10/07

## 프로젝트 설명
* 개발언어: JavaScript

* 개발 라이브러리: React.js
* 배포 환경: Amazon S3, CloundFront
   
* 협업 툴: git / notion / figma /

* 프로젝트 취지: 친구들끼리 약속을 정할 때 장소를 선택하기 어려운 경우가 많아 약속 장소를 추천해주고, 약속을 관리하고, 추억할 수 있는 서비스를 만들고자 함


## 🚩 Links
* [💖 Project homepage](https://clipspromise.com)
* [👀 프론트엔드 깃허브 주소](https://github.com/codeing999/CLIPs-backend)
* [👀 백엔드 깃허브 주소](https://github.com/eastsunyong/CLIPS_Project)

## 🖼 Service Architecture
   <img src="https://user-images.githubusercontent.com/89966037/194450508-94423765-35c3-403e-b015-dc296223c88d.png" width="100%" />

## 📜 사용한 라이브러리 (패키지)
|이름|사용 이유|
| :-: |:- |
|axios |서버와의 통신 간에 동일한 내용으로 통신하기 위해(토큰 있을때 intercepter 등)|
|styled-components|themeProvider를 사용하여 색상 관리 및 차후 유지 보수를 간편화|
|react-hook-form|form 데이터를 관리를 위해|
|lodash|사용자 서칭 최적화를 위해 디바운싱 기법 적용 및 컬렉션 관리를 위해|
|react-kakao-maps-sdk| kakaoDev에는 바닐라JS로 되어있어 React용으로 변환하면작업 속도가 너무 늦어져서 사용 (김재서 개발자님이 만들어주신 라이브러리)|
|dayjs|Date 객체 관리를 위해|
|react-calendar| 달력 사용 시 커스텀 용이|
|react-datepicker|기본 형태가 Input이라 날짜를 입력받을때 용이|
|browser-image-compression|이미지 압축|
|react-device-detect|반응형 웹 구현을 위해|


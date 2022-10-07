
<h1 align="center" > CLIPs (Chronically Late Insane Person) </h1>

<p align="center"><img width="300"  alt="로고" src="https://user-images.githubusercontent.com/89966037/194491956-c3573628-704f-436c-8435-965d45806f32.png"></p>

### <div align="center">[🔗 CLIPs 사이트 보러 가기](https://clipspromise.com)</div>
### <div align="center">[🎥 시연영상 보러가기](https://www.youtube.com/watch?v=t-h1CQnguYs)</div>

<br>

## CLIPs 프로젝트 소개
친구들끼리 약속을 정할 때 장소를 선택하기 어려운 경우가 있고 약속의 개수가 많아 관리가 어려울 때가 있습니다.
저희는 이런 어려움을 겪는 모든 이들을 위해 **약속 장소를 추천**해주고, **약속을 관리**하고 **추억**할 수 있는 서비스입니다.

<br>

## 📆 개발기간
### 2022.08.26 ~ 2022.10.03 (6주)

<br>

## 팀원 소개
프로젝트를 함께 진행한 팀원들입니다

<table>
   <tr>
    <td align="center">박신영</td>
    <td align="center"><a href="https://github.com/codeing999">이재철</a></td>
    <td align="center"><a href="https://github.com/Rumaro122">신용의</a></td>
    <td align="center"><a href="https://github.com/Minsun91">김민선</a></td>
    <td align="center"><a href="https://github.com/somfist">박정우</a></td>
    <td align="center"><a href="https://github.com/eastsunyong">윤선용</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qM0573umw5n32xmTgtsU4BAMGwDHuk99EA&usqp=CAU" width="100px" /></td>
    <td align="center"><a href="https://github.com/codeing999"><img src="https://avatars.githubusercontent.com/u/109027875?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Rumaro122"><img src="https://avatars.githubusercontent.com/u/107511994?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Minsun91"><img src="https://avatars.githubusercontent.com/u/92393851?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/somfist"><img src="https://avatars.githubusercontent.com/u/89966037?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/eastsunyong"><img src="https://avatars.githubusercontent.com/u/108984141?v=4" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center">Designer</td>
    <td align="center">(L)Back-end</td>
    <td align="center">Back-end</td>
    <td align="center">Back-end</td>
    <td align="center">(VL)Front-end</td>
    <td align="center">Front-end</td>
  </tr>
</table>

<br>

## 💡 핵심기능
+ **약속 장소 추천**
    + 검색된 주소를 바탕으로 주변 1.5km 이내 장소 추천 (카테고리 선택 가능)
    + 최대 10개의 다중 출발지의 중간 장소 확인
+ **약속 일정 관리**
    + 달력을 바탕으로 날짜별 약속 목록 확인
    + 약속 생성시 서비스의 회원을 추가하면 해당 회원과 약속 정보 공유
+ **약속 후기 관리**
    + 본인이 만든 약속별 이미지 후기 작성
    + 약속의 참여자들과 후기 정보 공유
+ **프로그래시브 웹 앱 (PWA)**
    + 홈화면에 설치되어 서비스 접근 용이하며 웹으로서 네이티브 앱과 같은 경험 제공

<br>

## 🔨 기술 스택

<code> Front-end </code>
* React ,Redux, Styled-components, PWA, AWS S3, CloudFront

<code> Back-end </code>
* [👀 백엔드 깃허브](https://github.com/eastsunyong/CLIPS_Project)

<code>Tool</code>
* GitHub, Notion, Figma

<br>

## 🖼 Service Architecture
   <img src="https://user-images.githubusercontent.com/89966037/194450508-94423765-35c3-403e-b015-dc296223c88d.png" width="100%" />

<br>

## 📜 사용한 라이브러리 (패키지)
|이름|사용 이유|
| :-: |:- |
|axios |서버와의 통신 간에 동일한 내용으로 통신하기 위해(토큰 있을때 intercepter 등)|
|react-hook-form|유효성 검사 등 코드의 가독성을 줄이고 form 데이터 관리를 위해 사용|
|lodash|사용자 서칭 최적화를 위해 디바운싱 기법 적용 및 컬렉션 관리를 위해|
|react-kakao-maps-sdk|(김재서 개발자님 제작) Kakao Map API를 React element 형식으로 변환해두어 작업 속도 향상|
|dayjs|Date 객체 관리 편이를 위해 (Date 객체 문자열 포맷 등)|
|react-calendar|달력을 구현할때 커스텀 용이하며 클릭 이벤트 발생시 해당 날짜값을 도출 가능해서|
|browser-image-compression|후기 이미지 다중 업로드 시 이미지 크기가 크면 랜더링 속도가 느려서 일정하고 부담이 덜한 크기로 이미지를 압축하기 위해|
|react-device-detect|모바일과 PC별 반응형 웹 구현간 디바이스 상태를 확인하기 위해|


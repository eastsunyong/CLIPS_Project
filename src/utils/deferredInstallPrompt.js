// 버튼 클릭시 다운로드 제어
export let deferredInstallPrompt = null;

// beforeinstallprompt라는 이벤트가 발생하여 설치 조건을 모두 충족됨을 브라우저에게 알림
window.addEventListener("beforeinstallprompt", (e) => {
  deferredInstallPrompt = e;
});

export const userClickedAddToHome = () => {
  deferredInstallPrompt.prompt();

  deferredInstallPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      //   console.log("승인");
    } else {
      //   console.log("거부");
    }
    deferredInstallPrompt = null;
  });
};

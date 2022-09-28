import React from "react";
import styled from "styled-components";

import { OpacityModal } from "components/common";

const Privacy = (props) => {
    return (
        <RenewalModal toggle={props.toggle}>
        <Box>
            <Header>
                <h2>개인정보 수집•이용동의 (필수)</h2>
            </Header>
            <Body>
                <textarea readOnly value="
                클립스는 이용자의 개인정보를 소중하게 생각하며, [정보통신망 이용촉진 및 정보보호에 관한 법률], [개인정보보호법]을 준수하기 위해 노력하고 있습니다.
                ㆍ클립스는 개인정보처리방침을 통하여 회사가 지원자로부터 제공받은 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, 개인정보보호를 위해 어떠한 조치가 취하고 있는지 알려드립니다.
                
                ㆍ클립스는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지하겠습니다.
                ㆍ본 방침은 2022년 09월 26일부터 시행됩니다.
                
                1. 수집하는 개인정보 항목
                ① 회원정보
                - 수집항목(필수) : 이메일, 비밀번호, 휴대폰번호
                ② 인터넷 이용에 관한 사항
                - 수집항목(필수) : 쿠키, 서비스이용기록(방문일시, IP)
                
                2. 개인정보 수집 및 이용목적
                ① 웹사이트 이용관련 연락, 민원처리, 분쟁해결, 법령상 의무이행
                
                3. 개인정보의 제3자 제공
                ① 클립스는 이용자의 개인정보를 서비스 이외의 목적으로 외부에 개인정보를 제공하지 않습니다.
                
                4. 개인정보의 처리 및 보유 기간
                ① 이용자께서 삭제를 요청하실 경우 해당정보를 지체 없이 삭제합니다.
                
                5. 개인정보의 파기절차 및 방법
                ① 파기절차
                - 클립스는 개인정보의 수집/처리 목적이 달성되거나 그 보유/이용기간이 종료되는 경우, 정보주체의 별도 동의, 관련 법령에 따라 보관이 필요한 경우를 제외하고 해당 정보를 지체 없이 파기합니다.
                ② 파기방법
                - 전자적 파일 형태로 저장된 개인정보는 기록을 복구 및 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
                
                6. 개인정보 처리위탁
                클립스는 개인정보 처리를 위탁하지 않습니다.
                
                7. 지원자의 권리와 그 행사방법
                ① 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 정보삭제 및 처리정지를 요청할 수 있습니다. 정보삭제 또는 처리정지를 원하시는 경우 codeing999@gmail.com으로 연락하시면 확인 후 지체 없이 조치하겠습니다. 
                
                8. 쿠키에 의한 개인정보 수집
                ① 클립스는 지원자의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)'를 운용합니다. 쿠키는 웹사이트가 지원자의 컴퓨터 브라우저로 전송하는 소량의 정보로 회사의 컴퓨터는 지원자의 브라우저에 있는 쿠키의 내용을 읽고, 이용자의 추가정보를 지원자의 컴퓨터에서 찾습니다.
                ② 쿠키는 지원자의 컴퓨터를 식별하며 지원자를 개인적으로 식별하지 않습니다.
                ③ 지원자는 쿠키에 대한 선택권이 있으며 웹 브라우저의 옵션을 조정하여 쿠키가 저장될 때마다 확인을 거치거나 모든 쿠키의 저장을 거부할 수 있습니다.
                 
                9. 개인정보의 보호조치에 관한 사항
                클립스는 이용자의 개인정보가 분실, 도난, 유출, 위∙변조 또는 훼손되지 않도록 안전성 확보를 위하여 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「개인정보보호법」 등 정보통신서비스 제공자가 준수하여야 할 관련 법령에 따라 기술적∙관리적 보호조치를 적정하게 취하고 있습니다.
                가. 기술적 대책
                - 이용자의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.
                - 클립스는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.
                - 클립스는 네트워크 상의 개인정보를 안전하게 전송할 수 있는 전송구간 암호화(SSL)를 통해 전송하고 있습니다.
                나. 관리적 대책
                - 클립스는 개인정보 취급자를 최소한의 인원으로 제한하며, 개인정보를 처리하는 직원을 대상으로 새로운 보안 기술습득 및 개인정보 보호 의무 등에 관해 정기적인 교육을 실시하고 있습니다.
                - 개인정보취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 개인정보 사고에 대한 책임을 명확히 하고 있습니다.
                - 그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 분실, 도난, 유출, 위ㆍ변조 또는 훼손될 경우 회사는 즉각 이용자에게 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.
                
                10.개인정보에 관한 민원서비스
                ① 클립스는 이용자 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 이메일(codeing999@gmail.com)로 관련사항을 접수받고 있습니다.
                
                11. 개인정보 보호책임자
                ① 회사는 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                
                - 개인정보 보호 책임자
                 성명 : 이재철 (codeing999@gmail.com)
                "/>
            </Body>
            <End>
                <p onClick={()=> {props.setToggle(false)}}>확인</p>
            </End>
        </Box>
        </RenewalModal>
    )
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 34.4rem;
    height: 49.6rem;
    background: #FFFFFF;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
    border-radius: 0.4rem;
    padding: 0 1.6rem;
`
const Header =styled.div`
    width: 100%;
    height: 2.5rem;
    margin: 0.8rem 0;
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 600;
    line-height: 160%;
    font-size: ${(props) => props.theme.size.xs};
`

const Body = styled.div`
    width: 100%;
    height: 40rem;
    background: blue;

    textarea {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-weight: 400;
        font-size: ${(props) => props.theme.size.xs};
        line-height: 1.5rem;
    }
`
const End = styled.div`
    width: 100%;
    height: 6rem;
    display: flex;
    justify-content: right;
    align-items: center;
    
    p{
        color: ${(props) => props.theme.color.brand};
        font-weight: 600;
        font-size: ${(props) => props.theme.size.s};
        line-height: 160%;
        padding-right: 1.1rem;
        cursor: pointer;
    }
`

const RenewalModal = styled(OpacityModal)`
  background: rgba(17, 24, 39, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`


export default Privacy
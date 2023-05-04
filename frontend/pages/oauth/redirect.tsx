import { useEffect } from "react"
// axios
import axios from "axios";


// next Hooks
import { useRouter } from "next/router";

//로그인 완료 페이지니까 리덕스에 state 저장해주고 이동할 수 있도록
export default function AuthRedirect() {
    // router 객체 생성
    const router = useRouter();

    function saveAccessToken(_access_token : string) {
        const accessTokenObj = { access_token : _access_token};
        window.localStorage.setItem("access_token", JSON.stringify(accessTokenObj));
    }
    // 인가 코드로 서버에서 사용자 데이터 받아오기
    async function getUserInfo(paramAuthCode : string | null){
        if (paramAuthCode !== null){
            const userResult = await axios.post(`${process.env.NEXT_PUBLIC_SOME_AUTH_URL}/user/kakao`,{},
                {
                    headers : {
                        "redirect_base" : process.env.NEXT_PUBLIC_FRONT_BASE,
                        "authorization_code" : paramAuthCode,
                    },
                });
            const responseAccessToken = userResult.data.data;

            console.log(responseAccessToken);

            if (responseAccessToken !== null){
                saveAccessToken(responseAccessToken);
                router.push("/boy-home");
            }
        }
    }
    
    // 렌더링 되면 authorization code URL에서 파싱
    useEffect(() => {
      // authorization code URL에서 파싱해오기
      const params = new URL(document.location.toString()).searchParams;
      const paramsAuthCode = params.get("code");
      
      // 인가 코드로 유저 데이터 받아오기
      getUserInfo(paramsAuthCode);
      return () => {}
    }, [])

    return(
        <div className="flex items-center justify-center h-screen">
            <p>로그인 중입니다...</p>
        </div>
    )
};

import { useState, useEffect } from 'react';

/**
 * useRentalMapResponsive
 * 브라우저 뷰포트(Viewport) 너비가 변경될 때마다 현재 너비 값을 반환하는 커스텀 훅.
 * 특정 너비 기준(예: 810px)으로 모바일/PC 반응형 UI 전환 로직에 사용됨.
 */
const useRentalMapResponsive = () => {
    // 1. 상태 초기화 및 SSR 환경 처리
    const [responsiveMap, setResponsiveMap] = useState(
        // 서버 렌더링(SSR) 환경에서는 window 객체가 없으므로 런타임 오류 방지를 위해 0으로 초기화
        typeof window !== 'undefined' ? window.innerWidth : 0 
    );

    // 2. 브라우저 'resize' 이벤트 리스너 설정
    useEffect(() => {
        // 서버 측에서 실행되는 경우 (window 객체 부재 시) 즉시 종료
        if (typeof window === 'undefined'){
            return; 
        }
        
        // 창 크기가 변경될 때마다 새로운 너비 값을 상태에 업데이트하는 핸들러 함수
        const handleResize = () => {
            setResponsiveMap(window.innerWidth);
        };

        // 'resize' 이벤트 리스너 등록: 창 크기 변경 시 handleResize 함수 실행
        window.addEventListener('resize', handleResize);

        // 클린업 함수: 컴포넌트 언마운트 시 'resize' 이벤트 리스너 제거
        // 메모리 누수 방지 및 불필요한 이벤트 호출 중단
        return () => window.removeEventListener('resize', handleResize);
    }, []) // 의존성 배열이 비어있으므로, 컴포넌트 마운트 시점에 단 한 번만 실행됨

    // 3. 현재 뷰포트 너비 값을 반환
    return responsiveMap; 
};

export default useRentalMapResponsive;
"use client"

import Swal from "sweetalert2";
import {useAuthStore} from "@/store/authStore";
import {useRouter} from "next/navigation";
import {useLayoutEffect} from "react";

const ProtectedRoute = ({children}) => {
    const {isLogin} = useAuthStore();
    const router = useRouter();

    useLayoutEffect(() => {
        if(!isLogin){
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            return router.replace("/login");
        }
        return children;
    }, [children, isLogin, router]);
    
}

export default ProtectedRoute;
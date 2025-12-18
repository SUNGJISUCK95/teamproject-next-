import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin);
    if(!isLogin){
        Swal.fire({
            icon: "warning",
            title: "로그인 필요",
            text: "로그인이 필요합니다.",
        });
        return <Navigate to="/login" replace/>;
    }
    return children;
}

export default ProtectedRoute;
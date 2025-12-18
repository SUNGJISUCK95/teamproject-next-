import ProtectedRoute from "@/utils/ProtectedRoute";

export default function CartLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
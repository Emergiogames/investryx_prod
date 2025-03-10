import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Protect({ children }) {
    const navigate = useNavigate();
    const selectUser = (state) => state.auth.user;
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            toast.info("Please login to continue");
        }
    }, [user, navigate]);

    if (user) {
        return children;
    } else {
        navigate("/login");
    }
}

export default Protect;

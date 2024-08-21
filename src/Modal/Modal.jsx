import OtpModel from "./OtpModel/OtpModel";
import SellModal from "./SellModal/SellModal";
import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

const Modal = () => {
    return (
        <>
            <SignInModal />
            <SignUpModal />
            <OtpModel />
            <SellModal />
        </>
    );
};

export default Modal;
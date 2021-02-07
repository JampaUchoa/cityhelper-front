import { logOut } from 'utils/user';

export default function UserLogout() {
    logOut();
    window.location.pathname = "/"
    return (
        null
    )
}
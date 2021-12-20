import { Container } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Pricing from "../components/Pricing";
import RemoveShop from "../components/RemoveShop";
import SearchBar from "../components/SearchBar";
import ShopBar from "../components/ShopBar";
import UpdateUser from "../components/UpdateUser";
import UserCard from "../components/UserCard";

const Setting = () => {
    let usertype = useSelector(state => state.loggedInUser.usertype);
    const [render, setRender] = useState(false);

    return (
        <Container style={{ padding: "1em" }}>
            <Container>
                <UserCard />
            </Container>
            {
                (usertype === 2) &&
                <Container>
                    <Pricing />
                </Container>
            }
            {
                (usertype === 1) &&
                <Container>
                    <RemoveShop />
                </Container>
            }
            <Container>
                <UpdateUser />
            </Container>
            {
                (usertype === 0) &&
                <Container >
                    <h4>
                        Users:
                    </h4>
                    {<SearchBar setRender={setRender} render={render} />}
                </Container>
            }
            {
                (usertype === 0) &&
                <Container >
                    <h4>
                        Shops:
                    </h4>
                    {<ShopBar setRender={setRender} render={render} />}
                </Container>
            }
        </Container>
    );
}

export default Setting;
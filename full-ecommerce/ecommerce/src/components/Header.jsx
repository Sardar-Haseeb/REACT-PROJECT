import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const isLogin = true;
    return (
        <header className="text-gray-600 shadow body-font">
            <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                <Link to={"/"}>
                    <Image
                        height={50}
                        width={50}
                        className="rounded-full"
                        preview={false}
                        src="src\assets\logo.jpg"
                    />
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link to={"./"} className="mr-5 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to={"/products"} className="mr-5 hover:text-gray-900">
                        Products
                    </Link>
                    
                    <Link to={"/orders"} className="mr-5 hover:text-gray-900">
                        Orders
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    {isLogin ? (
                        <Avatar size={50} icon={<UserOutlined />} />
                    ) : (
                        <Button onClick={() => navigate("/auth")}>Login</Button>
                    )}
                    <Link to={"/cart"}>
                        <Badge count={5}>
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: 30,
                                    color: "blue",
                                }}
                            />
                        </Badge>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
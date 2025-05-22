import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {createAccount,LoginDB,getcurrentuser,LogoutDB} from "../database/auth_service.js"
import  {createpost,getFilePreview,deleteFile,uploadfile,getposts,getpost,deletepost,updatePost} from "../database/storage_service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {//instead of using argument using params in 10th line.
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    console.log("Slug: ",slug)
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.owner === userData._id : false;

    useEffect(() => {
        if (slug) {
            getpost(slug).then((postes) => {
                if (postes) {
                    setPost(postes.data);
                    console.log(post)
                }
                else navigate("/");
            })
        }
         else navigate("/");
    }, [slug, navigate])

    const deletePost = () => {
        deletepost(post._id).then((status) => {
            if (status) {
                deleteFile(post.imageFile);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.imageFile}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.description)}
                    </div>
            </Container>
        </div>
    ) : null;
}
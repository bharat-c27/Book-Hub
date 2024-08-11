import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = ({ destination = "/" }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8000/books/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book deleted successfully", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error, check console", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                console.error(error);
                navigate("/");
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-center text-4xl font-medium my-5">
                Delete Book
            </h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <h3>Are you sure you want to delete this book ?</h3>
                    <div className="flex justify-center ">
                        <button
                            onClick={handleDeleteBook}
                            className="border-2 border-red-600 min-h-10 text-black m-4 w-[180px]"
                        >
                            Yes, Delete It
                        </button>
                        <Link to={destination}>
                            <button className="bg-red-600 min-h-10 text-white m-4 w-[180px]">
                                No
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;

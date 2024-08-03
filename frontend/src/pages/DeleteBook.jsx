import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:8000/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                alert("Something happend and could not delete the book");
                console.error(error);
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
                    <button
                        onClick={handleDeleteBook}
                        className="bg-red-600 min-h-10 text-white m-8 w-5/6"
                    >
                        Yes, Delete It
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;

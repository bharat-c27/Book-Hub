import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(true);
                alert("An error occured. Please check console");
                console.log(error);
            });
    }, []);

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };

        setLoading(true);
        axios
            .put(`http://localhost:8000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book edited successfully", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                navigate("/");
            })
            .catch((error) => {
                setLoading(true);
                enqueueSnackbar("Error, check console", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                    },
                });
                console.log(error);
                navigate("/");
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-center text-4xl font-medium my-5">Edit Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            Author
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">
                            Publish Year
                        </label>
                        <input
                            type="text"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        className="p-2 bg-sky-300 m-8"
                        onClick={handleEditBook}
                    >
                        Edit & Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBook;

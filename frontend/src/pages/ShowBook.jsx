import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8000/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(true);
            });
    }, []);

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-center text-4xl font-medium my-5">Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col mx-auto border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Id
                        </span>
                        <span className="before:content-[':_']">
                            {book._id}
                        </span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Title
                        </span>
                        <span className="before:content-[':_']">
                            {book.title}
                        </span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Author
                        </span>
                        <span className="before:content-[':_']">
                            {book.author}
                        </span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Publish Year
                        </span>
                        <span className="before:content-[':_']">
                            {book.publishYear}
                        </span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Create Time
                        </span>
                        <span className="before:content-[':_']">
                            {new Date(book.createdAt).toString()}
                        </span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500 border-b-4 border-gray-400">
                            Last Update Time
                        </span>
                        <span className="before:content-[':_']">
                            {new Date(book.updatedAt).toString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;

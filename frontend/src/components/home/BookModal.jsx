import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";

const BookModal = ({ book, onClose }) => (
    <div
        className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-60 z-50 flex justify-center items-center  "
        onClick={onClose}
    >
        <div
            // onClick={(event) => event.stopPropagation()}
            className="w-[600px] h-[400px] bg-white rounded-xl p-4 flex flex-col relative m-3"
        >
            <AiOutlineClose
                className="absolute top-6 right-6 text-3xl text-red-500 cursor-pointer"
                onClick={onClose}
            />
            <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
                {book.publishYear}
            </h2>
            <h4 className="my-2 text-gray-500">{book._id}</h4>
            <div className="flex justify-start items-center gap-x-2">
                <PiBookOpenTextLight className="text-red-300 text-2xl my-1" />
                <h2 className="">{book.title}</h2>
            </div>
            <div className="flex justify-start items-center gap-x-2">
                <BiUserCircle className="text-red-300 text-2xl my-1" />
                <h2>{book.author}</h2>
            </div>
            <p className="mt-4">Anything you want to show</p>
            <p className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem sed dignissimos saepe minus. Saepe quisquam
                neque, rem, ipsa temporibus perspiciatis ipsam accusamus
                deserunt vero rerum expedita architecto numquam, repellendus
                tenetur.
            </p>
        </div>
    </div>
);

export default BookModal;

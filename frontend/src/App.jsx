import React from "react";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
            {/* <div className="bg-red-400 text-white">App</div> */}
        </Routes>
    );
};

export default App;

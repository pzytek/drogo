import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import scrollToTop from "../utils/scrollToTop";

interface SearchBoxProps {
  closeMenuOffcanvas: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ closeMenuOffcanvas }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordUrl = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState<string>(keywordUrl);

  useEffect(() => {
    setKeyword(keywordUrl);
  }, [keywordUrl]);

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
    searchParams.set("keyword", keyword.trim());
    searchParams.delete("pageNumber");
    setSearchParams(searchParams);
    closeMenuOffcanvas();
    scrollToTop();
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Form onSubmit={searchHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={handleKeywordChange}
        value={keyword}
        placeholder="What are you looking for?"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" className="p-2 ms-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

import { useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import scrollToTop from "../utils/scrollToTop";

const Paginate = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("pageNumber") || 1);

  const changePage = (pageNumber) => {
    searchParams.set("pageNumber", pageNumber);
    setSearchParams(searchParams);
    scrollToTop();
  };

  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            onClick={() => {
              changePage(x + 1);
            }}
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};
export default Paginate;

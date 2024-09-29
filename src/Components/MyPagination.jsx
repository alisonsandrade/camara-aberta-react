import { Container, Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MyPagination = ({ currentPage, lastPage, url }) => {
  return (
    <Container
      component="div"
      sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}
    >
      <Pagination
        page={currentPage}
        count={lastPage}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${url}${item.page === 1 ? "" : `?pagina=${item.page}`}`}
            {...item}
          />
        )}
      ></Pagination>
    </Container>
  );
};

export default MyPagination;

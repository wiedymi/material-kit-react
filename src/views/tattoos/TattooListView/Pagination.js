import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import PropTypes from 'prop-types';

export default function PaginationLink(props) {
  const { page } = props;
  return (
    <Pagination
      page={page}
      count={3}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

PaginationLink.propTypes = {
  page: PropTypes.number
};

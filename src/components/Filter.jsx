import { useEffect, useState } from 'react';
import { sortOpt, statusOpt, typeOpt } from '../constants';
import { useDispatch } from 'react-redux';
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from '../redux/slices/jobSlice';

const Filter = ({ jobs }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  // Filtering on every keypress can slow down the app
  // and result in unnecessary API requests. Instead of filtering
  // on every keypress, we should do it after the user has finished typing.
  // This is called DEBOUNCE.
  useEffect(() => {
    // Start a timer and execute the operation when the timer ends
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: 'position', text }));
    }, 500);

    // If useEffect runs again before the timer ends, reset the previous timer
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div>
          <label>Search by company name:</label>
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: 'status',
                  text: e.target.value,
                })
              )
            }
            name="status"
          >
            <option value={''} hidden>
              Select
            </option>
            {statusOpt.map((i) => (
              <option value={i} key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({
                  field: 'type',
                  text: e.target.value,
                })
              )
            }
            name="type"
          >
            <option value={''} hidden>
              Select
            </option>
            {typeOpt.map((i) => (
              <option value={i} key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="sort"
          >
            <option value={''} hidden>
              Select
            </option>
            {sortOpt.map((i) => (
              <option value={i} key={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="button-borders">
            <button
              onClick={() => dispatch(clearFilters())}
              type="reset"
              className="primary-button"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Filter;

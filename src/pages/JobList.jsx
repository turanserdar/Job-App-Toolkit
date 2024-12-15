import { useDispatch, useSelector } from 'react-redux';
import {
  setError,
  setJobs,
  setLoading,
} from '../redux/slices/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Filter from '../components/Filter';

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  // Fetch data from the API and store it
  const fetchData = () => {
    // 1) Update loading status
    dispatch(setLoading());

    axios
      .get('http://localhost:4000/jobs')
      // 2) If data comes, store it
      .then((res) => dispatch(setJobs(res.data)))
      // 3) If there's an error, update the store
      .catch((err) => dispatch(setError(err.message)));
  };

  // Call the function when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />

      {/* 
      1) If loading is still in progress, display the loader
      2) If loading is complete and there's an error, display the error message and retry button
      3) If loading is complete and there's no error, display the cards
      */}

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>
            Sorry, there was an issue accessing the data
            <span>{state.isError}</span>
          </p>
          <button onClick={fetchData}>Try Again</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;

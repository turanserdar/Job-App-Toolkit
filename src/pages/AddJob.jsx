import { v4 } from 'uuid';
import { statusOpt, typeOpt } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from '../redux/slices/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching job listings
  useEffect(() => {
    // 1) Update loading status
    dispatch(setLoading());

    axios
      .get('http://localhost:4000/jobs')
      // 2) If data comes, store it
      .then((res) => dispatch(setJobs(res.data)))
      // 3) If there's an error, update the store
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access form data
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());

    

    // Add date and ID
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();

    // Add data to the API
    axios
      .post('http://localhost:4000/jobs', newJob)
      // If successful, add to the store
      .then(() => {
        toast.success('New job added');
        dispatch(createJob(newJob));
        navigate('/');
      })
      // If unsuccessful, show a warning
      .catch(() => {
        toast.warn('There was an issue adding the job');
      });
  };

  // Removes duplicate elements in the array
  const removeDuplicates = (key) => {
    const arr = state.jobs.map((i) => i[key]);

    const filtered = arr.filter(
      (value, index) => arr.indexOf(value) === index
    );

    return filtered;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input
              list="positions"
              name="position"
              type="text"
              required
              onInvalid={(e) => e.target.setCustomValidity("Position is required")}
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <datalist id="positions">
              {removeDuplicates('position').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Company</label>
            <input
              list="companies"
              name="company"
              type="text"
              required
              onInvalid={(e) => e.target.setCustomValidity("Company is required")}
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <datalist id="companies">
              {removeDuplicates('company').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Location</label>
            <input
              list="locations"
              name="location"
              type="text"
              required
              onInvalid={(e) => e.target.setCustomValidity("Location is required")}
              onInput={(e) => e.target.setCustomValidity("")}
            />

            <datalist id="locations">
              {removeDuplicates('location').map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Status</label>
            <select name="status" required>
              <option value={''} hidden>
                Select
              </option>
              {statusOpt.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select name="type" required>
              <option value={''} hidden>
                Select
              </option>
              {typeOpt.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="button-borders">
              <button className="primary-button">Add Job</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;

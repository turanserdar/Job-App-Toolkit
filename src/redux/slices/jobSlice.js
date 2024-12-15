import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainJobs: [], // we will never modify this array
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },

    deleteJob: (state, action) => {
      // find the index of the item to be deleted
      const i = state.jobs.findIndex((i) => i.id === action.payload);
      // remove the item from the array
      state.jobs.splice(i, 1);
    },

    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    // filter by company name
    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();

      const filtered = state.mainJobs.filter((i) =>
        i[action.payload.field].toLowerCase().includes(query)
      );

      state.jobs = filtered;
    },

    // sorting
    sortJobs: (state, action) => {
      switch (action.payload) {
        case 'a-z':
          state.jobs.sort((a, b) =>
            a.company.localeCompare(b.company)
          );
          break;

        case 'z-a':
          state.jobs.sort((a, b) =>
            b.company.localeCompare(a.company)
          );
          break;

        case 'Newest':
          state.jobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case 'Oldest':
          state.jobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;

        default:
          break;
      }
    },

    // reset filters
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  sortJobs,
  filterBySearch,
  createJob,
  setLoading,
  setError,
  setJobs,
  deleteJob,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;

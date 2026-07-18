import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fileService from './fileService';

const initialState = {
  folders: [],
  files: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const fetchFolders = createAsyncThunk(
  'files/fetchFolders',
  async ({ section, parentId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.getFolders(section, parentId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewFolder = createAsyncThunk(
  'files/createFolder',
  async (folderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.createFolder(folderData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFolder = createAsyncThunk(
  'files/deleteFolder',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.deleteFolder(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async ({ section, folderId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.getFiles(section, folderId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadNewFile = createAsyncThunk(
  'files/uploadFile',
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.uploadFile(formData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadNewLink = createAsyncThunk(
  'files/uploadLink',
  async (linkData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.uploadLink(linkData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFile = createAsyncThunk(
  'files/deleteFile',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.deleteFile(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    resetFilesState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.folders = action.payload;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.folders.unshift(action.payload);
      })
      .addCase(removeFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter((folder) => folder._id !== action.payload.id);
      })
      .addCase(fetchFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadNewFile.fulfilled, (state, action) => {
        state.files.unshift(action.payload);
      })
      .addCase(uploadNewLink.fulfilled, (state, action) => {
        state.files.unshift(action.payload);
      })
      .addCase(removeFile.fulfilled, (state, action) => {
        state.files = state.files.filter((file) => file._id !== action.payload.id);
      });
  },
});

export const { resetFilesState } = fileSlice.actions;
export default fileSlice.reducer;

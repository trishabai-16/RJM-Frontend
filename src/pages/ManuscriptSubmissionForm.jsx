import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { manuscriptService, journalService } from '../services/apiService';

const validationSchema = yup.object({
  title: yup
    .string('Enter manuscript title')
    .min(10, 'Title should be at least 10 characters long')
    .max(500, 'Title should not exceed 500 characters')
    .required('Title is required'),
  abstractText: yup
    .string('Enter abstract')
    .min(100, 'Abstract should be at least 100 characters long')
    .max(5000, 'Abstract should not exceed 5000 characters')
    .required('Abstract is required'),
  keywords: yup
    .string('Enter keywords')
    .min(5, 'Keywords should be at least 5 characters long')
    .max(500, 'Keywords should not exceed 500 characters')
    .required('Keywords are required'),
  journalId: yup
    .number('Select a journal')
    .required('Journal selection is required'),
});

const ManuscriptSubmissionForm = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Fetch active journals
  const {
    data: journals,
    isLoading: journalsLoading,
    error: journalsError
  } = useQuery({
    queryKey: ['active-journals'],
    queryFn: async () => {
      const response = await journalService.getActiveJournals();
      return response.data;
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await manuscriptService.submitManuscriptWithFile(formData);
      return response.data;
    },
    onSuccess: (data) => {
      setSubmitSuccess('Manuscript submitted successfully!');
      setSubmitError('');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    },
    onError: (error) => {
      setSubmitError(error.response?.data?.message || 'Error submitting manuscript');
      setSubmitSuccess('');
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      abstractText: '',
      keywords: '',
      journalId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitError('');
      setSubmitSuccess('');

      // Validate file is selected
      if (!selectedFile) {
        setSubmitError('Please select a manuscript file to upload');
        return;
      }

      // Create form data for file upload
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('abstractText', values.abstractText);
      formData.append('keywords', values.keywords);
      formData.append('journalId', values.journalId);
      
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      submitMutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitError('Please select a PDF or Word document');
        return;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('File size should not exceed 10MB');
        return;
      }
      
      setSelectedFile(file);
      setSubmitError('');
    }
  };

  const isSubmitting = submitMutation.isPending;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Submit Manuscript
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Please fill out all the required information to submit your research manuscript.
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {submitSuccess}
          </Alert>
        )}

        {journalsError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Error loading journals. Please try again later.
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Manuscript Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                placeholder="Enter the title of your research manuscript"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                error={formik.touched.journalId && Boolean(formik.errors.journalId)}
              >
                <InputLabel id="journal-select-label">Target Journal</InputLabel>
                <Select
                  labelId="journal-select-label"
                  id="journalId"
                  name="journalId"
                  value={formik.values.journalId}
                  label="Target Journal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={journalsLoading}
                >
                  {journals?.map((journal) => (
                    <MenuItem key={journal.id} value={journal.id}>
                      {journal.name} ({journal.code})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.journalId && formik.errors.journalId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {formik.errors.journalId}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={8}
                id="abstractText"
                name="abstractText"
                label="Abstract"
                value={formik.values.abstractText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.abstractText && Boolean(formik.errors.abstractText)}
                helperText={formik.touched.abstractText && formik.errors.abstractText}
                placeholder="Enter the abstract of your manuscript (100-5000 characters)"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="keywords"
                name="keywords"
                label="Keywords"
                value={formik.values.keywords}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.keywords && Boolean(formik.errors.keywords)}
                helperText={formik.touched.keywords && formik.errors.keywords}
                placeholder="Enter keywords separated by commas (e.g., machine learning, artificial intelligence, data science)"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2, p: 2, border: '2px dashed', borderColor: selectedFile ? 'success.main' : 'grey.300', borderRadius: 2, bgcolor: selectedFile ? 'success.light' : 'grey.50' }}>
                <Typography variant="h6" gutterBottom sx={{ color: selectedFile ? 'success.dark' : 'text.primary' }}>
                  📄 Upload Manuscript File *
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Please upload your manuscript in PDF or Word format (max 10MB) - Required
                </Typography>
              
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <label htmlFor="file-upload">
                  <Button
                    variant={selectedFile ? "contained" : "outlined"}
                    color={selectedFile ? "success" : "primary"}
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    {selectedFile ? 'File Selected ✅' : 'Choose File'}
                  </Button>
                </label>
                
                {selectedFile && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: 'success.light', borderRadius: 1, border: '1px solid', borderColor: 'success.main' }}>
                    <Typography variant="body2" color="success.dark" sx={{ fontWeight: 'bold' }}>
                      ✅ Selected file: {selectedFile.name}
                    </Typography>
                    <Typography variant="caption" color="success.dark">
                      Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB | Type: {selectedFile.type}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setSelectedFile(null);
                          document.getElementById('file-upload').value = '';
                        }}
                      >
                        Remove File
                      </Button>
                    </Box>
                  </Box>
                )}
                
                {!selectedFile && (
                  <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                    ⚠️ File upload is required to submit your manuscript
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  sx={{ px: 4 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Manuscript'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ManuscriptSubmissionForm;
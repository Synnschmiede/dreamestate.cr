"use client"

import type { DialogProps } from '@mui/material/Dialog';

import { useCallback, useEffect, useState } from 'react';

import { Alert, Box, Card, Grid, IconButton, Stack, Tab, Tabs } from '@mui/material';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { api } from 'src/utils/axios';


import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { toast } from 'sonner';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { MultiFilePreview, Upload } from 'src/components/upload';
import { FetchingError } from './components/fetching-error';
import { ImageDetails } from './components/image-details';
import { ImageFiltersToolbar } from './components/image-filters-toolbar';
import { ImageItem } from './components/image-item';
import { useDebounce } from './lib/hook';
import { IFile, TFileQueryParam } from './lib/type';

// ----------------------------------------------------------------------

type Props = DialogProps & {
  open: boolean;
  onClose: () => void;
  title?: string;
  selectedFiles: string[];
  onSelectValues: (paths: string[]) => void;
  multiple?: boolean;
};

export function ImageSelectModal({
  open,
  onClose,
  title = 'Select Image',
  selectedFiles,
  onSelectValues,
  multiple = true,
  ...other
}: Props) {
  const [selectedTab, setSelectedTab] = useState<string>('library');
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [currentSelected, setCurrentSelected] = useState<IFile | null>(null);
  const [getFiles, setGetFiles] = useState<IFile[]>([]);
  const [meta, setMeta] = useState<{ page: number, total: number, limit: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number>(200);
  const [getFilesError, setGetFilesError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [limit, setLimit] = useState<number>(50);

  const searchTerm = useDebounce(searchText, 500);

  const onSelectImage = useCallback(
    (inputValue: IFile) => {
      if (multiple) {
        const newSelected = selectedFiles.includes(inputValue.path)
          ? selectedFiles.filter((value) => value !== inputValue.path)
          : [...selectedFiles, inputValue.path];

        onSelectValues(newSelected);
      } else {
        const path = selectedFiles.includes(inputValue.path) ? [] : [inputValue.path];
        onSelectValues(path);
      }
    },
    [selectedFiles, onSelectValues, multiple]
  );

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  }, []);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const getImages = async (queryParams?: TFileQueryParam[]) => {
    try {
      setLoading(true);
      const queryString = queryParams ? queryParams
        .map(({ name, value }) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
        .join("&") : '';
      const response = await api.get(`/file?${queryString}`);
      if (response.data?.success) {
        setGetFiles(response.data?.data?.data)
        setMeta(response.data?.data?.meta)
      }
      setLoading(false);
    } catch (error) {
      setStatusCode(error.status)
      setGetFilesError(error.response?.data);
      setLoading(false);
    }
  }

  const handleUpload = async () => {
    try {
      setLoading(true);
      if (!files.length) {
        setSelectedTab('library');
        setLoading(false);
        return;
      }
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      const response = await api.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if (response.data?.success) {
        getImages([{ name: 'limit', value: limit }]);
        setFiles([]);
        setSelectedTab('library');
      }
      setLoading(false)
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.response?.data?.message ? err.response?.data?.message : err.message);
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (file: IFile) => {
    try {
      setDeleteLoading(true);
      const response = await api.delete(`/file/delete-files`, {
        data: { paths: [file.path] }
      });
      if (response.data?.success) {
        getImages([{ name: 'limit', value: limit }]);
        setCurrentSelected(null);
        toast.success('Deleted successfully');
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error('Delete failed');
      setDeleteLoading(false);
    }
  }, []);

  useEffect(() => {
    const searchParams: TFileQueryParam[] = [{ name: 'limit', value: limit }]
    if (searchTerm?.length > 0) {
      searchParams.push({ name: 'searchTerm', value: searchTerm })
    }
    getImages(searchParams);
  }, [limit, searchTerm]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        '& .MuiDialog-paper': { minWidth: '92%', height: 'calc(100vh - 100px)' },
      }}
    >
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClose();
          setFiles([]);
          setCurrentSelected(null);
          setSearchText('');
          if (!multiple) {
            onSelectValues([]);
          }
        }}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Iconify icon="line-md:close" sx={{ color: 'text.secondary' }} />
      </IconButton>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Stack direction={{ sm: 'column', md: 'row' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              width: selectedTab === 'library' ? { sm: '100%', md: '30%' } : '100%',
            }}
          >
            <Tab
              iconPosition="start"
              value="library"
              label="Library"
              icon={<Iconify icon="ic:round-perm-media" />}
            />
            <Tab
              iconPosition="start"
              value="upload"
              label="Upload"
              icon={<Iconify icon="eva:cloud-upload-fill" />}
            />
          </Tabs>
          {selectedTab === 'library' && (
            <Stack
              sx={{
                width: { sm: '100%', md: '70%' },
                borderBottom: `2px solid ${grey[100]}`,
                p: { xs: 2, md: 0 },
              }}
            >
              <ImageFiltersToolbar
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </Stack>
          )}
        </Stack>
        <Stack direction="row">
          <Box
            sx={{
              width: selectedTab === 'library' && currentSelected ? '75%' : '100%',
              p: 1,
              height: 'calc(100vh - 340px)',
              overflowY: 'auto',
              mt: 4,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: grey[400],
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: grey[500],
              },
            }}
          >
            {selectedTab === 'upload' && (
              <>
                {!!errorMsg && (
                  <Alert
                    severity="error"
                    sx={{ width: { xs: '80%', sm: '90%', md: '95%' }, ml: 4 }}
                  >
                    {errorMsg}
                  </Alert>
                )}
                <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ p: 2 }}>
                  <Box sx={{ width: { xs: '100%', md: `${files.length > 0 ? '30%' : '100%'}` } }}>
                    <Upload
                      multiple
                      accept={{ 'image/*': [] }}
                      value={files}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      previewMultiFile={false}
                      showSubHeading={false}
                    />
                  </Box>
                  {files.length > 0 && (
                    <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                      <MultiFilePreview
                        files={files}
                        thumbnail={false}
                        onRemove={handleRemoveFile}
                      />
                    </Box>
                  )}
                </Stack>
              </>
            )}

            {selectedTab === 'library' && (
              <>
                {loading && (
                  <Stack sx={{ height: 'calc(100vh - 360px)' }}>
                    <LoadingScreen />
                  </Stack>
                )}
                {!loading && getFilesError && (
                  <FetchingError statusCode={statusCode} errorResponse={getFilesError} inModal />
                )}
                {!loading && getFiles?.length === 0 && (
                  <Stack sx={{ height: 'calc(100vh - 360px)' }}>
                    <EmptyContent title="No image found" />
                  </Stack>
                )}
                {
                  !loading && getFiles?.length > 0 && (
                    <Grid container spacing={2}>
                      {getFiles?.map((file) => (
                        <ImageItem
                          currentSelected={currentSelected}
                          setCurrentSelected={setCurrentSelected}
                          file={file}
                          key={file.id}
                          onSelect={() => onSelectImage(file)}
                          selected={selectedFiles.includes(file.path)}
                        />
                      ))}
                    </Grid>
                  )
                }
                {
                  !loading && meta && meta?.total > getFiles?.length && (
                    <Stack direction='row' justifyContent='center' sx={{ mt: 2 }}>
                      <Button variant='outlined' onClick={() => setLimit((prev) => prev + 50)}>
                        Show more
                      </Button>
                    </Stack>
                  )
                }
              </>
            )}
          </Box>
          {selectedTab === 'library' && currentSelected && (
            <Card
              sx={{
                width: '25%',
                height: 'calc(100vh - 360px)',
                p: 2,
                mx: 1,
                mt: 4,
              }}
            >
              <ImageDetails currentSelected={currentSelected} onDelete={handleDelete} deleteLoading={deleteLoading} />
            </Card>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {selectedTab === 'upload' ? (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={handleUpload}
            disabled={loading}
            sx={{
              ...(loading && {
                display: 'flex',
                width: '134px',
                justifyContent: 'flex-start',
                '&::after': {
                  content: '"."',
                  display: 'inline-block',
                  ml: '2px',
                  letterSpacing: '2px',
                  animation: 'dots 1.5s steps(3, end) infinite',
                },
                '@keyframes dots': {
                  '0%': { content: '"."' },
                  '33%': { content: '".."' },
                  '66%': { content: '"..."' },
                  '100%': { content: '"."' },
                },
              }),
            }}
          >
            {loading ? 'Uploading' : 'Upload'}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={() => {
              onClose();
              setCurrentSelected(null);
              setSearchText('');
            }}
          >
            Select
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

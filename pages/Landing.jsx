import { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  useToast,
} from '@chakra-ui/react'
import api from './api/api'

export default function Landing() {
  const [title, setTitle] = useState('')
  const [paragraph, setParagraph] = useState('')
  const [comment, setComment] = useState('')
  const [id, setId] = useState(null)
  const [info, setInfo] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValidFormData = () => {
    if (!title) {
      return toast({
        title: 'Fill in the name field',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (!paragraph) {
      return toast({
        title: 'Fill in the surname field',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (!comment) {
      return toast({
        title: 'Fill in the email field',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleSubmitCreateInfo = async (e) => {
    e.preventDefault()

    if (isValidFormData()) return
    try {
      setIsLoading(true)
      const { data } = await api.post('/create', {
        title,
        paragraph,
        comment,
      })
      setInfo([...info, data.data])
      setTitle('')
      setParagraph('')
      setComment('')
      setIsFormOpen(!isFormOpen)
      toast({
        title: 'Registered successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleDeleteInfo = async (id) => {
    try {
      await api.delete(`info/${id}`);

      const updatedInfo = info.filter(item => item._id !== id);
      setInfo(updatedInfo);
  
      toast({
        title: 'Deleted successfully!',
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlShowUpdateInfo = (info) => {
    if (info && info._id) {
      setId(info._id);
      setTitle(info.title);
      setParagraph(info.paragraph);
      setComment(info.comment);
      setIsFormOpen(true);
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {

      await api.put(`info/${id}`, { title, paragraph, comment });
  
      const updatedInfo = info.map(item => item._id === id ? { ...item, title, paragraph, comment } : item);
      setInfo(updatedInfo);
  
      setTitle('');
      setParagraph('');
      setComment('');
      setId(null);
      setIsFormOpen(false);
  
      toast({
        title: 'Updated successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast()

  useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await api.get('/fetch');
      setInfo(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <Box>
      <Flex align='center' justifyContent='center'>
        <Box
          width={1100}
          borderWidth={1}
          borderRadius={8}
          boxShadow='lg'
          p={20}
          mt='25'
        >
          <Flex justifyContent='flex-end'>
            <Button color='blue' onClick={() => setIsFormOpen(!isFormOpen)}>
              {isFormOpen ? 'zhduke' : 'create'}
            </Button>
          </Flex>

          {isFormOpen ? (
            <VStack
              as='form'
              onSubmit={id ? handleUpdateInfo : handleSubmitCreateInfo}
            >
              <FormControl>
                <FormLabel>Titulli</FormLabel>
                <Input
                  type='text'
                  placeholder='Enter Title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Paragrafi</FormLabel>
                <Input
                  type='text'
                  placeholder='Enter Paragraph'
                  onChange={(e) => setParagraph(e.target.value)}
                  value={paragraph}
                />
              </FormControl>

              <FormControl mt={5}>
                <FormLabel>Komenti</FormLabel>
                <Input
                  type='text'
                  placeholder='Enter the Comment'
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </FormControl>

              <Button color='green' type='submit' mt={6} isLoading={isLoading}>
                {id ? 'Save' : 'Save'}
              </Button>
            </VStack>
          ) : null}

          <Table variant='simple' mt={6}>
            <Thead>
              <Tr>
                <Th textColor='black'>Title</Th>
                <Th textColor='black'>Paragraphe</Th>
                <Th textColor='black'>Comment</Th>
              </Tr>
            </Thead>
            <Tbody>
  {info.map((infoItem, index) => (
    <Tr key={index} color='black'>
      <Td color='black'>{infoItem && infoItem.title}</Td>
      <Td color='black'>{infoItem && infoItem.paragraph}</Td>
      <Td color='black'>{infoItem && infoItem.comment}</Td>
      <Td justifyContent='space-between'>
        <Flex>
          <Button
            size='sm'
            fontSize='small'
            color='black'
            mr='2'
            onClick={() => handlShowUpdateInfo(infoItem)}
          >
            Edit
          </Button>

          {infoItem && infoItem._id && (
            <Button
              size='sm'
              fontSize='small'
              color='black'
              mr='2'
              onClick={() => handleDeleteInfo(infoItem._id)}
            >
              Remove
            </Button>
          )}
        </Flex>
      </Td>
    </Tr>
  ))}
</Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}

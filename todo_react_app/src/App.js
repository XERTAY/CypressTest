import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
	Code,
  } from '@mantine/core';
  import { useState, useRef, useEffect } from 'react';
  import { MoonStars, Sun, Trash } from 'tabler-icons-react';
  
  import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
  } from '@mantine/core';
  import { useColorScheme } from '@mantine/hooks';
  import { useHotkeys, useLocalStorage } from '@mantine/hooks';
  
  export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);
	// State for displaying an error if the title is missing.
	const [titleError, setTitleError] = useState('');
	// State to prevent multiple rapid creations.
	const [isCreating, setIsCreating] = useState(false);
  
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage({
	  key: 'mantine-color-scheme',
	  defaultValue: 'light',
	  getInitialValueInEffect: true,
	});
	const toggleColorScheme = value =>
	  setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
	useHotkeys([['mod+J', () => toggleColorScheme()]]);
  
	const taskTitle = useRef('');
	const taskSummary = useRef('');
  
	function createTask() {
	  // Check if the title is not empty (after trimming spaces)
	  if (!taskTitle.current.value.trim()) {
		// If empty, set an error message (displayed in red) and exit.
		setTitleError('Title is required');
		return;
	  } else {
		// Clear any previous error.
		setTitleError('');
	  }
  
	  // Prevent multiple rapid creations.
	  if (isCreating) {
		return;
	  }
	  setIsCreating(true);
  
	  const newTask = {
		title: taskTitle.current.value,
		summary: taskSummary.current.value,
	  };
  
	  // Update tasks state and save the tasks in localStorage.
	  setTasks([...tasks, newTask]);
	  saveTasks([...tasks, newTask]);
  
	  // Use a timeout to release the creation lock after 1 second.
	  setTimeout(() => {
		setIsCreating(false);
	  }, 1000);
	}
  
	function deleteTask(index) {
	  var clonedTasks = [...tasks];
	  clonedTasks.splice(index, 1);
	  setTasks(clonedTasks);
	  saveTasks([...clonedTasks]);
	}
  
	function loadTasks() {
	  let loadedTasks = localStorage.getItem('tasks');
	  let tasks = JSON.parse(loadedTasks);
	  if (tasks) {
		setTasks(tasks);
	  }
	}
  
	function saveTasks(tasks) {
	  localStorage.setItem('tasks', JSON.stringify(tasks));
	}
  
	useEffect(() => {
	  loadTasks();
	}, []);
  
	return (
	  <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
		<MantineProvider theme={{ colorScheme, defaultRadius: 'md' }} withGlobalStyles withNormalizeCSS>
		  <div className='App'>
			<Modal
			  data-cy="task-modal" // Stable selector for the modal
			  opened={opened}
			  size={'md'}
			  title={'New Task'}
			  withCloseButton={false}
			  onClose={() => {
				setOpened(false);
				// Clear the error when the modal closes.
				setTitleError('');
			  }}
			  centered
			>
			  <TextInput
				data-cy="task-title-input" // Stable selector for the title input
				mt={'md'}
				ref={taskTitle}
				placeholder={'Task Title'}
				required
				label={'Title'}
			  />
			  {/* Error message in red when title is missing */}
			  {titleError && (
				<Text color="red" size="sm" mt="xs" data-cy="title-error">
				  {titleError}
				</Text>
			  )}
			  <TextInput
				data-cy="task-summary-input" // Stable selector for the summary input
				ref={taskSummary}
				mt={'md'}
				placeholder={'Task Summary'}
				label={'Summary'}
			  />
			  <Group mt={'md'} position={'apart'}>
				<Button
				  data-cy="cancel-button" // Stable selector for the cancel button
				  onClick={() => {
					setOpened(false);
					setTitleError(''); // Clear error on cancel
				  }}
				  variant={'subtle'}
				>
				  Cancel
				</Button>
				<Button
				  data-cy="create-task-button" // Stable selector for the create task button
				  disabled={isCreating} // Disable button to prevent duplicate clicks
				  onClick={() => {
					createTask();
					// Only close the modal if the title is valid.
					if (taskTitle.current.value.trim()) {
					  setOpened(false);
					}
				  }}
				>
				  Create Task
				</Button>
			  </Group>
			</Modal>
			<Container size={550} my={40}>
			  <Group position={'apart'}>
				<Title
				  data-cy="page-title" // Stable selector for the page title
				  sx={theme => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				  })}
				>
				  My Tasks
				</Title>
				<ActionIcon
				  data-cy="theme-toggle" // Stable selector for the theme toggle button
				  color={'blue'}
				  onClick={() => toggleColorScheme()}
				  size='lg'
				>
				  {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
				</ActionIcon>
			  </Group>
			  {tasks.length > 0 ? (
				tasks.map((task, index) => {
				  if (task.title) {
					return (
					  <Card data-cy="task-card" withBorder key={index} mt={'sm'}>
						<Group position={'apart'}>
						  {/* 
							Modified Text component to allow multi-line wrapping.
							"whiteSpace: 'normal'" ensures the text wraps, and "wordBreak: 'break-all'" prevents overflow.
						  */}
						  <Text
							weight={'bold'}
							sx={{
							  whiteSpace: 'normal',
							  wordBreak: 'break-all',
							}}
						  >
							{task.title}
						  </Text>
						  <ActionIcon
							data-cy="delete-task-button" // Stable selector for the delete button
							onClick={() => {
							  deleteTask(index);
							}}
							color={'red'}
							variant={'transparent'}
						  >
							<Trash />
						  </ActionIcon>
						</Group>
						<Text
						  color={'dimmed'}
						  size={'md'}
						  mt={'sm'}
						  sx={{
							whiteSpace: 'normal',
							wordBreak: 'break-all',
						  }}
						>
						  {task.summary ? task.summary : 'No summary was provided for this task'}
						</Text>
					  </Card>
					);
				  }
				})
			  ) : (
				<Text data-cy="empty-message" size={'lg'} mt={'md'} color={'dimmed'}>
				  You have no tasks
				</Text>
			  )}
			  <Button
				data-cy="new-task-button" // Stable selector for the New Task button
				onClick={() => {
				  setOpened(true);
				}}
				fullWidth
				mt={'md'}
			  >
				New Task
			  </Button>
			</Container>
		  </div>
		</MantineProvider>
	  </ColorSchemeProvider>
	);
  }
  
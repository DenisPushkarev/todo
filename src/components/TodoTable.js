import React, { Component } from 'react'
// import PropTypes from 'prop-types';
// import MaterialIcon from 'material-icons-react';
import {
  Toolbar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  // TableFooter,
  // TablePagination,
  Button,
} from '@material-ui/core'
import EditTaskDialog from './EditTaskDialog';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import TripOriginIcon from '@material-ui/icons/TripOrigin';

class TodoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditTaskDialog: false,
      sort: {
        by: "",
        dir: "asc"
      },
      task: {
        text: ""
      },
      tasks: []
    }
  }


  loadData = () => {
    const str_data = localStorage.getItem("tasks");
    if (str_data) {
      const data = JSON.parse(str_data);
      this.setState({
        tasks: data
      })
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.tasks.length !== this.state.tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
    }
  }

  onCreateTaskClick = () => {
    this.setState({
      showEditTaskDialog: true,
      task: {
        text: "",
      }
    })
  }

  onStartEditTask = (id) => {
    const task = this.taskById(this.state.tasks, id)
    this.setState({
      showEditTaskDialog: true,
      task
    })
  }

  taskById = (tasks, id) => (
    tasks.find(task => task.id === id)
  )

  onCancelEdit = () => {
    this.setState({
      showEditTaskDialog: false
    })
  }

  onTaskChange = (text) => {
    this.setState((prev) => ({
      ...prev,
      task: {
        ...prev.task,
        text
      }
    }))
  }

  onMarkTaskAsDone = (id) => {
    const { tasks } = this.state;
    const newTasks = [...tasks].map(task => task.id === id ? { ...task, isDone: !task.isDone } : task)
    this.setState({ tasks: newTasks })
  }

  onSaveTask = () => {
    const isNew = !this.state.task.id
    const task = {
      text: this.state.task.text,
      isDone: !!this.state.task.isDone,
      id: this.state.task.id || new Date().valueOf()
    }
    const tasks = isNew
      ? [...this.state.tasks, task]
      : this.state.tasks.map(t => t.id === task.id ? task : t)
    this.setState(prev => ({
      showEditTaskDialog: false,
      tasks: tasks
    }));
  }

  onDeleteTaskClick = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.id !== id)
    this.setState(prev => ({
      ...prev,
      tasks: newTasks,
    }),
    )
  }

  sort = (by, dir) => {
    const direction = dir === 'asc' ? 1 : -1;
    const { tasks } = this.state;
    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text) * direction)
    this.setState({
      tasks: sortedTasks,
      sort: {
        by,
        dir
      }
    })
  }

  reverseSort = (dir) => (dir === 'asc' ? 'desc' : 'asc')

  listTasks = (tasks) =>
    (tasks.map(task => (
      <TableRow key={task.id}>
        <TableCell padding="checkbox">
          {!task.isDone && <TripOriginIcon color="primary" onClick={() => this.onMarkTaskAsDone(task.id)} />}
          {task.isDone && <CheckIcon color="disabled" onClick={() => this.onMarkTaskAsDone(task.id)} />}
        </TableCell>
        <TableCell style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <div onClick={() => this.onStartEditTask(task.id)} style={task.isDone ? { textDecoration: 'line-through' } : {}}>{task.text}</div>
            <div style={{ flexGrow: '1', }} />
            <ClearIcon color='secondary' style={{ cursor: 'pointer' }} onClick={() => this.onDeleteTaskClick(task.id)} />
          </div>
        </TableCell>
      </TableRow>
    )))

  render() {
    const { showEditTaskDialog, sort } = this.state;
    return (
      <Paper>
        <Toolbar>
          <div style={{ flex: '0 0 auto' }}>
            <h1>Tasks</h1>
            <div>
              <Button color="primary" onClick={this.onCreateTaskClick}>Add new task</Button>
              <EditTaskDialog open={showEditTaskDialog} isNew onCancel={this.onCancelEdit} onChange={this.onTaskChange} onSave={this.onSaveTask} value={this.state.task.text} />
            </div>
          </div>
          <div style={{ flexGrow: '1', }}></div>
          {/* <div>
            <Tooltip title="filterlist">
              <MaterialIcon icon="filter_list" />
            </Tooltip>

          </div> */}
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>
                <Tooltip
                  title="Sort by task title"
                  placement={sort.dir === 'asc' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={sort.by === "text"}
                    onClick={() => this.sort('text', this.reverseSort(sort.dir))}
                    direction={sort.dir}
                    placement={sort.dir === 'asc' ? 'bottom-end' : 'bottom-start'}
                  >
                    Task
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.listTasks(this.state.tasks)}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={100}
                rowsPerPage={4}
                page={3}
                SelectProps={{ native: true }}
                onChangePage={(e) => { console.log(e) }}
              />
            </TableRow>
          </TableFooter> */}
        </Table>
      </Paper >
    )
  }
}

export default TodoTable
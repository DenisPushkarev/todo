import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  Checkbox,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TableFooter,
  TablePagination,
  Button,
  Radio
} from '@material-ui/core'

class TodoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteMode: false
    }
  }
  deleteMode(enabled) {
    this.setState({
      deleteMode: enabled
    })
  }

  randomBool() {
    return Math.round(Math.random()) < 1 ? true : false
  }

  render() {
    const { deleteMode } = this.state;
    const todos = [
      { todo: "todo1", date: "01/05/2019" },
      { todo: "Write a ToDO web application without a server for Wiley", date: "03/05/2019" },
      { todo: "todo2", date: "02/05/2019" }]
    return (
      <Paper>
        <Toolbar>
          <div>
            <Button onClick={() => this.deleteMode(!deleteMode)}>Delete</Button>
          </div>
          <div>
            <Tooltip title="filterlist">
              <MaterialIcon icon="filter_list" />
            </Tooltip>

          </div>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              {deleteMode && <TableCell />}
              <TableCell />
              <TableCell>
                <Tooltip
                  title="Sort by task title"
                  placement={'bottom-end'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={true}
                    direction={"asc"}
                  // active={orderBy === row.id}
                  // direction={order}
                  // onClick={this.createSortHandler(row.id)}
                  >
                    TODO
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!deleteMode && <TableRow>
              <TableCell align="checkbox">
                <MaterialIcon size='large' icon="add" />
              </TableCell>
              <TableCell colSpan="2"></TableCell>
            </TableRow>}
            {todos.map(todo => (
              <TableRow>
                {deleteMode && <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={this.randomBool()}
                    checked={this.randomBool()}
                    onChange={(e) => { console.log(e) }}
                  />
                </TableCell>}
                <TableCell>
                  <Radio
                    checked={this.randomBool()}
                    onChange={(e) => { console.log(e) }}
                    value="task-done"
                    color="default"
                    name="radio-button-demo"
                    aria-label="done?"
                  />
                </TableCell>
                <TableCell>{todo.todo}</TableCell>
                <TableCell>{todo.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
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
          </TableFooter>
        </Table>
      </Paper>
    )
  }
}

export default TodoTable
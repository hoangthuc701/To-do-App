import React, { Component } from 'react';

class TaskItem extends Component {
    
  onUpdateStatus =()=>{
      this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete=()=>{
    this.props.onDelete(this.props.task.id);
  }
  onUpdate=()=>{
    this.props.onUpdate(this.props.task.id);
  }
  render() {
      var {task, index}= this.props;
    return (

        <tr> 
            <td className="text-center"> {index+1} </td>
            <td> {task.name}</td>
            <td className="text-center"> 
                <span onClick={this.onUpdateStatus}
                className={task.status===true?'label label-danger':'label label-info'}>{task.status===true?'Kích hoạt':'Ẩn'}</span>
            </td>
            <td className="text-center">
             
              
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                    <span className="fa fa-trash mr-5"></span>&nbsp;
                    Xóa
                </button>
            </td>
        </tr>
    );
  }
}

export default TaskItem;

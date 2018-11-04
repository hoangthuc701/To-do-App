import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props){
        super(props);
         this.state={
                id:'',
                name:'',
                status:false
            }
    }

    onSave=()=>{
    this.props.onSave(this.state);
    this.setState({
        name:'',
        status:false
    });
  }
  onChange=(event)=>{
     var target= event.target;
     var name= target.name;
     var value= target.name==='status'?(target.value==='true'?true:false):target.value;
     this.setState({
        [name]:value
     });
  }
  render() {
    return (
        <div>
       
                     <div className="modal fade" id="AddJob" role="dialog">
                         <div className="modal-dialog">
                             <div className="modal-content">
                                 <div className="modal-header">
                                     <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                     <h4 className="modal-title">Thêm công việc</h4>
                                 </div>
                                 <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="usr">Tên:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="usr">Trạng thái:</label>
                                           <select name="status" className="form-control" onChange={this.onChange}>
                                                <option value={false}> Ẩn</option>
                                                <option value={true}> Kích hoạt</option>
                                             </select> 
                                    </div>
                                 </div>
                                 <div className="modal-footer">
                                     <button type="button" className="btn btn-default" data-dismiss="modal">Hủy bỏ</button>
                                     <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSave}>Lưu lại</button>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="modal fade" id="EditJob" role="dialog">
                         <div className="modal-dialog">
                             <div className="modal-content">
                                 <div className="modal-header">
                                     <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                     <h4 className="modal-title">Chỉnh sửa công việc</h4>
                                 </div>
                                 <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="usr">Tên:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                          <label htmlFor="usr">Trạng thái:</label>
                                           <select name="status" className="form-control" onChange={this.onChange}>
                                                <option value={false}> Ẩn</option>
                                                <option value={true}> Kích hoạt</option>
                                             </select> 
                                    </div>
                                 </div>
                                 <div className="modal-footer">
                                     <button type="button" className="btn btn-default" data-dismiss="modal">Hủy bỏ</button>
                                     <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSave}>Lưu lại</button>
                                 </div>
                             </div>
                         </div>
                     </div>  
            </div>

    );
  }
}

export default TaskForm;
